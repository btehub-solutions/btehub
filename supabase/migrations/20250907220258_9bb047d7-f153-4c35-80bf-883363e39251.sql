-- Confirm the existing pending subscriber and add unsubscribe token
UPDATE newsletter_subscriptions 
SET status = 'confirmed', 
    confirmed_at = now(),
    unsubscribe_token = gen_random_uuid()::text
WHERE email = 'bensamoladoyin.btehub@gmail.com' AND status = 'pending';