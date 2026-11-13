import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import GenreChip from "@/components/ui/GenreChip";
import RatingBadge from "@/components/ui/RatingBadge";
import type { Movie } from "@/types";

export default function MovieDetailHero({ movie }: { movie: Movie }) {
  return (
    <section className="detail-hero">
      <div className="detail-bg">
        <Image
          src={movie.backdropUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="detail-shade" />

      <div className="container detail-inner">
        <div className="detail-grid">
          <div className="detail-poster">
            <Image
              src={movie.posterUrl}
              alt={`${movie.title} poster`}
              fill
              priority
              sizes="250px"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div>
            <div className="chips" style={{ marginBottom: 16 }}>
              {movie.genre.map((genre) => (
                <GenreChip key={genre} genre={genre} size="sm" />
              ))}
            </div>

            <h1 className="detail-title">{movie.title}</h1>

            <div className="detail-meta">
              <span>{movie.year}</span>
              <span className="movie-card-dot" aria-hidden="true" />
              <span>{movie.runtime} min</span>
              <span className="movie-card-dot" aria-hidden="true" />
              <span>{movie.language}</span>
              <span className="movie-card-dot" aria-hidden="true" />
              <span>Directed by {movie.director}</span>
            </div>

            <div className="detail-score-row">
              <RatingBadge rating={movie.rating} size="lg" />
              <div>
                <div className="detail-score">
                  {movie.rating.toFixed(1)}
                  <small> / 10</small>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-dim)" }}>
                  {movie.reviewCount.toLocaleString("en-US")} reader reviews
                </div>
              </div>
            </div>

            <div className="detail-actions">
              <a
                className="btn btn-gold"
                href={movie.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play size={17} fill="currentColor" aria-hidden="true" />
                Watch Trailer
              </a>
              <Link
                className="btn btn-ghost"
                href={`/genres/${encodeURIComponent(movie.genre[0])}`}
              >
                More {movie.genre[0]}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
