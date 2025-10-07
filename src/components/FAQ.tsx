import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What AI services does BTEHub offer?",
    answer: "We offer comprehensive AI solutions including custom AI development, chatbot creation, prompt engineering, AI automation, system integration, and strategic AI consulting. Each solution is tailored to your specific business needs."
  },
  {
    question: "How long does it take to implement an AI solution?",
    answer: "Project timelines vary based on complexity. Simple chatbots can be ready in 1-2 weeks, while comprehensive AI systems may take 4-8 weeks. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "Do I need technical knowledge to work with BTEHub?",
    answer: "Not at all! We handle all the technical aspects. You just need to share your business goals and challenges. We'll guide you through the entire process with clear, jargon-free communication."
  },
  {
    question: "What industries do you work with?",
    answer: "We've successfully delivered AI solutions across 50+ industries including e-commerce, education, healthcare, finance, retail, logistics, and professional services. Our solutions are adaptable to any sector."
  },
  {
    question: "How much do your services cost?",
    answer: "Pricing varies based on project scope, complexity, and requirements. We offer flexible packages starting from affordable entry points for small businesses to enterprise solutions. Book a free consultation to get a customized quote."
  },
  {
    question: "Do you provide training and support?",
    answer: "Yes! We provide comprehensive training for your team and ongoing support to ensure you get maximum value from your AI solutions. We also share free training resources through our community."
  },
  {
    question: "Can you integrate AI into our existing systems?",
    answer: "Absolutely. We specialize in seamless AI integration with existing platforms, databases, and workflows. We'll work with your current tech stack to enhance rather than replace your systems."
  },
  {
    question: "What makes BTEHub different from other AI agencies?",
    answer: "We combine deep technical expertise with practical business understanding. We're focused on delivering measurable ROI, not just cool technology. Plus, we're committed to building the AI ecosystem in Nigeria and beyond through community education and partnerships."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about working with BTEHub
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 bg-card/30 backdrop-blur"
              >
                <AccordionTrigger className="text-left hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;