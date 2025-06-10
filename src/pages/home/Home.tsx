import { VariableSizeList as List } from 'react-window';
import React, { forwardRef, useRef } from 'react';

import HeroSection from "./HeroSection";
import WebsiteSection from "./WebsiteSection";
import SocialMediaSection from "./SocialMediaSection";
import SocialMediaPostSection from "./SocialMediaPostSection";
import ReviewsSection from "./ReviewsSection";
import OurClients from "./OurClients";
import EnquireSection from "./EnquireSection";
import OurVideosSection from "./OurVideosSection";
import GalleryImages from "./GalleryImages";
import BlogsSection from "./BlogsSection";
import OurTestimonials from "./OurTestimonials";
import OurServices from "./OurSerives";
import CorporateVideosSection from './CorporateVideosSection';
import OurTechnologies from './OurTechnologies';

// Custom outer element for letting body handle scroll
const OuterElement = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => (
    <div ref={ref} {...props} style={{ ...props.style, height: 'auto' }} />
  )
);

// Component list
const sections = [
  HeroSection,
  WebsiteSection,
  OurTechnologies,
  SocialMediaSection,
  SocialMediaPostSection,
  OurVideosSection,
  GalleryImages,
  CorporateVideosSection,
  OurTestimonials,
  BlogsSection,
  OurServices,
  ReviewsSection,
  OurClients,
  EnquireSection,
];

// Define heights for each section separately
const sectionHeights = [
  400, // HeroSection
  510, // WebsiteSection
  510,
  600, // SocialMediaSection
  360, // SocialMediaPostSection
  230, // OurVideosSection
  380,
  500, // GalleryImages
  240, // OurTestimonials
  330, // BlogsSection
  380, // OurServices
  360, // ReviewsSection
  160, // OurClients
  350, // EnquireSection
];

// Calculate total height of all sections
const totalHeight = sectionHeights.reduce((sum, h) => sum + h, 0);

const Home: React.FC = () => {
  const listRef = useRef<List>(null);

  // Return height for each item
  const getItemSize = (index: number) => sectionHeights[index] || 400;

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const Section = sections[index];
    return (
      <div style={{ ...style, overflow: 'hidden' }}>
        <Section />
      </div>
    );
  };

  return (
    <main className="w-full">
      <List
        ref={listRef}
        outerElementType={OuterElement}
        height={totalHeight}  // Use total height here to render all sections
        itemCount={sections.length}
        itemSize={getItemSize}
        width="100%"
        style={{ overflow: 'visible' }} // Allow natural growth outside internal scroll
      >
        {Row}
      </List>
    </main>
  );
};

export default Home;
