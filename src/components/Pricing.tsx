import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { CateringOptions } from "./CateringOptions";

interface PricingProps {
  onBookingClick: () => void;
}

export const Pricing = ({ onBookingClick }: PricingProps) => {
  const packages = [
    {
      name: "Basic Package",
      price: "₹15,000",
      duration: "4 Hours",
      popular: false,
      features: [
        "AC Hall (4 hours)",
        "Basic Sound System",
        "LED Lighting",
        "100 Chairs",
        "Parking Facility",
        "Basic Decoration",
        "Security Service"
      ]
    },
    {
      name: "Premium Package",
      price: "₹25,000",
      duration: "8 Hours",
      popular: true,
      features: [
        "AC Hall (8 hours)",
        "Premium Sound & DJ System",
        "Stage Setup & Lighting",
        "200 Chairs + Tables",
        "Parking Facility",
        "Premium Decoration",
        "Catering Facility Available",
        "Photography Area",
        "Green Room Access",
        "Security & Support Staff"
      ]
    },
    {
      name: "Luxury Package",
      price: "₹35,000",
      duration: "Full Day",
      popular: false,
      features: [
        "AC Hall (Full Day 12 hours)",
        "Premium A/V Equipment",
        "Professional Stage & Lighting",
        "500 Chairs + Round Tables",
        "Parking Facility",
        "Luxury Decoration & Flowers",
        "Multi-cuisine Catering",
        "Professional Photography Setup",
        "Bridal/VIP Green Room",
        "Dedicated Event Manager",
        "Security & Housekeeping",
        "Welcome Drinks Setup"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Pricing Plans
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Perfect Package
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Flexible pricing options to suit every budget and event type. 
            All packages include our standard amenities and professional service.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${
                pkg.popular ? 'border-primary shadow-lg scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl mb-2">{pkg.name}</CardTitle>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                  <span className="text-muted-foreground ml-2">/ {pkg.duration}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Perfect for {pkg.name.toLowerCase().includes('basic') ? 'intimate gatherings' : 
                    pkg.name.toLowerCase().includes('premium') ? 'medium-scale events' : 'grand celebrations'}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={onBookingClick}
                  variant={pkg.popular ? "default" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  Book {pkg.name}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-3">
                  * Additional services available. Contact for custom packages.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Catering Options */}
        <CateringOptions />

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">Need a Custom Package?</h3>
              <p className="text-muted-foreground mb-6">
                We understand every event is unique. Our team can create a customized package 
                tailored to your specific requirements and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => window.location.href = "tel:9677352267"}>
                  Call for Custom Quote
                </Button>
                <Button onClick={onBookingClick}>
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};