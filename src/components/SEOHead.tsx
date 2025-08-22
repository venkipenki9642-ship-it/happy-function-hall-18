import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schemaData?: object;
}

export const SEOHead = ({
  title = "Happy Function Hall - Premier Event Venue in Atchutapuram",
  description = "Book your perfect event at Happy Function Hall in Atchutapuram. Elegant AC halls for weddings, corporate events, and celebrations. 500+ capacity with professional service.",
  keywords = "function hall, wedding venue, event venue, Atchutapuram, AC hall, celebration venue, party hall, Andhra Pradesh, corporate events, birthday parties",
  canonical,
  ogImage = "https://yoursite.lovable.app/og-image.jpg",
  schemaData
}: SEOHeadProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Happy Function Hall" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Happy Function Hall" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@HappyFunctionHall" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Local Business Meta Tags */}
      <meta name="geo.region" content="IN-AP" />
      <meta name="geo.placename" content="Atchutapuram" />
      <meta name="geo.position" content="17.6868;83.2185" />
      <meta name="ICBM" content="17.6868, 83.2185" />
      
      {/* Schema.org JSON-LD */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};