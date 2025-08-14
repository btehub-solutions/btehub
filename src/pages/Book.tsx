import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingCalendar from "@/components/BookingCalendar";

const Book = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Book Your AI Consultation
            </h1>
            <p className="text-xl text-muted-foreground">
              Schedule a free consultation to discuss your AI automation needs
            </p>
          </div>
          <BookingCalendar />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Book;