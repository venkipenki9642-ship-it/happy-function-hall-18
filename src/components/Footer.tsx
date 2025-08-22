import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

export const Footer = () => {
  const handleInstagramClick = () => {
    window.open("https://instagram.com/happy_function_hall_k", "_blank");
  };

  const handleCallClick = () => {
    window.location.href = "tel:9677352267";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:somesh.kandregula@gmail.com";
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Happy Function Hall</h3>
            <p className="text-muted-foreground text-sm">
              Your premier destination for memorable events in Atchutapuram. 
              Creating unforgettable experiences with elegant venues and exceptional service.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Atchutapuram, Visakhapatnam</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <button 
                  onClick={handleCallClick}
                  className="hover:text-primary transition-colors"
                >
                  +91 9677352267
                </button>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <button 
                  onClick={handleEmailClick}
                  className="hover:text-primary transition-colors"
                >
                  somesh.kandregula@gmail.com
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <a href="#home" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </a>
              <a href="#gallery" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Gallery
              </a>
              <a href="#pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </a>
              <a href="#contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleInstagramClick}
                className="h-8 w-8"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => window.open("https://facebook.com/happyfunctionhall", "_blank")}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => window.open("https://twitter.com/happyfunctionhall", "_blank")}
              >
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Stay connected for updates and special offers
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Happy Function Hall. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};