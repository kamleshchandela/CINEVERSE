import moviesData from '@/data/movies.json';
import seriesData from '@/data/series.json';
import reviewsData from '@/data/reviews.json';
import { Movie, Review, SearchItem, Series } from '@/types';

const movies = moviesData as Movie[];
const series = seriesData as Series[];
const reviews = reviewsData as Review[];

// MongoDB equivalent: db.collection('movies').find({})
export function getAllMovies(): Movie[] {
  return movies;
}

// MongoDB equivalent: db.collection('movies').findOne({ _id: id })
export function getMovieById(id: string): Movie | undefined {
  return movies.find((m) => m._id === id);
}

// MongoDB equivalent: db.collection('movies').find({ isTopTen: true }).sort({ topTenRank: 1 })
export function getTopTenMovies(): Movie[] {
  return movies
    .filter((m) => m.isTopTen)
    .sort((a, b) => a.topTenRank - b.topTenRank);
}

// MongoDB equivalent: db.collection('movies').find({ genre: genre })
export function getMoviesByGenre(genre: string): Movie[] {
  return movies.filter((m) =>
    m.genre.map((g) => g.toLowerCase()).includes(genre.toLowerCase()),
  );
}

export function getAllSeries(): Series[] {
  return series;
}

export function getSeriesById(id: string): Series | undefined {
  return series.find((s) => s._id === id);
}

export function getTopTenSeries(): Series[] {
  return series
    .filter((s) => s.isTopTen)
    .sort((a, b) => a.topTenRank - b.topTenRank);
}

export function getSeriesByGenre(genre: string): Series[] {
  return series.filter((s) =>
    s.genre.map((g) => g.toLowerCase()).includes(genre.toLowerCase()),
  );
}

// MongoDB equivalent: db.collection('reviews').find({ contentId: contentId })
export function getReviewsForContent(contentId: string): Review[] {
  return reviews
    .filter((r) => r.contentId === contentId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllGenres(): string[] {
  const movieGenres = movies.flatMap((m) => m.genre);
  const seriesGenres = series.flatMap((s) => s.genre);
  return [...new Set([...movieGenres, ...seriesGenres])].sort();
}

export function getGenreCount(genre: string): number {
  return getMoviesByGenre(genre).length + getSeriesByGenre(genre).length;
}

export function getGenrePoster(genre: string): string {
  const match =
    getMoviesByGenre(genre)[0] ?? getSeriesByGenre(genre)[0] ?? undefined;
  return match?.posterUrl ?? '';
}

export function getSearchItems(): SearchItem[] {
  return [
    ...movies.map((m) => ({
      id: m._id,
      title: m.title,
      type: 'movie' as const,
      year: m.year,
    })),
    ...series.map((s) => ({
      id: s._id,
      title: s.title,
      type: 'series' as const,
      year: s.year,
    })),
  ].sort((a, b) => a.title.localeCompare(b.title));
}
