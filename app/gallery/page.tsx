interface ArtPiece {
	id: string;
	title: string;
	artist: string;
	imageUrl: string;
  }

'use client';

import { useState } from "react";
import { galleryImages } from "@/lib/gallery-data";
import { ArtworkCard } from "@/components/gallery/artwork-card";
import { Lightbox } from "@/components/gallery/lightbox";
import type { ArtworkImage } from "@/types/gallery";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<ArtworkImage | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gallery</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onImageClick={setSelectedImage}
          />
        ))}
      </div>

      <Lightbox
        images={galleryImages}
        currentImage={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}