import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BookingModal } from "@/components/BookingModal";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const Blog = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const blogPosts = [
    {
      title: "Top 10 Wedding Venues in Atchutapuram: Why Happy Function Hall Leads the Way",
      excerpt: "Discover what makes Happy Function Hall the premier choice for weddings in Atchutapuram, from our elegant interiors to exceptional service.",
      category: "Wedding Tips",
      date: "December 15, 2024",
      readTime: "5 min read",
      image: "/lovable-uploads/c4b55e10-9f8b-42b8-9740-36094e77375c.png"
    },
    {
      title: "Planning the Perfect Corporate Event in Andhra Pradesh",
      excerpt: "A comprehensive guide to organizing successful corporate events, conferences, and business meetings in our professional venue.",
      category: "Corporate Events",
      date: "December 10, 2024",
      readTime: "7 min read",
      image: "/lovable-uploads/41b466a7-ae27-41e7-9fbc-7724abf9bb82.png"
    },
    {
      title: "Birthday Party Ideas: Creating Memorable Celebrations",
      excerpt: "Transform your special day with our creative birthday party themes, decoration ideas, and entertainment options.",
      category: "Birthday Parties",
      date: "December 5, 2024",
      readTime: "4 min read",
      image: "/lovable-uploads/c7ecad60-a010-4f99-82a4-0de7078f165a.png"
    },
    {
      title: "The Ultimate Wedding Planning Checklist for Atchutapuram Brides",
      excerpt: "Step-by-step wedding planning guide specifically tailored for couples planning their dream wedding in Atchutapuram.",
      category: "Wedding Planning",
      date: "November 30, 2024",
      readTime: "10 min read",
      image: "/lovable-uploads/9784c09e-0556-4665-8b19-0e44b18f408c.png"
    },
    {
      title: "Catering Trends 2024: What's Hot in Event Dining",
      excerpt: "Explore the latest catering trends and how our chef creates memorable dining experiences for your special events.",
      category: "Catering",
      date: "November 25, 2024",
      readTime: "6 min read",
      image: "/lovable-uploads/2427ab95-ced8-467e-8a1f-a192ad324a27.png"
    },
    {
      title: "How to Choose the Perfect Function Hall for Your Event",
      excerpt: "Essential factors to consider when selecting a venue for your celebration, from capacity to amenities and location.",
      category: "Event Planning",
      date: "November 20, 2024",
      readTime: "8 min read",
      image: "/lovable-uploads/ed7fdabd-4dda-4a06-9536-bf6eed8b4be1.png"
    }
  ];

  const categories = ["All", "Wedding Tips", "Corporate Events", "Birthday Parties", "Event Planning", "Catering"];

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
              <Badge variant="outline" className="mb-4">Event Planning Blog</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Expert Tips & Event Inspiration
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Get the latest insights on event planning, wedding tips, and celebration ideas 
                from our experienced team at Happy Function Hall Atchutapuram.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      Read More <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with Event Planning Tips
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest event planning tips, venue updates, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Plan Your Perfect Event?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let our expert team help you create an unforgettable celebration at Happy Function Hall.
            </p>
            <Button 
              size="lg"
              onClick={() => setIsBookingModalOpen(true)}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Your Event Today
            </Button>
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

export default Blog;