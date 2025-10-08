import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import ecommerceImage from "@/assets/portfolio-ecommerce-chatbot.jpg";
import educationImage from "@/assets/portfolio-education-ai.jpg";
import healthcareImage from "@/assets/portfolio-healthcare-automation.jpg";

const portfolioProjects = [
  {
    title: "E-Commerce AI Chatbot",
    client: "RetailPro Nigeria",
    industry: "E-Commerce",
    description: "Intelligent customer service chatbot handling product inquiries, order tracking, and personalized recommendations.",
    results: [
      "80% reduction in customer service workload",
      "50% increase in customer satisfaction scores",
      "24/7 automated support coverage",
      "35% boost in conversion rates"
    ],
    technologies: ["GPT-4", "Custom NLP", "Multi-channel Integration"],
    image: ecommerceImage
  },
  {
    title: "Educational Platform AI Assistant",
    client: "EduBridge Learning",
    industry: "Education",
    description: "Personalized learning assistant that adapts to student needs, provides instant feedback, and tracks progress.",
    results: [
      "60% improvement in student engagement",
      "45% faster assignment completion",
      "92% student satisfaction rate",
      "Reduced teacher administrative time by 40%"
    ],
    technologies: ["Machine Learning", "Adaptive Learning AI", "Analytics Dashboard"],
    image: educationImage
  },
  {
    title: "Healthcare Appointment Automation",
    client: "MediCare Clinics",
    industry: "Healthcare",
    description: "AI-powered scheduling system with appointment reminders, patient pre-screening, and automated follow-ups.",
    results: [
      "70% reduction in no-show appointments",
      "90% automation of scheduling tasks",
      "Enhanced patient communication",
      "Improved staff productivity by 50%"
    ],
    technologies: ["NLP", "Calendar Integration", "SMS/Email Automation"],
    image: healthcareImage
  }
];

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="AI Portfolio - BTEHub Success Stories | 200+ AI Solutions Deployed"
        description="Explore BTEHub's AI portfolio showcasing successful chatbot development, automation projects, and AI implementations across e-commerce, education, and healthcare. See real results from our 200+ deployed solutions."
        canonicalUrl="https://btehub.com/portfolio"
      />
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Our Success Stories
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from real businesses. See how we've helped organizations transform with AI.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="space-y-16">
            {portfolioProjects.map((project, index) => (
              <Card 
                key={index} 
                className="overflow-hidden border-border/50 bg-card/50 backdrop-blur card-hover"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative h-64 md:h-full min-h-[300px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-8">
                    <CardHeader className="p-0 mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{project.industry}</Badge>
                        <Badge variant="outline">{project.client}</Badge>
                      </div>
                      <CardTitle className="text-3xl mb-3">{project.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0">
                      <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-4 text-foreground">Key Results:</h3>
                        <ul className="space-y-2">
                          {project.results.map((result, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-3 text-foreground">Technologies Used:</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20 p-12 rounded-2xl bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 border border-border/50">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how AI can transform your business and deliver measurable results.
            </p>
            <Button asChild size="lg" variant="professional">
              <Link to="/book" className="gap-2">
                Schedule a Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;