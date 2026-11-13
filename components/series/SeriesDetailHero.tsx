import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GenreChip from "@/components/ui/GenreChip";
import RatingBadge from "@/components/ui/RatingBadge";
import type { Series } from "@/types";

export default function SeriesDetailHero({ series }: { series: Series }) {
  return (
    <section className="detail-hero">
      <div className="detail-bg">
        <Image
          src={series.backdropUrl}
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
              src={series.posterUrl}
              alt={`${series.title} poster`}
              fill
              priority
              sizes="250px"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div>
            <div className="chips" style={{ marginBottom: 16 }}>
              {series.genre.map((genre) => (
                <GenreChip key={genre} genre={genre} size="sm" />
              ))}
            </div>

            <h1 className="detail-title">{series.title}</h1>

            <div className="detail-meta">
              <span>{series.year}</span>
              <span className="movie-card-dot" aria-hidden="true" />
              <span>
                {series.seasons} {series.seasons === 1 ? "season" : "seasons"}
              </span>
              <span className="movie-card-dot" aria-hidden="true" />
              <span>{series.episodes} episodes</span>
              <span className="movie-card-dot" aria-hidden="true" />
              <span>{series.language}</span>
              <span
                className={`status-badge ${
                  series.status === "Ongoing" ? "status-ongoing" : "status-ended"
                }`}
              >
                {series.status}
              </span>
            </div>

            <div className="detail-score-row">
              <RatingBadge rating={series.rating} size="lg" variant="violet" />
              <div>
                <div className="detail-score" style={{ color: "#c4b5fd" }}>
                  {series.rating.toFixed(1)}
                  <small> / 10</small>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-dim)" }}>
                  Created by {series.creator} ·{" "}
                  {series.reviewCount.toLocaleString("en-US")} reviews
                </div>
              </div>
            </div>

            <div className="detail-actions">
              <Link
                className="btn btn-violet"
                href={`/genres/${encodeURIComponent(series.genre[0])}`}
              >
                Explore {series.genre[0]}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link className="btn btn-ghost" href="/top-rated?type=series">
                See top series
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
