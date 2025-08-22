import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { Chatbot } from "@/components/Chatbot";

const Index = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookingClick = () => {
    setIsBookingModalOpen(true);
  };

  const handleCallClick = () => {
    window.location.href = "tel:9677352267";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onBookingClick={handleBookingClick}
        onCallClick={handleCallClick}
      />
      <main>
        <Hero onBookingClick={handleBookingClick} />
        <About />
        <Gallery />
        <Pricing onBookingClick={handleBookingClick} />
        <Contact />
      </main>
      <Footer />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
      <Chatbot />
    </div>
  );
};

export default Index;
