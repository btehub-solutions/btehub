import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const phoneNumber = "2347045422815"; // Nigeria format without + or spaces
  const message = "Hello BTEHub! I'm interested in learning more about your AI solutions.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Button
      asChild
      size="lg"
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 rounded-full shadow-elegant hover:shadow-glow z-40 bg-[#25D366] hover:bg-[#128C7E] text-white border-0"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center gap-2"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden md:inline">WhatsApp</span>
      </a>
    </Button>
  );
};

export default WhatsAppButton;