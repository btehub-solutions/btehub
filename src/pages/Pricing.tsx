import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Rocket, Building2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    name: "Starter",
    icon: Zap,
    description: "Perfect for small businesses starting their AI journey",
    priceRange: "₦150,000 - ₦500,000",
    features: [
      "Basic AI chatbot implementation",
      "Up to 1,000 conversations/month",
      "Email support",
      "2 rounds of revisions",
      "Basic analytics dashboard",
      "1 month free maintenance"
    ],
    recommended: false
  },
  {
    name: "Professional",
    icon: Rocket,
    description: "Ideal for growing businesses ready to scale",
    priceRange: "₦500,000 - ₦2,000,000",
    features: [
      "Advanced AI chatbot with custom training",
      "Up to 10,000 conversations/month",
      "Priority support (24/7)",
      "Unlimited revisions",
      "Advanced analytics & insights",
      "Multi-channel integration",
      "3 months free maintenance",
      "Custom AI automation workflows"
    ],
    recommended: true
  },
  {
    name: "Enterprise",
    icon: Building2,
    description: "Comprehensive AI solutions for large organizations",
    priceRange: "Custom Pricing",
    features: [
      "Fully custom AI solution development",
      "Unlimited conversations",
      "Dedicated account manager",
      "White-label options",
      "Advanced security features",
      "API access & integrations",
      "6 months free maintenance",
      "On-site training & workshops",
      "Ongoing optimization & updates"
    ],
    recommended: false
  }
];

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Flexible packages designed to fit your budget and deliver maximum ROI. All prices are estimates and can be customized to your specific needs.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pricingPlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <Card 
                  key={index}
                  className={`relative overflow-hidden card-hover border-border/50 bg-card/50 backdrop-blur ${
                    plan.recommended ? 'border-brand-blue shadow-lg shadow-brand-blue/20' : ''
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 right-0 bg-brand-blue text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                      Recommended
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-brand-blue/10">
                        <Icon className="w-8 h-8 text-brand-blue" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <CardDescription className="text-base mb-4">
                      {plan.description}
                    </CardDescription>
                    <div className="text-3xl font-bold text-foreground">
                      {plan.priceRange}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      asChild 
                      className="w-full" 
                      variant={plan.recommended ? "professional" : "outline"}
                    >
                      <Link to="/book">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border/50 bg-card/30 backdrop-blur">
              <CardHeader>
                <CardTitle>Custom Solutions Available</CardTitle>
                <CardDescription>
                  Need something specific? We create tailored AI solutions to match your exact requirements and budget.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/30 backdrop-blur">
              <CardHeader>
                <CardTitle>Flexible Payment Terms</CardTitle>
                <CardDescription>
                  We offer milestone-based payments and flexible terms to make it easier for businesses of all sizes to get started.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* FAQ Note */}
          <div className="text-center mt-16 p-8 rounded-2xl bg-muted/30">
            <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Every project is unique. Book a free consultation to discuss your specific needs and get a detailed, customized quote.
            </p>
            <Button asChild size="lg" variant="professional">
              <Link to="/book">Schedule Free Consultation</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;