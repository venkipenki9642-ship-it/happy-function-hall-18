import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BookingModal } from "@/components/BookingModal";
import { Calendar, Users, Utensils, Music, Mic, Car, Shield, Clock } from "lucide-react";

const Services = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const services = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Wedding Ceremonies",
      description: "Complete wedding packages with decoration, catering, and photography services for your special day.",
      features: ["Bridal Suite", "Mandap Setup", "Floral Decoration", "Wedding Photography"],
      price: "Starting from ₹50,000"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Corporate Events",
      description: "Professional venue for conferences, seminars, product launches, and business meetings.",
      features: ["AV Equipment", "Projector Setup", "Business Lunch", "Networking Space"],
      price: "Starting from ₹25,000"
    },
    {
      icon: <Utensils className="h-8 w-8 text-primary" />,
      title: "Birthday Parties",
      description: "Fun-filled birthday celebrations with themed decorations and entertainment options.",
      features: ["Theme Decoration", "Birthday Cake", "Entertainment", "Photo Booth"],
      price: "Starting from ₹15,000"
    },
    {
      icon: <Music className="h-8 w-8 text-primary" />,
      title: "Cultural Events",
      description: "Traditional and cultural celebrations with appropriate sound and lighting arrangements.",
      features: ["Stage Setup", "Sound System", "Traditional Decoration", "Cultural Programs"],
      price: "Starting from ₹20,000"
    }
  ];

  const facilities = [
    { icon: <Car className="h-6 w-6" />, name: "Free Parking", description: "Spacious parking for 100+ vehicles" },
    { icon: <Shield className="h-6 w-6" />, name: "Security", description: "24/7 security with CCTV surveillance" },
    { icon: <Mic className="h-6 w-6" />, name: "Sound System", description: "Professional audio equipment included" },
    { icon: <Clock className="h-6 w-6" />, name: "Flexible Timing", description: "Extended hours available on request" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onBookingClick={() => setIsBookingModalOpen(true)}
        onCallClick={() => window.location.href = "tel:9677352267"}
      />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-4">Our Services</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Complete Event Solutions in Atchutapuram
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                From intimate celebrations to grand ceremonies, we provide comprehensive event services 
                to make your special moments unforgettable.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      {service.icon}
                      <div>
                        <CardTitle className="text-2xl">{service.title}</CardTitle>
                        <Badge variant="secondary">{service.price}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <div className="space-y-2 mb-6">
                      <h4 className="font-semibold">Included Features:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {service.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <Button 
                      onClick={() => setIsBookingModalOpen(true)}
                      className="w-full"
                    >
                      Book This Service
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Premium Facilities & Amenities
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Enjoy world-class facilities and amenities designed to enhance your event experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {facilities.map((facility, index) => (
                <Card key={index} className="text-center p-6">
                  <div className="flex justify-center mb-4">
                    {facility.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{facility.name}</h3>
                  <p className="text-sm text-muted-foreground">{facility.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Plan Your Event?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today for a personalized quote and let us help you create the perfect celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => setIsBookingModalOpen(true)}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = "tel:9677352267"}
              >
                Call for Quote
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
};

export default Services;