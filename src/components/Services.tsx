
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, ChatCircle, Robot, Lightning, Cpu, Gear } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import cleanProfessionalAi from "@/assets/clean-professional-ai.jpg";

const Services = () => {
  const services = [
    {
      icon: <Brain weight="duotone" className="h-8 w-8" />,
      title: "Intelligent Systems",
      description: "Designing end-to-end AI/ML systems focused on real-world implementation rather than just prototypes.",
      features: ["ML Model Deployment", "Neural Networks", "Data Pipeline Architecture"]
    },
    {
      icon: <Robot weight="duotone" className="h-8 w-8" />,
      title: "Autonomous AI Agents",
      description: "Building intelligent agents and workflows that operate independently to execute complex business tasks.",
      features: ["Agentic Workflows", "Auto-GDPR", "Task Orchestration"]
    },
    {
      icon: <Lightning weight="duotone" className="h-8 w-8" />,
      title: "Automation Workflows",
      description: "Scale your operations with sophisticated AI-driven automation that handles repetitive processes with precision.",
      features: ["Process Automation", "Enterprise Workflows", "Efficiency Audit"]
    },
    {
      icon: <Cpu weight="duotone" className="h-8 w-8" />,
      title: "Scalable Web Apps",
      description: "Developing modern, high-performance web applications integrated with advanced AI capabilities.",
      features: ["Next.js/React", "AI API Integration", "Cloud Architecture"]
    },
    {
      icon: <ChatCircle weight="duotone" className="h-8 w-8" />,
      title: "Conversational AI",
      description: "Developing advanced RAG-based chatbots and virtual assistants that provide human-like interactions.",
      features: ["Vector Databases", "LLM Fine-tuning", "Semantic Search"]
    },
    {
      icon: <Gear weight="duotone" className="h-8 w-8" />,
      title: "Digital Strategy",
      description: "Providing strategic guidance on digital transformation and AI adoption to help your business scale safely.",
      features: ["AI Literacy", "Transformation Roadmap", "Risk Assessment"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Lightning weight="duotone" className="h-4 w-4" />
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
              <ArrowRight weight="duotone" className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
