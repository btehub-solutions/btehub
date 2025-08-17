
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss how BTEHub can help you implement AI solutions that drive real results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-primary/5 to-background">
                <div className="text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <a href="mailto:bensamoladoyin.btehub@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    bensamoladoyin.btehub@gmail.com
                  </a>
                </div>
              </Card>

              <Card className="p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-primary/5 to-background">
                <div className="text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <a href="tel:+2347045422815" className="text-muted-foreground hover:text-primary transition-colors">
                    07045422815
                  </a>
                </div>
              </Card>

              <Card className="p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-primary/5 to-background">
                <div className="text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p className="text-muted-foreground">Abeokuta, Ogun State</p>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2 p-8 border-0 bg-gradient-to-br from-primary/5 to-background">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      First Name
                    </label>
                    <Input placeholder="John" className="border-input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Last Name
                    </label>
                    <Input placeholder="Doe" className="border-input" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Email
                  </label>
                  <Input type="email" placeholder="john@example.com" className="border-input" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    AI Project Interest
                  </label>
                  <Input placeholder="Chatbot, Automation, Prompt Engineering..." className="border-input" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Project Details
                  </label>
                  <Textarea 
                    placeholder="Tell us about your AI needs and business goals..."
                    className="min-h-[120px] border-input"
                  />
                </div>

                <Button className="w-full text-lg py-3">
                  Start AI Transformation
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
