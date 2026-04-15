
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Envelope, Phone, MapPin, PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { contactFormSchema, sanitizeInput, type ContactFormData } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Sanitize all inputs
    const sanitizedData = {
      firstName: sanitizeInput(formData.firstName),
      lastName: sanitizeInput(formData.lastName),
      email: sanitizeInput(formData.email),
      interest: sanitizeInput(formData.interest || ''),
      message: sanitizeInput(formData.message)
    };

    // Validate with zod
    const validation = contactFormSchema.safeParse(sanitizedData);
    
    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('contact-form', {
        body: validation.data
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 2 hours.",
      });
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          interest: '',
          message: ''
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Envelope weight="duotone" className="h-4 w-4" />
              Get In Touch
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Let's discuss how BTEHub can help you implement AI solutions that drive real results. 
              Start your AI transformation journey today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <div className="space-y-6 animate-slide-up">
              <Card className="p-8 flex items-start space-x-4 hover:shadow-professional transition-all duration-300 border-0 bg-gradient-to-br from-background to-primary/5 group">
                <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                  <Envelope weight="duotone" className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">Email Us</h3>
                  <a 
                    href="mailto:bensamoladoyin.btehub@gmail.com" 
                    className="text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    bensamoladoyin.btehub@gmail.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">We respond within 2 hours</p>
                </div>
              </Card>

              <Card className="p-8 flex items-start space-x-4 hover:shadow-professional transition-all duration-300 border-0 bg-gradient-to-br from-background to-primary/5 group">
                <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                  <Phone weight="duotone" className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">Call Us</h3>
                  <a 
                    href="tel:+2347045422815" 
                    className="text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    +234 704 542 2815
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">Mon-Fri, 9AM-6PM WAT</p>
                </div>
              </Card>

              <Card className="p-8 flex items-start space-x-4 hover:shadow-professional transition-all duration-300 border-0 bg-gradient-to-br from-background to-primary/5 group">
                <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                  <MapPin weight="duotone" className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">Location</h3>
                  <p className="text-muted-foreground font-medium">Abeokuta, Ogun State</p>
                  <p className="text-sm text-muted-foreground mt-2">Nigeria</p>
                </div>
              </Card>
            </div>

            {/* Enhanced Contact Form */}
            <Card className="lg:col-span-2 p-12 border-0 bg-gradient-to-br from-background to-secondary/30 shadow-professional animate-scale-in">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Start Your AI Project</h3>
                    <p className="text-muted-foreground">Tell us about your needs and we'll create a custom solution</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        First Name *
                      </label>
                      <Input 
                        placeholder="John" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`border-2 transition-all duration-300 focus:border-primary ${errors.firstName ? 'border-destructive' : 'border-input'}`}
                      />
                      {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        Last Name *
                      </label>
                      <Input 
                        placeholder="Doe" 
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`border-2 transition-all duration-300 focus:border-primary ${errors.lastName ? 'border-destructive' : 'border-input'}`}
                      />
                      {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Email Address *
                    </label>
                    <Input 
                      type="email" 
                      placeholder="john@company.com" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`border-2 transition-all duration-300 focus:border-primary ${errors.email ? 'border-destructive' : 'border-input'}`}
                    />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      AI Project Interest
                    </label>
                    <Input 
                      placeholder="Chatbot, Automation, Prompt Engineering..." 
                      value={formData.interest}
                      onChange={(e) => handleInputChange('interest', e.target.value)}
                      className="border-2 transition-all duration-300 focus:border-primary border-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Project Details *
                    </label>
                    <Textarea 
                      placeholder="Tell us about your AI needs, business goals, timeline, and any specific requirements..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`min-h-[140px] border-2 transition-all duration-300 focus:border-primary resize-none ${errors.message ? 'border-destructive' : 'border-input'}`}
                    />
                    {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    variant="professional" 
                    size="xl" 
                    disabled={isSubmitting}
                    className="w-full group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Start AI Transformation
                        <PaperPlaneTilt weight="duotone" className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    We'll respond within 2 hours with a detailed proposal tailored to your needs.
                  </p>
                </form>
              ) : (
                <div className="text-center py-12 animate-scale-in">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle weight="duotone" className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Message Sent Successfully!</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Thank you for your interest in BTEHub's AI solutions. We've received your message and 
                    will get back to you within 2 hours with a detailed proposal.
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 animate-fade-in">
            <div className="bg-gradient-to-r from-primary/10 to-brand-blue/10 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Get Started Right Away?
              </h3>
              <p className="text-muted-foreground mb-6">
                Book a free 30-minute AI consultation call to discuss your project in detail.
              </p>
              <Button asChild variant="professional" size="xl">
                <a href="/book">
                  Book Free Consultation
                  <Phone weight="duotone" className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
