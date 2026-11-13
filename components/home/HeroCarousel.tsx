"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import GenreChip from "@/components/ui/GenreChip";
import type { Movie } from "@/types";

export default function HeroCarousel({ items }: { items: Movie[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setIndex((current) => (current - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(next, 7000);
    return () => window.clearInterval(id);
  }, [paused, count, next]);

  if (count === 0) return null;

  return (
    <section
      className="hero"
      aria-label="Featured films"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {items.map((movie, slideIndex) => {
        const active = slideIndex === index;
        return (
          <div
            key={movie._id}
            className={`hero-slide ${active ? "active" : ""}`}
            aria-hidden={!active}
            inert={!active}
          >
            <div className="hero-media">
              <Image
                src={movie.backdropUrl}
                alt=""
                fill
                priority={slideIndex === 0}
                loading={slideIndex === 0 ? "eager" : "lazy"}
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center 20%" }}
              />
            </div>
            <div className="hero-shade" />
            <div className="hero-shade-bottom" />

            <div className="container hero-inner">
              <div className="hero-content">
                <p className="hero-kicker">
                  <Star size={14} fill="currentColor" aria-hidden="true" />
                  Featured film
                </p>
                <h1 className="hero-title">{movie.title}</h1>
                <div className="hero-meta">
                  <span>{movie.year}</span>
                  <span className="movie-card-dot" aria-hidden="true" />
                  <span>{movie.director}</span>
                  <span className="movie-card-dot" aria-hidden="true" />
                  <span>{movie.runtime} min</span>
                  <span className="movie-card-dot" aria-hidden="true" />
                  <span>{movie.language}</span>
                </div>
                <div className="chips" style={{ marginBottom: 20 }}>
                  {movie.genre.slice(0, 3).map((genre) => (
                    <GenreChip key={genre} genre={genre} size="sm" />
                  ))}
                </div>
                <p className="hero-desc">{movie.description}</p>
                <div className="hero-actions">
                  <a
                    className="btn btn-gold"
                    href={movie.trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Play size={17} fill="currentColor" aria-hidden="true" />
                    Watch Trailer
                  </a>
                  <Link className="btn btn-ghost" href={`/movies/${movie._id}`}>
                    More Info
                  </Link>
                  <span className="hero-rating">
                    <Star size={14} fill="currentColor" aria-hidden="true" />
                    <strong>{movie.rating.toFixed(1)}</strong>
                    / 10
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {count > 1 ? (
        <>
          <div className="hero-arrows">
            <button
              type="button"
              className="hero-arrow"
              aria-label="Previous featured film"
              onClick={prev}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hero-arrow"
              aria-label="Next featured film"
              onClick={next}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>

          <div className="hero-dots">
            {items.map((movie, dotIndex) => (
              <button
                key={movie._id}
                type="button"
                className={`hero-dot ${dotIndex === index ? "active" : ""}`}
                aria-label={`Show ${movie.title}`}
                aria-current={dotIndex === index}
                onClick={() => setIndex(dotIndex)}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
