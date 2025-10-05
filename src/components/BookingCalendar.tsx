import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, Clock, User, Mail, Phone, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { bookingFormSchema, sanitizeInput, type BookingFormData } from "@/lib/validation";

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    notes: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Generate available time slots for the selected date
  useEffect(() => {
    if (selectedDate) {
      // Generate hourly slots from 9 AM to 5 PM
      const slots = [];
      for (let hour = 9; hour <= 17; hour++) {
        const timeString = `${hour.toString().padStart(2, '0')}:00`;
        slots.push(timeString);
      }
      setAvailableSlots(slots);
      setSelectedTime(""); // Reset selected time when date changes
    }
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time.",
        variant: "destructive",
      });
      return;
    }

    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      serviceType: sanitizeInput(formData.serviceType),
      notes: sanitizeInput(formData.notes || ''),
    };

    // Validate with zod
    const validation = bookingFormSchema.safeParse(sanitizedData);
    
    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Insert booking into database
      const { data: bookingData, error: dbError } = await supabase
        .from('bookings')
        .insert({
          client_name: validation.data.name,
          client_email: validation.data.email,
          client_phone: validation.data.phone || null,
          service_type: validation.data.serviceType,
          preferred_date: format(selectedDate, 'yyyy-MM-dd'),
          preferred_time: selectedTime,
          notes: validation.data.notes || null,
          status: 'pending'
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Try to create calendar event but don't fail if it doesn't work
      try {
        const calendarResponse = await supabase.functions.invoke('calendar-booking', {
          body: {
            clientName: validation.data.name,
            clientEmail: validation.data.email,
            clientPhone: validation.data.phone,
            serviceType: validation.data.serviceType,
            preferredDate: format(selectedDate, 'yyyy-MM-dd'),
            preferredTime: selectedTime,
            notes: validation.data.notes
          }
        });

        if (calendarResponse.error) {
          console.warn('Calendar event creation failed:', calendarResponse.error);
          toast({
            title: "Booking Submitted",
            description: "Your booking was saved successfully! We'll contact you to confirm the appointment.",
          });
        } else {
          toast({
            title: "Booking Confirmed!",
            description: "Your consultation has been scheduled and added to your calendar.",
          });
        }
      } catch (calendarError) {
        console.warn('Calendar service unavailable:', calendarError);
        toast({
          title: "Booking Submitted",
          description: "Your booking was saved successfully! We'll contact you to confirm the appointment.",
        });
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        notes: ""
      });
      setSelectedDate(undefined);
      setSelectedTime("");
      setErrors({});
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Error",
        description: "Failed to submit booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Schedule Your AI Consultation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book a free consultation to discuss how AI can transform your business
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Select Date & Time
              </CardTitle>
              <CardDescription>
                Choose your preferred consultation date and time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  className="rounded-md border"
                />
              </div>

              {selectedDate && (
                <div>
                  <Label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Available Times
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedTime === slot ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(slot)}
                        className="text-sm"
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Your Information
              </CardTitle>
              <CardDescription>
                Tell us about yourself and your AI project needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                      }}
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                      }}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, phone: e.target.value }));
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="serviceType">Service Interest *</Label>
                  <Select 
                    value={formData.serviceType} 
                    onValueChange={(value) => {
                      setFormData(prev => ({ ...prev, serviceType: value }));
                      if (errors.serviceType) setErrors(prev => ({ ...prev, serviceType: '' }));
                    }}
                  >
                    <SelectTrigger className={errors.serviceType ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chatbot-development">Chatbot Development</SelectItem>
                      <SelectItem value="prompt-engineering">Prompt Engineering</SelectItem>
                      <SelectItem value="ai-automation">AI Automation</SelectItem>
                      <SelectItem value="ai-consulting">AI Consulting</SelectItem>
                      <SelectItem value="custom-ai-solutions">Custom AI Solutions</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.serviceType && <p className="text-destructive text-sm mt-1">{errors.serviceType}</p>}
                </div>

                <div>
                  <Label htmlFor="notes" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Project Details
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    value={formData.notes}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, notes: e.target.value }));
                      if (errors.notes) setErrors(prev => ({ ...prev, notes: '' }));
                    }}
                    rows={4}
                    className={errors.notes ? 'border-destructive' : ''}
                  />
                  {errors.notes && <p className="text-destructive text-sm mt-1">{errors.notes}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !selectedDate || !selectedTime}
                >
                  {isLoading ? "Submitting..." : "Book Consultation"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingCalendar;