import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import ecommerceImage from "@/assets/portfolio-ecommerce-chatbot.jpg";
import educationImage from "@/assets/portfolio-education-ai.jpg";
import healthcareImage from "@/assets/portfolio-healthcare-automation.jpg";
import { ExperienceSection } from "@/components/ExperienceSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { CommunitySection } from "@/components/CommunitySection";

const portfolioProjects = [
  {
    title: "AlertDrive AI",
    client: "Safety First Initiative",
    industry: "Computer Vision",
    description: "Real-time driver monitoring system for drowsiness and distraction detection using computer vision and deep learning.",
    results: [
      "98% accuracy in drowsiness detection",
      "Real-time processing with <50ms latency",
      "Successfully tested in diverse lighting conditions",
      "Integrated with fleet management systems"
    ],
    technologies: ["Python", "PyTorch", "OpenCV", "Deep Learning"],
    image: healthcareImage
  },
  {
    title: "TaxNaija",
    client: "Nigerian Fintech",
    industry: "FinTech/Tax",
    description: "AI-powered tax classification and liability prediction platform for Nigerian employees and businesses.",
    results: [
      "95% accuracy in tax classification",
      "Automated liability reports in seconds",
      "Up-to-date with current Nigerian tax laws",
      "User-friendly conversational interface"
    ],
    technologies: ["NLP", "FastAPI", "React", "Predictive Analytics"],
    image: ecommerceImage
  },
  {
    title: "VibeAI",
    client: "Future-Ready Professionals",
    industry: "EdTech",
    description: "A next-gen AI learning platform designed for future-ready professionals. Features a dynamic interface for mastering AI-fluent communication.",
    results: [
      "2,500+ active learners enrolled",
      "High engagement with interactive AI components",
      "Structured learning paths for AI mastery",
      "Responsive and modern user interface"
    ],
    technologies: ["Next.js", "Tailwind CSS", "OpenAI API", "Framer Motion"],
    image: educationImage
  },
  {
    title: "VetLink Connect",
    client: "Divine Agvet",
    industry: "AgriBusiness",
    description: "A premium agribusiness platform for Divine Agvet featuring homegrown solutions for Nigerian livestock farms.",
    results: [
      "Streamlined order processing for vaccines",
      "Direct connection between farmers and vets",
      "Authentic medicines verification system",
      "Improved supply chain visibility"
    ],
    technologies: ["Web Architecture", "Database Design", "Cloud Hosting"],
    image: healthcareImage
  },
  {
    title: "Olas Realtor Consulting",
    client: "Olas Realtor Ltd",
    industry: "Real Estate",
    description: "A comprehensive real estate consulting platform with an integrated AI chatbot for the Nigerian property market.",
    results: [
      "24/7 automated property inquiries",
      "Lead generation increase by 40%",
      "Professional training portal integration",
      "Seamless property discovery experience"
    ],
    technologies: ["Chatbot Development", "Real Estate API", "React"],
    image: ecommerceImage
  },
  {
    title: "O-Jay-Bee Farms Elevate",
    client: "O-Jay-Bee Farms",
    industry: "Agriculture",
    description: "A digital transformation showcase for O-Jay-Bee Farms, highlighting trusted agricultural production and processing.",
    results: [
      "Digitized farm production records",
      "Enhanced brand visibility in Ogun & Lagos",
      "Automated processing workflow tracking",
      "Scale-ready digital architecture"
    ],
    technologies: ["Digital Transformation", "Full-Stack Development", "UI/UX"],
    image: educationImage
  }
];

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Portfolio - BTEHub Solutions | AI & ML Engineering Excellence"
        description="Explore BTEHub Solutions' portfolio featuring AlertDrive AI, TaxNaija, and other high-impact AI/ML projects delivering measurable business results."
        canonicalUrl="https://btehub.com/portfolio"
      />
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Engineering Excellence
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A selection of our most impactful AI and ML engineering work, alongside our institutional milestones.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="space-y-16 mb-24">
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
                              <CheckCircle weight="duotone" className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
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

          <ExperienceSection />
          <CertificationsSection />
          <CommunitySection />

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
                <ArrowRight weight="duotone" className="w-5 h-5" />
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