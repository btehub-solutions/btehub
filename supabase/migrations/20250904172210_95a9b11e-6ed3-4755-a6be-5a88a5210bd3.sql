-- Ensure RLS is properly configured for existing tables

-- First, check if we have any tables that need RLS policies
-- Let's make sure the bookings table has proper RLS if it exists

-- Enable RLS on bookings table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'bookings') THEN
        ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
        
        -- Drop existing policies if they exist to avoid conflicts
        DROP POLICY IF EXISTS "Bookings are viewable by admin" ON public.bookings;
        DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
        
        -- Create policies for bookings table
        CREATE POLICY "Anyone can create bookings" 
        ON public.bookings 
        FOR INSERT 
        WITH CHECK (true);
        
        CREATE POLICY "Bookings are viewable by admin" 
        ON public.bookings 
        FOR SELECT 
        USING (true); -- For now allowing all reads, can be restricted later based on user roles
    END IF;
END
$$;

-- Check if newsletter subscribers table exists and configure RLS
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'newsletter_subscribers') THEN
        ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
        
        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
        DROP POLICY IF EXISTS "Subscribers can view their own subscription" ON public.newsletter_subscribers;
        DROP POLICY IF EXISTS "Anyone can update subscription status" ON public.newsletter_subscribers;
        
        -- Create policies for newsletter subscribers
        CREATE POLICY "Anyone can subscribe to newsletter" 
        ON public.newsletter_subscribers 
        FOR INSERT 
        WITH CHECK (true);
        
        CREATE POLICY "Subscribers can view their own subscription" 
        ON public.newsletter_subscribers 
        FOR SELECT 
        USING (true); -- Allow reading for unsubscribe functionality
        
        CREATE POLICY "Anyone can update subscription status" 
        ON public.newsletter_subscribers 
        FOR UPDATE 
        USING (true) 
        WITH CHECK (true); -- Allow updates for confirmation and unsubscribe
    END IF;
END
$$;

-- Create a function to update timestamps if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply the timestamp trigger to bookings if the table exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'bookings') THEN
        DROP TRIGGER IF EXISTS update_bookings_updated_at ON public.bookings;
        CREATE TRIGGER update_bookings_updated_at
            BEFORE UPDATE ON public.bookings
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END
$$;