
import { Card } from "@/components/ui/card";
import { Target, Lightbulb, Rocket, Users } from "lucide-react";
import cleanProfessionalAi from "@/assets/clean-professional-ai.jpg";

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
                At BTEHub, we transform ideas into intelligent solutions. We help businesses and creators 
                leverage the power of Artificial Intelligence to work smarter, faster, and more efficiently. 
                Our expertise spans AI Prompt Engineering, Chatbot Development, AI Automation Agencies (AAA), 
                and AI Consulting, providing tailored solutions that drive real results.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Whether it's automating workflows, enhancing customer engagement, or building AI-powered 
                applications, BTEHub is your partner in innovation. We combine technical expertise with 
                creative problem-solving to deliver solutions that empower businesses, simplify processes, 
                and unlock new opportunities in the AI-driven world.
              </p>
              
              <div className="space-y-4 bg-primary/5 p-6 rounded-lg border">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground">
                    To help businesses harness AI effectively, turning complex challenges into simple, actionable solutions.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground">
                    To be a leading hub for AI innovation, enabling organizations to thrive in the digital age.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 flex items-center justify-center">
                <img 
                  src={cleanProfessionalAi} 
                  alt="BTEHub Clean Professional AI Solutions" 
                  className="rounded-xl shadow-lg w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* About Founder Section */}
          <div className="mb-16 bg-card border rounded-2xl p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1 flex justify-center">
                <div className="w-64 h-64 rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="/lovable-uploads/founder-ben-sam.jpeg" 
                    alt="Ben Sam Oladoyin - Founder of BTEHub Solutions" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-2">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Meet Our Founder
                </h3>
                <h4 className="text-xl font-semibold text-primary mb-4">
                  Ben Sam Oladoyin
                </h4>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  BTEHub is an AI innovation agency built on passion, creativity, and problem-solving. We exist to design and deploy AI-driven solutions that transform industries, empower businesses, and create real impact across communities.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Founded by Ben Sam Oladoyin, a forward-thinking innovator at the intersection of AI, Chatbot development, automation, training and business solutions, BTEHub is on a mission to become one of the leading AI agencies in Nigeria and beyond.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To achieve this vision, Ben and the BTEHub team are building a strong network of AI innovators and actively seeking sponsorships, partnerships, mentorship, funding, strategic collaborations, advisory support, visibility opportunities, and access to cutting-edge tools and infrastructure that will help the agency scale.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  At BTEHub, we don't just build technology — we create practical, income-generating solutions that empower individuals, businesses, and communities to thrive in the AI-powered future.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Beyond innovation, Ben is also leading the growth of a vibrant community where AI insights, resources, and free training opportunities are shared to help more people step into the future with confidence.
                </p>
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
