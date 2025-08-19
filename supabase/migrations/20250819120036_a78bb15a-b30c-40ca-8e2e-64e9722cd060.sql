-- Create newsletter_subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'unsubscribed')),
  confirmation_token TEXT,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create newsletter_issues table for dynamic content
CREATE TABLE public.newsletter_issues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  issue_number INTEGER NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create newsletter_analytics table
CREATE TABLE public.newsletter_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('subscription', 'confirmation', 'unsubscription', 'open', 'click')),
  email TEXT,
  newsletter_issue_id UUID REFERENCES public.newsletter_issues(id),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for newsletter_subscriptions
CREATE POLICY "Newsletter subscriptions are publicly readable for confirmation" 
ON public.newsletter_subscriptions 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create newsletter subscriptions" 
ON public.newsletter_subscriptions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update their subscription status" 
ON public.newsletter_subscriptions 
FOR UPDATE 
USING (true);

-- RLS Policies for newsletter_issues
CREATE POLICY "Published newsletter issues are publicly readable" 
ON public.newsletter_issues 
FOR SELECT 
USING (status = 'published');

CREATE POLICY "Anyone can create newsletter issues" 
ON public.newsletter_issues 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update newsletter issues" 
ON public.newsletter_issues 
FOR UPDATE 
USING (true);

-- RLS Policies for newsletter_analytics
CREATE POLICY "Anyone can create analytics events" 
ON public.newsletter_analytics 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Analytics events are publicly readable" 
ON public.newsletter_analytics 
FOR SELECT 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_newsletter_subscriptions_email ON public.newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_subscriptions_status ON public.newsletter_subscriptions(status);
CREATE INDEX idx_newsletter_issues_status ON public.newsletter_issues(status);
CREATE INDEX idx_newsletter_issues_published_at ON public.newsletter_issues(published_at);
CREATE INDEX idx_newsletter_analytics_event_type ON public.newsletter_analytics(event_type);
CREATE INDEX idx_newsletter_analytics_created_at ON public.newsletter_analytics(created_at);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_newsletter_subscriptions_updated_at
  BEFORE UPDATE ON public.newsletter_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_newsletter_issues_updated_at
  BEFORE UPDATE ON public.newsletter_issues
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();