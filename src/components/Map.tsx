import React from 'react';
import { MapPin } from 'lucide-react';

const Map = () => {
  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.234!2d82.9751805!3d17.5600071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39750019db9a1f%3A0x83f98415cc46ca10!2sHAPPY%20FUNCTION%20HALL!5e0!3m2!1sen!2sin!4v1703000000000!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Happy Function Hall Location"
        className="rounded-lg"
      />
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="h-4 w-4 text-primary" />
          <span>Happy Function Hall, Atchutapuram</span>
        </div>
      </div>
    </div>
  );
};

export default Map;