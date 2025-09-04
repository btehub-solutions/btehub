
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Lightbulb, Rocket, Users, ArrowRight, Brain, MessageCircle, Bot, Zap, Cpu, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import cleanProfessionalAi from "@/assets/clean-professional-ai.jpg";

const Services = () => {
  const services = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Artificial Intelligence",
      description: "Custom AI solutions tailored to your business needs, from machine learning models to intelligent automation systems.",
      features: ["Machine Learning", "Predictive Analytics", "AI Strategy"]
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Prompt Engineering",
      description: "Expert prompt design and optimization to maximize AI performance and get the most accurate results from language models.",
      features: ["Prompt Optimization", "AI Fine-tuning", "Performance Testing"]
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "Chatbot Development",
      description: "Intelligent conversational AI that engages customers, provides support, and drives business growth 24/7.",
      features: ["Custom Chatbots", "Multi-platform", "Analytics Dashboard"]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI Automation",
      description: "Streamline your workflows with intelligent automation that reduces manual tasks and increases efficiency.",
      features: ["Workflow Automation", "Process Optimization", "Cost Reduction"]
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "AI Integration",
      description: "Seamlessly integrate AI capabilities into your existing systems and applications for enhanced functionality.",
      features: ["API Integration", "System Migration", "Custom Solutions"]
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "AI Consulting",
      description: "Strategic guidance on AI implementation, helping you identify opportunities and create an AI roadmap for your business.",
      features: ["Strategic Planning", "ROI Analysis", "Implementation Support"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Our AI Services
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive AI Solutions
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Transform your business operations with our expert artificial intelligence solutions, 
            designed to drive innovation and deliver measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-professional transition-all duration-300 border-0 bg-gradient-to-br from-background to-secondary/30 group hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, featureIndex) => (
                  <span 
                    key={featureIndex}
                    className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button asChild variant="professional" size="xl">
            <Link to="/book">
              Start Your AI Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
