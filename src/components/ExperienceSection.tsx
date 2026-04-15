import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, CalendarBlank } from "@phosphor-icons/react";

const experiences = [
  {
    title: "Founder & Lead Engineer",
    company: "BTEHub Solutions",
    period: "Present",
    highlights: [
      "Driving tech-forward AI brand building intelligent systems and automation workflows",
      "Designing end-to-end AI/ML systems focused on real-world implementation",
      "Building autonomous AI agents and workflows that improve business productivity",
      "Leading 'BTEHub Daily' thought leadership, delivering AI insights and tutorials"
    ]
  },
  {
    title: "AI/ML Engineer & Head of Digital Strategy",
    company: "NBI Institute",
    period: "Present",
    highlights: [
      "Leading AI and digital strategy at the No. 1 vocational institution in Ogun State",
      "Integrating AI, Data Analytics, and emerging technologies into curriculum",
      "Overseeing digital strategy across platforms including student portals and alumni network",
      "Facilitating hands-on AI training for students preparing for global careers"
    ]
  },
  {
    title: "Cluster Team Lead",
    company: "Ogun Tech Community",
    period: "Present",
    highlights: [
      "Leading a cluster team within a network of 50+ innovation hubs and hubs",
      "Driving capacity development and networking initiatives in Ogun State",
      "Connecting tech talent and startups to local and international funding",
      "Contributing to policy advocacy for a supportive entrepreneurial environment"
    ]
  }
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Strategic Impact & Milestones</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our collective journey in leading high-impact AI and Machine Learning initiatives.
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <Card key={index} className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Briefcase weight="duotone" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{exp.title}</CardTitle>
                    <p className="text-lg font-medium text-primary">{exp.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground bg-secondary/30 px-4 py-1.5 rounded-full text-sm">
                  <CalendarBlank weight="duotone" className="w-4 h-4" />
                  Established {exp.period}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
