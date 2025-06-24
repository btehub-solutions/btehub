
import { Card } from "@/components/ui/card";
import { Users, Target, Award, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Client-Focused",
      description: "Your success is our priority. We work closely with you to understand your goals."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Results-Driven",
      description: "We focus on delivering measurable results that impact your bottom line."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Quality Excellence",
      description: "We maintain the highest standards in everything we do, from code to customer service."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Passionate Team",
      description: "Our team loves what we do, and it shows in the quality of our work."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Our Company
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're a team of passionate professionals dedicated to helping businesses succeed in the digital world. 
                With years of experience and a commitment to excellence, we've helped hundreds of companies transform 
                their ideas into successful digital products.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our approach combines creativity with technical expertise, ensuring that every project we deliver 
                not only looks great but also performs exceptionally and drives real business results.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl p-8 flex items-center justify-center">
                <img 
                  src="/api/placeholder/400/400" 
                  alt="Team collaboration" 
                  className="rounded-xl shadow-lg w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow bg-white border-0">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
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
