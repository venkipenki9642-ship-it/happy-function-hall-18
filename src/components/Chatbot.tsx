import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Instagram, Phone, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 Welcome to Happy Function Hall! How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const { toast } = useToast();

  const quickReplies = [
    { text: "Check Availability", icon: Calendar },
    { text: "View Pricing", icon: MessageCircle },
    { text: "Call Now", icon: Phone },
    { text: "Instagram", icon: Instagram },
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Auto-reply logic
    setTimeout(() => {
      const botReply = generateBotReply(inputMessage.toLowerCase());
      const botMessage: Message = {
        id: messages.length + 2,
        text: botReply,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  const generateBotReply = (message: string): string => {
    if (message.includes('price') || message.includes('cost') || message.includes('rate')) {
      return "Our pricing starts from ₹25,000 for AC halls with full decorations. Would you like to know more about our packages? 💰";
    } else if (message.includes('book') || message.includes('availability')) {
      return "I'd be happy to help you check availability! Please click the 'Book Your Event' button on our website or call us at 9677352267. 📅";
    } else if (message.includes('capacity') || message.includes('people')) {
      return "Our halls can accommodate up to 500+ guests comfortably with AC facilities and modern amenities! 🏛️";
    } else if (message.includes('location') || message.includes('address')) {
      return "We're located in Atchutapuram, Visakhapatnam. You can find us easily using the map on our contact page! 📍";
    } else if (message.includes('instagram') || message.includes('social')) {
      return "Follow us on Instagram @happy_function_hall_k for the latest updates and event photos! 📸✨";
    } else {
      return "Thank you for your message! For immediate assistance, please call us at 9677352267 or visit our Instagram @happy_function_hall_k. How else can I help you? 😊";
    }
  };

  const handleQuickReply = (reply: string) => {
    if (reply === "Call Now") {
      window.location.href = "tel:9677352267";
    } else if (reply === "Instagram") {
      window.open("https://www.instagram.com/happy_function_hall_k/", "_blank");
    } else {
      setInputMessage(reply);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg z-50 transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100 hover:scale-110'
        } bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary`}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] z-50 shadow-2xl border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary to-accent text-white p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="h-5 w-5" />
                Happy Function Hall
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm opacity-90">We're here to help! 🎉</p>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[400px]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="p-4 border-t bg-secondary/30">
              <div className="grid grid-cols-2 gap-2 mb-3">
                {quickReplies.map((reply) => (
                  <Button
                    key={reply.text}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply.text)}
                    className="text-xs h-8"
                  >
                    <reply.icon className="h-3 w-3 mr-1" />
                    {reply.text}
                  </Button>
                ))}
              </div>
              
              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};