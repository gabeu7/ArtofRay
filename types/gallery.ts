export interface ArtworkImage {
	id: string;
	title: string;
	artist: string;
	description: string;
	imagePath: string;
	blurDataUrl?: string; // for blur placeholder
	width: number;
	height: number;
	alt: string;
  }
  