import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroCarousel from "@/components/home/HeroCarousel";
import HorizontalScroll from "@/components/home/HorizontalScroll";
import TopTenList from "@/components/home/TopTenList";
import FeaturedEditorial from "@/components/home/FeaturedEditorial";
import GenreGrid, { type GenreSummary } from "@/components/home/GenreGrid";
import MovieCard from "@/components/movie/MovieCard";
import {
  getAllGenres,
  getAllMovies,
  getGenreCount,
  getGenrePoster,
  getMovieById,
  getTopTenMovies,
  getTopTenSeries,
} from "@/lib/data";

export default function HomePage() {
  const allMovies = getAllMovies();
  const heroMovies = [...allMovies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
  const trending = [...allMovies].sort((a, b) => b.rating - a.rating);
  const topMovies = getTopTenMovies();
  const topSeries = getTopTenSeries();
  const featured = getMovieById("movie_001") ?? topMovies[0];

  const genres: GenreSummary[] = getAllGenres()
    .map((name) => ({
      name,
      count: getGenreCount(name),
      posterUrl: getGenrePoster(name),
    }))
    .filter((genre) => genre.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <>
      <HeroCarousel items={heroMovies} />

      <HorizontalScroll
        title="Trending Now"
        subtitle="The films everyone is talking about this week."
        href="/movies"
        linkLabel="All films"
      >
        {trending.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </HorizontalScroll>

      <TopTenList
        title="Top Ten Films"
        subtitle="Ranked by our editorial score and reader response."
        href="/top-rated?type=movie"
        items={topMovies}
        type="movie"
      />

      <TopTenList
        title="Top Ten Series"
        subtitle="The best episodic storytelling, from limited runs to long-form drama."
        href="/top-rated?type=series"
        items={topSeries}
        type="series"
      />

      <FeaturedEditorial movie={featured} />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">Browse by Genre</h2>
              <p className="section-sub">
                Find your next watch by mood, movement, or mode.
              </p>
            </div>
            <Link href="/genres" className="section-link">
              All genres
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <GenreGrid items={genres} limit={8} />
        </div>
      </section>
    </>
  );
}
