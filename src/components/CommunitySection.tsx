import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UsersThree, MicrophoneStage, YoutubeLogo, Globe } from "@phosphor-icons/react";

const communityActivities = [
  {
    title: "BTEHub Daily Updates",
    description: "Authoring daily insights on AI tools, technology trends, and industry developments for business leaders.",
    icon: <Globe weight="duotone" className="w-8 h-8 text-primary" />,
    tag: "Thought Leadership"
  },
  {
    title: "Corporate AI Training",
    description: "Conducted AI workshops for GText Holdings, NBI Institutes, and Ogun Tech Community (OTC).",
    icon: <UsersThree weight="duotone" className="w-8 h-8 text-primary" />,
    tag: "Education"
  },
  {
    title: "Guest Speaker - World Radio Day 2026",
    description: "Keynote on the intersection of broadcast media and emerging AI technology at Nigeria Union of Journalists.",
    icon: <MicrophoneStage weight="duotone" className="w-8 h-8 text-primary" />,
    tag: "Public Speaking"
  },
  {
    title: "Featured Expert on OGTV",
    description: "Discussed 'AI Engineering Skills | Profit Point', addressing practical AI applications and strategic positioning.",
    icon: <YoutubeLogo weight="duotone" className="w-8 h-8 text-primary" />,
    tag: "Media Feature"
  }
];

export const CommunitySection = () => {
  return (
    <section id="community" className="py-20 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ecosystem & Knowledge Leadership</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contributing to the growth of the AI ecosystem through teaching, speaking, and mentoring the next generation of technologists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityActivities.map((activity, index) => (
            <Card key={index} className="border-border/50 bg-card/50 backdrop-blur card-hover hover:-translate-y-2 transition-all">
              <CardHeader>
                <div className="mb-4">{activity.icon}</div>
                <Badge variant="secondary" className="w-fit mb-2">{activity.tag}</Badge>
                <CardTitle className="text-xl">{activity.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">{activity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
