import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
// Use the uploaded images from public folder
import hallBirthdayCelebration from "/lovable-uploads/4f7c198b-14fb-442d-8e7e-d19baa4ffd7e.png";
import hallPresentationSetup from "/lovable-uploads/ed7fdabd-4dda-4a06-9536-bf6eed8b4be1.png";
import hallWeddingCeremony from "/lovable-uploads/327986fb-47f0-4684-8bc5-3846466354e8.png";
import hallEventBanner from "/lovable-uploads/c4b55e10-9f8b-42b8-9740-36094e77375c.png";
import hallGraduationEvent from "/lovable-uploads/c7ecad60-a010-4f99-82a4-0de7078f165a.png";
import hallPartyDecorations from "/lovable-uploads/41b466a7-ae27-41e7-9fbc-7724abf9bb82.png";

const VideoCard = ({ video, index, onClick }: { video: any, index: number, onClick: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play();
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Card 
      className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Card>
  );
};

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const galleryImages = [
    {
      src: hallBirthdayCelebration,
      title: "Birthday Celebration",
      category: "Celebrations",
      description: "Colorful birthday party setup with custom balloons and personalized decorations"
    },
    {
      src: hallPresentationSetup,
      title: "Corporate Events",
      category: "Corporate",
      description: "Professional presentation setup with modern audio-visual equipment"
    },
    {
      src: hallWeddingCeremony,
      title: "Wedding Ceremonies",
      category: "Weddings",
      description: "Elegant wedding ceremony setup with beautiful stage and floral decorations"
    },
    {
      src: hallEventBanner,
      title: "Event Setup",
      category: "Events",
      description: "Custom event banners and professional lighting for all occasions"
    },
    {
      src: hallGraduationEvent,
      title: "Graduation Events",
      category: "Education",
      description: "Graduation ceremonies with custom branding and balloon decorations"
    },
    {
      src: hallPartyDecorations,
      title: "Party Decorations",
      category: "Celebrations",
      description: "Beautiful party decorations with themed balloon arrangements"
    }
  ];

  const videos = [
    {
      src: "/videos/comp3.mp4",
      title: "Event Highlights",
      description: "Beautiful moments from our venue events"
    },
    {
      src: "/videos/comp4.mp4",
      title: "Celebration Moments",
      description: "Special occasions celebrated at our venue"
    },
    {
      src: "/videos/comp5.mp4",
      title: "Function Setup",
      description: "Professional event arrangements and setup"
    },
    {
      src: "/videos/comp6.mp4",
      title: "Party Moments",
      description: "Joyful celebrations and party highlights"
    },
    {
      src: "/videos/comp7.mp4",
      title: "Event Coverage",
      description: "Comprehensive coverage of our events"
    },
    {
      src: "/videos/compress2.mp4",
      title: "Special Events",
      description: "Memorable moments from special occasions"
    }
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Venue
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Venue Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our beautiful AC function hall spaces perfect for your special events in Atchutapuram.
          </p>
        </div>

        {/* Gallery Grid - Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {galleryImages.map((image, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-white/30">
                    {image.category}
                  </Badge>
                  <h3 className="font-semibold text-lg">{image.title}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
                <p className="text-muted-foreground text-sm">{image.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Videos Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Videos
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Event Highlights
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch highlights from our beautiful events and celebrations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <VideoCard 
                key={index} 
                video={video}
                index={index}
                onClick={() => setSelectedVideo(index)}
              />
            ))}
          </div>
        </div>

        {/* Image Modal */}
        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 bg-black/95 border-0">
            {selectedImage !== null && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                
                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-white/30">
                    {galleryImages[selectedImage].category}
                  </Badge>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {galleryImages[selectedImage].title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {galleryImages[selectedImage].description}
                  </p>
                </div>
              </div>
          )}
        </DialogContent>
        </Dialog>

        {/* Video Modal */}
        <Dialog open={selectedVideo !== null} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl p-0 bg-black/95 border-0">
            {selectedVideo !== null && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                  onClick={() => setSelectedVideo(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                
                <video
                  src={videos[selectedVideo].src}
                  className="w-full h-auto max-h-[80vh] object-contain"
                  controls
                  autoPlay
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};