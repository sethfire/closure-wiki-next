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
  
  if (!images?.length) return null;

  const prevSlide = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const nextSlide = () => setCurrentIndex((i) => Math.min(images.length - 1, i + 1));

  const current = images[currentIndex];

  return (
    <div className="w-full">
      {/* Main image (only the visible one is rendered) */}
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative aspect-square md:aspect-video w-full overflow-hidden bg-muted dark:bg-card">
          <img
            key={current.src}
            src={current.src}
            className={cn("h-full w-full", current.display)}
            decoding="async"
          />
        </div>

        {/* Navigation */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer"
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
          onClick={nextSlide}
          disabled={currentIndex === images.length - 1}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>

        {/* Caption */}
        <div className="absolute right-0 bottom-0 left-0 p-4 text-xs">
          <b>{current.title}</b>
          <br />
          {current.desc}
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
                index === currentIndex ? "" : "opacity-50 hover:opacity-100"
              )}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={image.thumb}
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
