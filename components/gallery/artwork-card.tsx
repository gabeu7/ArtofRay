import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { ArtworkImage } from "@/types/gallery";

interface ArtworkCardProps {
  artwork: ArtworkImage;
  onImageClick: (artwork: ArtworkImage) => void;
}

export function ArtworkCard({ artwork, onImageClick }: ArtworkCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card 
      className="group overflow-hidden cursor-pointer"
      onClick={() => onImageClick(artwork)}
    >
      <div className="relative aspect-square">
        {/* Loading placeholder */}
        {isLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        
        <Image
          src={artwork.imagePath}
          alt={artwork.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`
            object-cover transition-all duration-300
            group-hover:scale-105
            ${isLoading ? 'opacity-0' : 'opacity-100'}
          `}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      {/* Don't show title and other info on card in gallery view
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{artwork.title}</h3>
        <p className="text-sm text-muted-foreground">{artwork.artist}</p>
      </CardContent> 
      */}
    </Card>
  );
}