import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import type { ArtworkImage } from "@/types/gallery";

interface LightboxProps {
  images: ArtworkImage[];
  currentImage: ArtworkImage | null;
  onClose: () => void;
}

export function Lightbox({ images, currentImage, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentImage) {
      const index = images.findIndex(img => img.id === currentImage.id);
      setCurrentIndex(index);
    }
  }, [currentImage, images]);

  const handlePrevious = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!currentImage) return null;

  const currentArtwork = images[currentIndex];

  return (
    <Dialog open={!!currentImage} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0 gap-0">
        <DialogTitle className="sr-only">
          {currentArtwork.title} by {currentArtwork.artist}
        </DialogTitle>
        
        <div className="relative w-full h-full flex items-center justify-center bg-background">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 z-50"
            onClick={handlePrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 z-50"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Image container */}
          <div className="relative w-full h-full">
            {/* Loading spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <div className="w-8 h-8 border-4 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
              </div>
            )}

            <Image
              src={currentArtwork.imagePath}
              alt={currentArtwork.alt}
              fill
              className="object-contain"
              onLoadingComplete={() => setIsLoading(false)}
              priority
            />

            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-4">
              <h3 className="text-xl font-semibold">{currentArtwork.title}</h3>
              <p className="text-sm text-muted-foreground">{currentArtwork.artist}</p>
              <p className="mt-2 text-sm">{currentArtwork.description}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
