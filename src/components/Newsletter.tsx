import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      // Send confirmation email instead of direct subscription
      const response = await supabase.functions.invoke('newsletter-confirmation-send', {
        body: { email }
      });

      if (response.error) throw response.error;

      toast({
        title: "Check your email!",
        description: "We've sent you a confirmation link to complete your subscription.",
      });
      setEmail("");
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to send confirmation email. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Newsletter Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Mail className="h-4 w-4" />
              BTEHub Weekly AI Newsletter
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🚀 AI is Reshaping Business in 2025
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The world of AI is moving fast. Stay ahead with weekly insights on the latest AI trends, 
              tools, and opportunities to grow your business and income.
            </p>
          </div>

          {/* Latest Newsletter Content */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-background to-primary/5 border-primary/20">
            <div className="space-y-6">
              {/* Main Updates */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  This Week's AI Highlights
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>AI Automation Boom:</strong> New no-code AI tools are making automation accessible to small businesses, reducing operational costs by up to 40%.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>ChatGPT for Business:</strong> OpenAI announced enhanced enterprise features that help companies create custom AI assistants in minutes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>AI Content Creation:</strong> Video generation AI reached new quality levels, opening opportunities for creators and marketers worldwide.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Freelancer Success:</strong> AI consultants are reporting 300% income increases by offering AI implementation services to local businesses.</span>
                  </li>
                </ul>
              </div>

              {/* Why This Matters */}
              <div className="bg-secondary/30 p-6 rounded-lg">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Why This Matters
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  We're witnessing the democratization of AI tools. Small businesses and individual creators now have access to 
                  enterprise-level AI capabilities. This shift creates massive opportunities for those who learn to harness these tools effectively. 
                  Whether you're automating workflows, creating content, or offering AI services, the potential for income generation 
                  has never been higher.
                </p>
              </div>

              {/* Final Thought */}
              <div className="text-center pt-4">
                <p className="text-muted-foreground italic mb-4">
                  "How do you see AI changing your daily workflow? What opportunities are you exploring?"
                </p>
                <div className="text-foreground font-medium">
                  — BTEHub Team
                </div>
                <div className="text-sm text-primary mt-2">
                  <em>BTEHub: Learn AI • Build Solutions • Create Income</em>
                </div>
              </div>
            </div>
          </Card>

          {/* Newsletter Subscription */}
          <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-secondary/20 border-primary/30">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Join 10,000+ AI Enthusiasts
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Get weekly AI insights, practical tutorials, and income opportunities delivered to your inbox every Tuesday.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" className="sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Subscribe Free"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              No spam. Unsubscribe anytime. 
              <a href="/newsletter/archive" className="text-primary hover:underline ml-1">View past issues</a>
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;