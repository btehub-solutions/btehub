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

-- Update newsletter issues to allow public reading of published issues
DROP POLICY IF EXISTS "Published newsletter issues are publicly readable" ON newsletter_issues;
CREATE POLICY "Published newsletter issues are publicly readable" ON newsletter_issues
FOR SELECT USING (status = 'published');

-- Allow anyone to create and update newsletter issues (for admin)
CREATE POLICY IF NOT EXISTS "Anyone can create newsletter issues" ON newsletter_issues
FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Anyone can update newsletter issues" ON newsletter_issues
FOR UPDATE USING (true);

-- Update subscriptions to allow updates for confirmation/unsubscribe
CREATE POLICY IF NOT EXISTS "Anyone can update their subscription status" ON newsletter_subscriptions
FOR UPDATE USING (true);

-- Allow public reading of subscriptions for confirmation
CREATE POLICY IF NOT EXISTS "Newsletter subscriptions are publicly readable for confirmation" ON newsletter_subscriptions
FOR SELECT USING (true);