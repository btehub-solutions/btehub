-- Remove public read access to bookings table to protect customer PII
DROP POLICY IF EXISTS "Enable public booking view" ON public.bookings;

-- Keep the INSERT policy so users can still submit bookings
-- (The existing INSERT policy "Enable public booking submissions" remains intact)

-- Note: Admin access to view bookings should be implemented separately
-- with proper authentication (e.g., using auth.uid() and user_roles table)