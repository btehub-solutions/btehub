import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Certificate, BookOpen } from "@phosphor-icons/react";

const certifications = [
  {
    title: "Complete A.I. & Machine Learning, Data Science Bootcamp",
    issuer: "Udemy (Andrei Neagoie, Daniel Bourke)",
    icon: <Brain weight="duotone" className="w-8 h-8 text-primary" />,
    type: "Professional Certification"
  },
  {
    title: "100 Days of Code: The Complete Python Pro Bootcamp",
    issuer: "Udemy (Dr. Angela Yu)",
    icon: <Certificate weight="duotone" className="w-8 h-8 text-primary" />,
    type: "Technical Bootcamp"
  },
  {
    title: "The Complete Full-Stack Web Development Bootcamp",
    issuer: "Udemy (Dr. Angela Yu)",
    icon: <BookOpen weight="duotone" className="w-8 h-8 text-primary" />,
    type: "Web Engineering"
  }
];

import { Brain } from "@phosphor-icons/react";

export const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Team Expertise & Recognition</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our collective expertise is backed by industry-recognized credentials in AI, Machine Learning, and Software Engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <Card key={index} className="overflow-hidden border-border/50 bg-card/50 backdrop-blur card-hover group">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
                  {cert.icon}
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">{cert.type}</Badge>
                  <CardTitle className="text-xl">{cert.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{cert.issuer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
