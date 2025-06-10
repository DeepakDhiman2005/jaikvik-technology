import { useEffect, useRef } from "react";

type WebsiteCardProps = {
  website: {
    url: string;
    imageSrc: string;
    alt?: string;
  };
  index: number;
  scrollActive: boolean;
  onScrollComplete?: () => void;
};

const WebsiteCard = ({
  website,
  index,
  scrollActive,
  onScrollComplete,
}: WebsiteCardProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setImagePosition = () => {
    const image = imageRef.current;
    const container = containerRef.current;

    if (image && container) {
      const imageHeight = image.getBoundingClientRect().height;
      const containerHeight = container.getBoundingClientRect().height;

      if (imageHeight > containerHeight) {
        image.style.transition = "none";
        image.style.bottom = `${-(imageHeight - containerHeight)}px`;
      } else {
        image.style.bottom = "0px";
      }
    }
  };

  useEffect(() => {
    const image = imageRef.current;

    const handleTransitionEnd = () => {
      onScrollComplete?.();
      image?.removeEventListener("transitionend", handleTransitionEnd);
    };

    if (scrollActive) {
      // Start scrolling animation when this slide is active
      const startScroll = () => {
        const image = imageRef.current;
        const container = containerRef.current;
        if (image && container) {
          const imageHeight = image.getBoundingClientRect().height;
          const containerHeight = container.getBoundingClientRect().height;

          if (imageHeight > containerHeight) {
            // Reset position immediately
            image.style.transition = "none";
            image.style.bottom = `${-(imageHeight - containerHeight)}px`;

            // Trigger scroll on next tick
            requestAnimationFrame(() => {
              image.style.transition = "bottom 5000ms linear";
              image.style.bottom = "0px";
              image.addEventListener("transitionend", handleTransitionEnd);
            });
          } else {
            // No scroll needed
            onScrollComplete?.();
          }
        }
      };

      if (image?.complete) {
        startScroll();
      } else {
        image?.addEventListener("load", startScroll);
      }

      // Cleanup previous listeners
      return () => {
        image?.removeEventListener("transitionend", handleTransitionEnd);
        image?.removeEventListener("load", startScroll);
      };
    } else {
      // If slide not active, reset image position and remove listener
      setImagePosition();
      image?.removeEventListener("transitionend", handleTransitionEnd);
    }
  }, [scrollActive, onScrollComplete]);

  // Also adjust image position on window resize
  useEffect(() => {
    const onResize = () => setImagePosition();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      className="websiteCard"
      ref={containerRef}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <a
        href={website.url}
        target="_blank"
        rel="noopener noreferrer"
        className="screen block aspect-[19/16] overflow-hidden relative mx-auto"
      >
        <img
          src={website.imageSrc}
          alt={website.alt || `Website ${index + 1}`}
          className="max-w-full h-auto absolute inset-x-0 bottom-0 m-auto p-0 z-0 object-cover"
          ref={imageRef}
          draggable={false}
        />
      </a>
    </div>
  );
};

export default WebsiteCard;
