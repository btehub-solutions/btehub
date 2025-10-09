-- Add SELECT policy: Only authenticated admins can view newsletter analytics
CREATE POLICY "Only admins can view newsletter analytics"
ON public.newsletter_analytics
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));