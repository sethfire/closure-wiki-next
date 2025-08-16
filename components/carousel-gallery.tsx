"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  src: string;
  thumb: string;
  title: string;
  desc: string;
  display: string;
}

export default function CarouselGallery({ images }: { images: GalleryImage[] }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const showThumbnails = true;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for main carousel
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full">
      {/* Main carousel */}
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative aspect-square md:aspect-video w-full overflow-hidden bg-card">
          {images.map((image, index) => (
            <div
              key={`slide-${index}`}
              className={cn(
                "absolute inset-0 transform transition-all duration-500 ease-in-out",
                index === currentIndex
                  ? "translate-x-0 opacity-100"
                  : index < currentIndex
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0",
              )}
            >
              <img
                src={image.src}
                alt={`Image ${index + 1}`}
                className={`h-full w-full ${image.display}`}
                loading="lazy" 
                decoding="async"
              />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer"
          onClick={prevSlide}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
          onClick={nextSlide}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>

        {/* Caption */}
        <div className="absolute right-0 bottom-0 left-0 p-4 text-xs text-white">
          <b>{images[currentIndex].title}</b><br/>{images[currentIndex].desc}
        </div>
      </div>

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="flex gap-2 overflow-x-auto px-2 py-2">
          {images.map((image, index) => (
            <button
              key={`thumb-${index}`}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 transition-all duration-200 cursor-pointer",
                index === currentIndex
                  ? ""
                  : "opacity-50 hover:opacity-100",
              )}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={image.thumb}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="h-full w-full rounded-sm object-cover"
                loading="lazy" 
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
