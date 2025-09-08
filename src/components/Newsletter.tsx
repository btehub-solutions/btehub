import { Card } from "@/components/ui/card";
import { Mail, TrendingUp, Zap } from "lucide-react";

const Newsletter = () => {
  // Generate dynamic AI highlights based on current date
  const getDynamicHighlights = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    
    const highlightSets = [
      [
        "AI Automation Boom: New no-code AI tools are making automation accessible to small businesses, reducing operational costs by up to 40%.",
        "ChatGPT for Business: OpenAI announced enhanced enterprise features that help companies create custom AI assistants in minutes.",
        "AI Content Creation: Video generation AI reached new quality levels, opening opportunities for creators and marketers worldwide.",
        "Freelancer Success: AI consultants are reporting 300% income increases by offering AI implementation services to local businesses."
      ],
      [
        "AI-Powered Analytics: Machine learning tools now predict customer behavior with 95% accuracy, revolutionizing marketing strategies.",
        "Voice AI Revolution: Real-time voice translation is breaking language barriers in global business communications.",
        "AI Writing Tools: Content creators are boosting productivity by 250% using advanced AI writing assistants for social media and blogs.",
        "Smart Customer Service: AI chatbots are handling 80% of customer inquiries, freeing up human agents for complex issues."
      ],
      [
        "AI Image Generation: Photographers and designers are expanding their services using AI to create custom visuals in seconds.",
        "Personalized Learning: AI tutoring platforms are helping professionals upskill 3x faster than traditional methods.",
        "Financial AI: Small businesses are using AI accounting tools to reduce bookkeeping time by 70% and improve accuracy.",
        "AI Sales Tools: Sales teams are closing 40% more deals using AI-powered lead scoring and personalized outreach."
      ],
      [
        "AI Code Generation: Non-technical entrepreneurs are building apps and websites using AI coding assistants.",
        "Smart Inventory: Retailers are reducing waste by 30% using AI to predict demand and optimize stock levels.",
        "AI Health Tech: Wellness coaches are offering personalized AI-driven fitness and nutrition plans to clients.",
        "Creative AI: Artists and musicians are monetizing AI-generated content across multiple platforms."
      ],
      [
        "AI Email Marketing: Marketers are seeing 180% higher open rates using AI to personalize email campaigns.",
        "Virtual Assistants: Entrepreneurs are delegating complex tasks to AI, focusing on high-value strategic work.",
        "AI Data Analysis: Business analysts are processing months of data in hours using advanced AI analytics tools.",
        "Social Media AI: Content creators are growing followers 5x faster using AI to optimize posting times and content."
      ]
    ];
    
    return highlightSets[dayOfYear % highlightSets.length];
  };

  const highlights = getDynamicHighlights();

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Newsletter Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Mail className="h-4 w-4" />
              BTEHub Weekly AI Newsletter
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🚀 AI is Reshaping Business in 2025
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The world of AI is moving fast. Stay ahead with weekly insights on the latest AI trends, 
              tools, and opportunities to grow your business and income.
            </p>
          </div>

          {/* Latest Newsletter Content */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-background to-primary/5 border-primary/20">
            <div className="space-y-6">
              {/* Main Updates */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  This Week's AI Highlights
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>{highlight.split(':')[0]}:</strong>{highlight.split(':').slice(1).join(':')}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why This Matters */}
              <div className="bg-secondary/30 p-6 rounded-lg">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Why This Matters
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  We're witnessing the democratization of AI tools. Small businesses and individual creators now have access to 
                  enterprise-level AI capabilities. This shift creates massive opportunities for those who learn to harness these tools effectively. 
                  Whether you're automating workflows, creating content, or offering AI services, the potential for income generation 
                  has never been higher.
                </p>
              </div>

              {/* Final Thought */}
              <div className="text-center pt-4">
                <p className="text-muted-foreground italic mb-4">
                  "How do you see AI changing your daily workflow? What opportunities are you exploring?"
                </p>
                <div className="text-foreground font-medium">
                  — BTEHub Team
                </div>
                <div className="text-sm text-primary mt-2">
                  <em>BTEHub: Learn AI • Build Solutions • Create Income</em>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;