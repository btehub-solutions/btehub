-- Create bookings table for consultation scheduling
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  service_type TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for booking access (public read/write for booking requests)
CREATE POLICY "Bookings are publicly accessible for reading" 
ON public.bookings 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create booking requests" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create available time slots table
CREATE TABLE public.available_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_booked BOOLEAN NOT NULL DEFAULT false,
  booking_id UUID REFERENCES public.bookings(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for time slots
ALTER TABLE public.available_slots ENABLE ROW LEVEL SECURITY;

-- Create policies for time slots
CREATE POLICY "Available slots are publicly readable" 
ON public.available_slots 
FOR SELECT 
USING (true);

CREATE POLICY "Available slots can be updated for bookings" 
ON public.available_slots 
FOR UPDATE 
USING (true);

-- Create index for better performance on date queries
CREATE INDEX idx_available_slots_date ON public.available_slots(date);
CREATE INDEX idx_bookings_date ON public.bookings(preferred_date);