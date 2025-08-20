-- Add confirmation token and unsubscribe functionality
ALTER TABLE newsletter_subscriptions 
ADD COLUMN IF NOT EXISTS confirmation_token TEXT,
ADD COLUMN IF NOT EXISTS unsubscribe_token TEXT DEFAULT gen_random_uuid()::text;

-- Create newsletter analytics table
CREATE TABLE IF NOT EXISTS newsletter_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  newsletter_issue_id UUID REFERENCES newsletter_issues(id),
  email TEXT,
  event_type TEXT NOT NULL, -- 'sent', 'opened', 'clicked', 'unsubscribed'
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on analytics
ALTER TABLE newsletter_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create analytics events (for tracking)
CREATE POLICY "Anyone can create analytics events" ON newsletter_analytics
FOR INSERT WITH CHECK (true);

-- Allow reading analytics for public stats
CREATE POLICY "Analytics events are publicly readable" ON newsletter_analytics
FOR SELECT USING (true);