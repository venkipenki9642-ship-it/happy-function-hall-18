import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

interface HeaderProps {
  onBookingClick: () => void;
  onCallClick: () => void;
}

export const Header = ({ onBookingClick, onCallClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  const handleCallClick = () => {
    window.location.href = "tel:9677352267";
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Happy Function Hall" className="h-10 w-10" />
            <span className="text-xl font-bold text-foreground">Happy Function Hall</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="call"
              size="sm"
              onClick={handleCallClick}
              className="flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
            <Button
              variant="booking"
              size="sm"
              onClick={onBookingClick}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <nav className="flex flex-col space-y-3 pt-4 border-t">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col space-y-3 pt-4">
              <Button
                variant="call"
                size="sm"
                onClick={handleCallClick}
                className="flex items-center gap-2 justify-center"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </Button>
              <Button
                variant="booking"
                size="sm"
                onClick={onBookingClick}
                className="flex items-center gap-2 justify-center"
              >
                <Calendar className="h-4 w-4" />
                Book Now
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};