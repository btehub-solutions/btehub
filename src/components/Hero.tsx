
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const handleDemoClick = () => {
    // Trigger the chat widget by dispatching a custom event
    const chatButton = document.querySelector('[data-chat-widget]') as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
    } else {
      // Fallback: dispatch custom event for chat widget to listen to
      window.dispatchEvent(new CustomEvent('openChatDemo'));
    }
  };

  return (
    <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-20 gradient-hero min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-subtle">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce-subtle"></div>
              Leading AI Automation Experts
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
              Transforming Business With
              <span className="block text-transparent bg-gradient-to-r from-primary via-brand-blue-light to-brand-blue bg-clip-text animate-scale-in"> 
                Artificial Intelligence
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto">
              BTEHub specializes in AI automation, chatbot development, and prompt engineering 
              to help businesses unlock the full potential of artificial intelligence with 
              <span className="font-semibold text-primary"> measurable results</span>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up">
            <Button asChild variant="professional" size="xl" className="group">
              <Link to="/book">
                Start Your AI Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="group border-primary/30 hover:border-primary"
              onClick={handleDemoClick}
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              See AI Demo
            </Button>
          </div>
          
          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border/50 animate-fade-in">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-brand-blue-light bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                200+
              </div>
              <div className="text-muted-foreground font-medium">AI Solutions Deployed</div>
              <div className="text-sm text-primary mt-1">Across 50+ Industries</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-brand-blue-light bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                95%
              </div>
              <div className="text-muted-foreground font-medium">Automation Success Rate</div>
              <div className="text-sm text-primary mt-1">Proven Track Record</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-brand-blue-light bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                50+
              </div>
              <div className="text-muted-foreground font-medium">Chatbots Built</div>
              <div className="text-sm text-primary mt-1">Active & Converting</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
