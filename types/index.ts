export interface CastMember {
  actorId: string;
  name: string;
  role: string;
  imageUrl: string;
}

export interface Movie {
  _id: string;
  title: string;
  year: number;
  director: string;
  genre: string[];
  runtime: number;
  rating: number;
  language: string;
  description: string;
  longDescription: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  cast: CastMember[];
  streamingOn: string[];
  isTopTen: boolean;
  topTenRank: number;
  reviewCount: number;
  createdAt: string;
}

export interface Series {
  _id: string;
  title: string;
  year: number;
  creator: string;
  genre: string[];
  seasons: number;
  episodes: number;
  rating: number;
  language: string;
  status: 'Ongoing' | 'Ended';
  description: string;
  longDescription: string;
  posterUrl: string;
  backdropUrl: string;
  streamingOn: string[];
  isTopTen: boolean;
  topTenRank: number;
  cast: CastMember[];
  reviewCount: number;
}

export interface Review {
  _id: string;
  contentId: string;
  contentType: 'movie' | 'series';
  author: string;
  avatarUrl: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  likes: number;
}

export interface SearchItem {
  id: string;
  title: string;
  type: 'movie' | 'series';
  year: number;
}
