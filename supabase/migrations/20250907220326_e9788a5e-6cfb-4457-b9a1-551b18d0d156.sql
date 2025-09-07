-- Add missing unsubscribe_token column to newsletter_subscriptions
ALTER TABLE newsletter_subscriptions 
ADD COLUMN IF NOT EXISTS unsubscribe_token text;

-- Now confirm the existing pending subscriber
UPDATE newsletter_subscriptions 
SET status = 'confirmed', 
    confirmed_at = now(),
    unsubscribe_token = gen_random_uuid()::text
WHERE email = 'bensamoladoyin.btehub@gmail.com' AND status = 'pending';