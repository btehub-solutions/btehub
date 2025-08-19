
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import BookingCalendar from "@/components/BookingCalendar";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <Newsletter />
      <BookingCalendar />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
