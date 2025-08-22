import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChefHat, Check, Phone } from "lucide-react";

export const CateringOptions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cateringPackages = [
    {
      name: "Vegetarian Deluxe",
      pricePerPerson: "₹350",
      description: "Traditional South Indian vegetarian menu",
      items: [
        "Welcome Drink",
        "Variety Rice (Pulihora, Coconut Rice)",
        "Dal Curry",
        "Vegetable Curry (2 varieties)",
        "Sambar & Rasam",
        "Curd Rice",
        "Pickle & Papad",
        "Sweet (Payasam/Halwa)",
        "Fresh Fruits"
      ]
    },
    {
      name: "Non-Vegetarian Special",
      pricePerPerson: "₹450",
      description: "Mix of vegetarian and non-vegetarian dishes",
      items: [
        "Welcome Drink",
        "Chicken Biryani",
        "Mutton Curry",
        "Fish Fry",
        "Vegetable Curry",
        "Dal Curry",
        "Sambar & Rasam",
        "Curd Rice",
        "Pickle & Papad",
        "Sweet (Gulab Jamun)",
        "Fresh Fruits"
      ]
    },
    {
      name: "Premium Buffet",
      pricePerPerson: "₹650",
      description: "Elaborate buffet with multiple cuisines",
      items: [
        "Welcome Drinks (Multiple varieties)",
        "Live Counters (Dosa/Chat)",
        "Biryani (Chicken & Mutton)",
        "North Indian Curries (3 varieties)",
        "South Indian Curries (2 varieties)",
        "Chinese Items (2 varieties)",
        "Salads & Raita",
        "Variety Rice",
        "Desserts (Multiple varieties)",
        "Ice Cream",
        "Fresh Fruits"
      ]
    }
  ];

  return (
    <>
      <div className="mt-16 text-center">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ChefHat className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold">Catering Services Available</h3>
            </div>
            <p className="text-muted-foreground mb-6 text-lg">
              Delicious authentic South Indian cuisine prepared by our experienced chefs. 
              Choose from our variety of catering packages to make your event memorable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setIsOpen(true)} size="lg">
                <ChefHat className="h-5 w-5 mr-2" />
                View Catering Menu
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = "tel:9677352267"}>
                <Phone className="h-5 w-5 mr-2" />
                Discuss Catering Options
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <ChefHat className="h-6 w-6" />
              Catering Packages & Menu
            </DialogTitle>
            <DialogDescription className="text-center">
              Choose from our authentic South Indian catering packages
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {cateringPackages.map((pkg, index) => (
              <Card key={index} className="relative">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-primary">{pkg.pricePerPerson}</span>
                    <span className="text-muted-foreground text-sm">/ person</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2">Additional Information:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Minimum order: 50 people</li>
              <li>• Custom menu options available</li>
              <li>• Professional serving staff included</li>
              <li>• Eco-friendly disposable plates available</li>
              <li>• Special dietary requirements can be accommodated</li>
              <li>• 24-hour advance notice required</li>
            </ul>
          </div>

          <div className="mt-4 text-center">
            <Button onClick={() => window.location.href = "tel:9677352267"} className="w-full sm:w-auto">
              <Phone className="h-4 w-4 mr-2" />
              Call to Customize Your Menu
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};