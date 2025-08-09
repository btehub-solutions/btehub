
import { Card } from "@/components/ui/card";
import { Target, Lightbulb, Rocket, Users } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation-First",
      description: "We stay at the forefront of AI technology to deliver cutting-edge solutions."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Results-Driven",
      description: "Every AI solution is designed to deliver measurable business outcomes and ROI."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Team",
      description: "Our team of AI specialists brings deep expertise in machine learning and automation."
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Future-Ready",
      description: "We build scalable AI solutions that grow with your business needs."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                About BTEHub
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                BTEHub is a leading artificial intelligence company specializing in AI automation, 
                chatbot development, and prompt engineering. We help businesses harness the power of AI 
                to streamline operations, enhance customer experiences, and drive innovation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our expertise spans across machine learning, natural language processing, and intelligent 
                automation, enabling us to deliver comprehensive AI solutions that transform how businesses operate.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 flex items-center justify-center">
                <img 
                  src="/api/placeholder/400/400" 
                  alt="AI Technology" 
                  className="rounded-xl shadow-lg w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow bg-background border-0">
                <div className="text-primary mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
