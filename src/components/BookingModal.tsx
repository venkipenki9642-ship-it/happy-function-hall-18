import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock, CreditCard, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [eventType, setEventType] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const timeSlots = [
    "9:00 AM - 1:00 PM",
    "2:00 PM - 6:00 PM", 
    "7:00 PM - 11:00 PM",
    "Full Day (9:00 AM - 11:00 PM)"
  ];

  const eventTypes = [
    "Wedding",
    "Reception", 
    "Birthday Party",
    "Corporate Event",
    "Anniversary",
    "Graduation",
    "Other"
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleBooking = async () => {
    console.log("Starting booking process...");
    setIsSubmitting(true);
    
    try {
      console.log("Calling send-booking-email function with data:", {
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        eventType: eventType,
        eventDate: selectedDate ? format(selectedDate, "PPP") : "",
        timeSlot: selectedTime,
        guestCount: guestCount,
      });
      
      // Send booking email
      const { data, error } = await supabase.functions.invoke('send-booking-email', {
        body: {
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          eventType: eventType,
          eventDate: selectedDate ? format(selectedDate, "PPP") : "",
          timeSlot: selectedTime,
          guestCount: guestCount,
          message: contactInfo.message
        }
      });

      console.log("Edge function response:", { data, error });

      if (error) {
        console.error("Error sending booking email:", error);
        toast({
          title: "Error",
          description: "Failed to send booking confirmation. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Show success
      setStep(4);
      toast({
        title: "Success!",
        description: "Booking confirmation sent to your email.",
      });

      setTimeout(() => {
        onClose();
        setStep(1);
        setSelectedDate(undefined);
        setSelectedTime("");
        setEventType("");
        setGuestCount("");
        setContactInfo({ name: "", phone: "", email: "", message: "" });
        setIsSubmitting(false);
      }, 3000);
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const handlePayment = () => {
    toast({
      title: "Coming Soon",
      description: "Online payment integration will be available soon. Proceeding with booking...",
    });
    handleBooking();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Book Your Event
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Date & Time Selection */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Select Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Choose your event date:</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  className={cn("rounded-md border p-3 pointer-events-auto")}
                />
              </div>
              
              {selectedDate && (
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Available time slots for {format(selectedDate, "PPP")}:
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="h-12 text-left justify-start"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleNext}
                  disabled={!selectedDate || !selectedTime}
                  className="min-w-[100px]"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Event Details */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="eventType">Event Type *</Label>
                <Select value={eventType} onValueChange={setEventType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="guests">Expected Number of Guests *</Label>
                <Input
                  id="guests"
                  type="number"
                  placeholder="e.g., 200"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={contactInfo.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setContactInfo({...contactInfo, phone: value});
                  }}
                  maxLength={10}
                  required
                />
                {contactInfo.phone && contactInfo.phone.length !== 10 && (
                  <p className="text-sm text-destructive mt-1">Phone number must be exactly 10 digits</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your Gmail address"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  required
                />
                {contactInfo.email && !contactInfo.email.endsWith('@gmail.com') && (
                  <p className="text-sm text-destructive mt-1">Email must be a Gmail address (@gmail.com)</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="message">Special Requirements (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Any special requirements or additional information"
                  value={contactInfo.message}
                  onChange={(e) => setContactInfo({...contactInfo, message: e.target.value})}
                />
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={
                    !eventType || 
                    !guestCount || 
                    !contactInfo.name || 
                    !contactInfo.phone || 
                    contactInfo.phone.length !== 10 ||
                    !contactInfo.email ||
                    !contactInfo.email.endsWith('@gmail.com')
                  }
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Booking Summary & Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-semibold">Booking Summary</h3>
                <p><strong>Date:</strong> {selectedDate && format(selectedDate, "PPP")}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Event Type:</strong> {eventType}</p>
                <p><strong>Guests:</strong> {guestCount}</p>
                <p><strong>Name:</strong> {contactInfo.name}</p>
                <p><strong>Phone:</strong> {contactInfo.phone}</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Payment Options</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  You can pay the booking amount now or contact us to discuss payment terms.
                </p>
                <div className="space-y-2">
                  <Button onClick={handlePayment} className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Pay Now (Online Payment)"}
                  </Button>
                  <Button variant="outline" onClick={handleBooking} className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Book Now (Pay Later)"}
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <Card>
            <CardContent className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
              <p className="text-muted-foreground mb-4">
                Thank you for choosing Happy Function Hall. We will contact you shortly to confirm the details.
              </p>
              <p className="text-sm text-muted-foreground">
                You will receive a confirmation email and SMS with booking details.
              </p>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};