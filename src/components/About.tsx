import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Utensils, Car, Music, Shield } from "lucide-react";

export const About = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "500+ Capacity",
      description: "Spacious AC halls that can accommodate large gatherings with comfortable seating arrangements."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Booking",
      description: "Easy scheduling with availability calendar and instant confirmation for your convenience."
    },
    {
      icon: <Utensils className="h-6 w-6" />,
      title: "Catering Services",
      description: "Professional catering with customizable menus for all dietary needs and preferences."
    },
    {
      icon: <Music className="h-6 w-6" />,
      title: "Audio/Visual Setup",
      description: "State-of-the-art sound system and lighting for any event type and ambiance."
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: "Ample Parking",
      description: "Complimentary parking for up to 200 vehicles with dedicated valet service."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "5-Star Service",
      description: "Professional staff dedicated to making your event exceptional and memorable."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our Venue
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide everything you need to make your event exceptional, 
            from planning to execution with professional care and attention to detail.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">About Happy Function Hall</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Located in the heart of Atchutapuram, Happy Function Hall has been the premier 
                choice for memorable events and celebrations. Our modern AC halls, professional 
                staff, and comprehensive facilities ensure that every event is executed flawlessly.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Events Hosted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};