
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingCalendar from "@/components/BookingCalendar";
import { SkipToContent } from "@/components/SkipToContent";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

const Index = () => {
  usePerformanceMonitor();

  return (
    <div className="min-h-screen">
      <SkipToContent />
      <Header />
      <main id="main-content">
        <Hero />
      <Services />
      <About />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <BookingCalendar />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
