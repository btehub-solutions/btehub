import { Card, CardContent } from "@/components/ui/card";
import { Star } from "@phosphor-icons/react";

const testimonials = [
  {
    name: "Adebayo Ogunleye",
    role: "CEO, TechStart Nigeria",
    content: "BTEHub transformed our customer service with an intelligent chatbot that handles 80% of inquiries automatically. Our response time dropped from hours to seconds.",
    rating: 5,
    image: "/lovable-uploads/25a1717a-5999-45c3-8dc4-9818931ad575.png"
  },
  {
    name: "Chioma Nwankwo",
    role: "Operations Manager, RetailPro",
    content: "The AI automation solutions from BTEHub saved us countless hours. What used to take days now happens in minutes. Incredible ROI and professional service.",
    rating: 5,
    image: "/lovable-uploads/bfff88e2-12c6-4549-beaa-a63c637758e0.png"
  },
  {
    name: "Emeka Adekunle",
    role: "Founder, EduBridge",
    content: "Ben Sam and his team are true AI experts. They helped us integrate AI into our learning platform, making it more personalized and effective for our students.",
    rating: 5,
    image: "/lovable-uploads/f966e137-0539-43d9-b377-bb922e89d1e6.png"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Client Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how we've helped businesses transform with AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} weight="fill" className="w-5 h-5 text-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;