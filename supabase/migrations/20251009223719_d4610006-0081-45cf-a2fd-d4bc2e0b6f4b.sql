-- Add secure session token to chat_sessions
ALTER TABLE public.chat_sessions 
ADD COLUMN session_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex');

-- Create index for performance
CREATE INDEX idx_chat_sessions_token ON public.chat_sessions(session_token);

-- Drop old insecure policies
DROP POLICY IF EXISTS "Users can view their own session" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can update their own session" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can create their own session" ON public.chat_sessions;

-- Create new secure policies using session_token
CREATE POLICY "Users can view their session with token"
ON public.chat_sessions
FOR SELECT
USING (session_token = ((current_setting('request.headers'::text, true))::json ->> 'x-session-token'::text));

CREATE POLICY "Users can update their session with token"
ON public.chat_sessions
FOR UPDATE
USING (session_token = ((current_setting('request.headers'::text, true))::json ->> 'x-session-token'::text));

-- Allow anyone to create a new session (token is generated server-side)
CREATE POLICY "Anyone can create a session"
ON public.chat_sessions
FOR INSERT
WITH CHECK (true);

-- Update chat_messages policies to use session_token
DROP POLICY IF EXISTS "Users can view their own session messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can create messages in their own session" ON public.chat_messages;

CREATE POLICY "Users can view session messages with token"
ON public.chat_messages
FOR SELECT
USING (session_id IN (
  SELECT id FROM chat_sessions 
  WHERE session_token = ((current_setting('request.headers'::text, true))::json ->> 'x-session-token'::text)
));

CREATE POLICY "Users can create messages with token"
ON public.chat_messages
FOR INSERT
WITH CHECK (session_id IN (
  SELECT id FROM chat_sessions 
  WHERE session_token = ((current_setting('request.headers'::text, true))::json ->> 'x-session-token'::text)
));

-- Generate tokens for existing sessions
UPDATE public.chat_sessions 
SET session_token = encode(gen_random_bytes(32), 'hex')
WHERE session_token IS NULL;