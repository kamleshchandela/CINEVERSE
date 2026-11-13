import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import type { Movie } from "@/types";

export default function FeaturedEditorial({ movie }: { movie: Movie }) {
  return (
    <section className="section">
      <div className="container">
        <div className="featured">
          <div className="featured-media">
            <Image
              src={movie.posterUrl}
              alt={`${movie.title} poster`}
              fill
              sizes="(max-width: 1100px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="featured-body">
            <p className="featured-kicker">Editor&apos;s Pick</p>
            <h2 className="featured-title">{movie.title}</h2>
            <p className="featured-text">{movie.longDescription}</p>

            <div className="featured-cast">
              {movie.cast.slice(0, 3).map((member) => (
                <div key={member.actorId} className="featured-cast-item">
                  <span className="featured-avatar">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      sizes="40px"
                      style={{ objectFit: "cover" }}
                    />
                  </span>
                  <span>
                    <span className="featured-cast-name">{member.name}</span>
                    <span className="featured-cast-role" style={{ display: "block" }}>
                      {member.role}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <div className="hero-actions">
              <Link
                href={`/movies/${movie._id}#reviews`}
                className="btn btn-gold"
              >
                Read the review
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a
                href={movie.trailerUrl}
                className="btn btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play size={16} fill="currentColor" aria-hidden="true" />
                Watch trailer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
