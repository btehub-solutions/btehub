-- CRITICAL SECURITY FIXES FOR BTEHUB
-- Fixing 5 critical and 4 warning level security issues

-- 1. FIX: Customer Contact Information Exposure (bookings table)
-- ISSUE: Currently publicly readable with sensitive data
-- SOLUTION: Remove public read access, keep only insert for booking form

DROP POLICY IF EXISTS "Bookings are publicly accessible for reading" ON public.bookings;
DROP POLICY IF EXISTS "Bookings are viewable by admin" ON public.bookings;

-- Allow public to create bookings (for the booking form)
-- Keep existing: "Anyone can create bookings" policy

-- 2. FIX: Email Subscriber List Exposure (newsletter_subscriptions table)
-- ISSUE: All emails and tokens publicly readable
-- SOLUTION: Only allow reading own subscription via token

DROP POLICY IF EXISTS "Newsletter subscriptions are publicly readable for confirmation" ON public.newsletter_subscriptions;

CREATE POLICY "Users can view their own subscription via confirmation token"
ON public.newsletter_subscriptions
FOR SELECT
USING (
  confirmation_token = current_setting('request.headers', true)::json->>'x-confirmation-token'
  OR unsubscribe_token = current_setting('request.headers', true)::json->>'x-unsubscribe-token'
);

-- 3. FIX: Customer Behavior Data Leak (newsletter_analytics table)
-- ISSUE: Analytics with emails publicly readable
-- SOLUTION: Remove public read access entirely

DROP POLICY IF EXISTS "Analytics events are publicly readable" ON public.newsletter_analytics;

-- Keep insert policy for tracking: "Anyone can create analytics events"

-- 4. FIX: Private Customer Conversations (chat_messages table)
-- ISSUE: All chat messages publicly readable
-- SOLUTION: Restrict to session owner only

DROP POLICY IF EXISTS "Chat messages are publicly accessible" ON public.chat_messages;

CREATE POLICY "Users can view their own session messages"
ON public.chat_messages
FOR SELECT
USING (
  session_id IN (
    SELECT id FROM public.chat_sessions 
    WHERE visitor_id = current_setting('request.headers', true)::json->>'x-visitor-id'
  )
);

CREATE POLICY "Users can create messages in their own session"
ON public.chat_messages
FOR INSERT
WITH CHECK (
  session_id IN (
    SELECT id FROM public.chat_sessions 
    WHERE visitor_id = current_setting('request.headers', true)::json->>'x-visitor-id'
  )
);

-- 5. FIX: Newsletter Content Manipulation (newsletter_issues table)
-- ISSUE: Anyone can create/update newsletters
-- SOLUTION: Remove public insert/update, make read-only for public

DROP POLICY IF EXISTS "Anyone can create newsletter issues" ON public.newsletter_issues;
DROP POLICY IF EXISTS "Anyone can update newsletter issues" ON public.newsletter_issues;

-- Keep only the public read policy for published content
-- Admin access will need to be added separately when authentication is implemented

-- 6. FIX: Visitor Email Exposure (chat_sessions table)
-- ISSUE: All sessions publicly accessible
-- SOLUTION: Restrict to visitor's own session

DROP POLICY IF EXISTS "Chat sessions are publicly accessible" ON public.chat_sessions;

CREATE POLICY "Users can view their own session"
ON public.chat_sessions
FOR SELECT
USING (
  visitor_id = current_setting('request.headers', true)::json->>'x-visitor-id'
);

CREATE POLICY "Users can create their own session"
ON public.chat_sessions
FOR INSERT
WITH CHECK (
  visitor_id = current_setting('request.headers', true)::json->>'x-visitor-id'
);

CREATE POLICY "Users can update their own session"
ON public.chat_sessions
FOR UPDATE
USING (
  visitor_id = current_setting('request.headers', true)::json->>'x-visitor-id'
);

-- 7. FIX: Booking Calendar Manipulation (available_slots table)
-- ISSUE: Anyone can update slot availability
-- SOLUTION: Remove public update access

DROP POLICY IF EXISTS "Available slots can be updated for bookings" ON public.available_slots;

-- Keep read access: "Available slots are publicly readable"
-- Update access will need to be added for authenticated admins later