
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
    <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Transforming Business With
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70"> Artificial Intelligence</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            BTEHub specializes in AI automation, chatbot development, and prompt engineering 
            to help businesses unlock the full potential of artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-4 group">
              <Link to="/book">
                Start Your AI Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 group"
              onClick={handleDemoClick}
            >
              <Play className="mr-2 h-5 w-5" />
              See AI Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border">
            <div>
              <div className="text-3xl font-bold text-foreground">200+</div>
              <div className="text-muted-foreground">AI Solutions Deployed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">95%</div>
              <div className="text-muted-foreground">Automation Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">50+</div>
              <div className="text-muted-foreground">Chatbots Built</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
