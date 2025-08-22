import { Button } from "@/components/ui/button";
import { Calendar, Phone, Star, Users, MapPin } from "lucide-react";
import heroBackground from "@/assets/hero-birthday-background.jpg";

interface HeroProps {
  onBookingClick: () => void;
}

export const Hero = ({ onBookingClick }: HeroProps) => {
  const handleCallClick = () => {
    window.location.href = "tel:9677352267";
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-accent/70 to-primary/80"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center text-white max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
              ✨ Happy Function Hall ✨
            </span>
            <span className="block bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent text-3xl md:text-5xl lg:text-6xl mt-2 font-extrabold">
              🎉 Your Dream Celebration 🎊
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Create unforgettable memories in our elegant AC halls in Atchutapuram, 
            perfect for weddings, corporate events, and special celebrations.
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
            <div className="flex items-center gap-2 text-sm md:text-base">
              <Users className="h-5 w-5 text-primary" />
              <span>500+ Capacity</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Atchutapuram</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base">
              <Star className="h-5 w-5 text-primary" />
              <span>5-Star Service</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="hero"
              size="xl"
              onClick={onBookingClick}
              className="w-full sm:w-auto min-w-[200px]"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Your Event
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={handleCallClick}
              className="w-full sm:w-auto min-w-[200px] border-white text-white hover:bg-white hover:text-accent transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};