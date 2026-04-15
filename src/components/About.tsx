
import { Card } from "@/components/ui/card";
import { Target, Lightbulb, RocketLaunch, Users } from "@phosphor-icons/react";
import cleanProfessionalAi from "@/assets/clean-professional-ai.jpg";

const About = () => {
  const values = [
    {
      icon: <Lightbulb weight="duotone" className="h-6 w-6" />,
      title: "Innovation-First",
      description: "We stay at the forefront of AI technology to deliver cutting-edge solutions."
    },
    {
      icon: <Target weight="duotone" className="h-6 w-6" />,
      title: "Results-Driven",
      description: "Every AI solution is designed to deliver measurable business outcomes and ROI."
    },
    {
      icon: <Users weight="duotone" className="h-6 w-6" />,
      title: "Expert Team",
      description: "Our team of AI specialists brings deep expertise in machine learning and automation."
    },
    {
      icon: <RocketLaunch weight="duotone" className="h-6 w-6" />,
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
                About BTEHub Solutions
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At BTEHub Solutions, we bridge the gap between complex intelligence and practical business application. Our focus is on engineering intelligent systems, automation workflows, and modern web applications that help businesses and creators scale operations and solve real-world problems.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Through BTEHub Daily and our diverse tutorial series, we advocate for making AI accessible globally. We believe that technology achieves its greatest impact when it is demystified and put into the hands of those who need it to grow and succeed in an AI-driven economy.
              </p>
              
              <div className="space-y-4 bg-primary/5 p-6 rounded-lg border">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Target weight="duotone" className="h-5 w-5 text-primary" />
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground">
                    To empower organizations to adopt AI with confidence and precision, transforming ideas into scalable tools for enterprise efficiency.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Lightbulb weight="duotone" className="h-5 w-5 text-primary" />
                    Our Core Focus
                  </h3>
                  <p className="text-muted-foreground">
                    Translating complex AI research into working digital products that deliver measurable business value.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 flex items-center justify-center">
                <img 
                  src={cleanProfessionalAi} 
                  alt="BTEHub AI Solutions Excellence" 
                  className="rounded-xl shadow-lg w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* About Leadership Section */}
          <div className="mb-16 bg-card border rounded-2xl p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1 flex justify-center">
                <div className="w-64 h-64 rounded-xl overflow-hidden shadow-lg border-2 border-primary/20">
                  <img 
                    src="/lovable-uploads/founder-ben-sam.jpeg" 
                    alt="Leadership at BTEHub Solutions" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="lg:col-span-2">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Visionary Leadership
                </h3>
                <h4 className="text-xl font-semibold text-primary mb-4">
                  Behind the Innovation
                </h4>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  BTEHub Solutions is led by a team of forward-thinking innovators dedicated to the intersection of AI engineering and strategic business growth. Our leadership is rooted in creating measurable outcomes, ensuring that every system we build is not just a prototype, but a scalable tool for efficiency.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our collective mission is to empower individuals and organizations to adopt AI with confidence and precision. Whether through enterprise solutions or industry-leading thought leadership, we are dedicated to bridging the gap between complex intelligence and practical application.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  With deep expertise in AI Engineering, Machine Learning, and Full-Stack Development, we help businesses scale operations and solve real-world problems. We believe that technology achieves its greatest impact when it is demystified and put into the hands of those who need it to grow.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Join us as we build the future of intelligent automation. BTEHub Solutions is currently expanding its global footprint, delivering excellence in AI/ML engineering roles while continuing to lead innovation at the forefront of the industry.
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
