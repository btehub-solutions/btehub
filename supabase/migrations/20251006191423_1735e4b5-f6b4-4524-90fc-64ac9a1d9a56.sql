-- Drop existing conflicting policies on bookings table
DROP POLICY IF EXISTS "Anyone can create booking requests" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

-- Create a simple policy to allow public booking submissions
CREATE POLICY "Enable public booking submissions"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow public to view their own bookings (optional, for confirmation)
CREATE POLICY "Enable public booking view"
ON public.bookings
FOR SELECT
TO anon, authenticated
USING (true);