
import { Card } from "@/components/ui/card";
import { Bot, Zap, MessageCircle, Cpu, Brain, Settings } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Artificial Intelligence",
      description: "Custom AI solutions tailored to your business needs, from machine learning models to intelligent automation systems."
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Prompt Engineering",
      description: "Expert prompt design and optimization to maximize AI performance and get the most accurate results from language models."
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "Chatbot Development",
      description: "Intelligent conversational AI that engages customers, provides support, and drives business growth 24/7."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI Automation",
      description: "Streamline your workflows with intelligent automation that reduces manual tasks and increases efficiency."
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "AI Integration",
      description: "Seamlessly integrate AI capabilities into your existing systems and applications for enhanced functionality."
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "AI Consulting",
      description: "Strategic guidance on AI implementation, helping you identify opportunities and create an AI roadmap for your business."
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our AI Services
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive artificial intelligence solutions to transform your business operations and drive innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-primary/5 to-background group">
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
