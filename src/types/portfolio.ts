export type CategoryType = 'travelling' | 'food' | 'streets' | 'aarti' | 'temple';

export interface PhotoClip {
  id: string;
  category: CategoryType;
  mediaType: 'photo' | 'video';
  duration?: string;
  title: string;
  subtitle: string;
  image: string;
  videoUrl?: string;
  aspectRatio: '16:9' | '4:3' | '3:4';
  location: string;
  timeOfDay: string;
  story: string;
  overlayText?: string;
  audioMood?: string;
  friendNote?: string;
  exif: {
    camera: string;
    lens: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
}

export interface InstagramReel {
  id: string;
  title: string;
  caption: string;
  audioTrack: string;
  duration: string;
  views: string;
  likes: string;
  comments: string;
  coverImage: string;
  videoUrl?: string;
  videoGradient: string;
  accentColor: string;
  tags: string[];
  friendMention?: string;
  overlayQuote?: string;
  hindiScript?: string;
  englishSub?: string;
  quoteSequence?: string[];
}

export interface WikipediaFact {
  label: string;
  value: string;
}
