import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import RatingBadge from "@/components/ui/RatingBadge";
import type { Series } from "@/types";

type SeriesCardProps = {
  series: Series;
  priority?: boolean;
};

export default function SeriesCard({ series, priority = false }: SeriesCardProps) {
  return (
    <Link href={`/series/${series._id}`} className="movie-card">
      <div className="movie-card-poster">
        <Image
          src={series.posterUrl}
          alt={`${series.title} poster`}
          fill
          priority={priority}
          sizes="(max-width: 760px) 45vw, (max-width: 1200px) 22vw, 200px"
          style={{ objectFit: "cover" }}
        />
        <div className="movie-card-badge">
          <RatingBadge rating={series.rating} variant="violet" />
        </div>
        <div className="movie-card-overlay">
          <span className="movie-card-play">
            <Play size={20} fill="currentColor" aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="movie-card-body">
        <h3 className="movie-card-title">{series.title}</h3>
        <p className="movie-card-meta">
          <span>{series.year}</span>
          <span className="movie-card-dot" aria-hidden="true" />
          <span>{series.genre[0]}</span>
          <span className="movie-card-dot" aria-hidden="true" />
          <span>
            {series.seasons} {series.seasons === 1 ? "season" : "seasons"}
          </span>
        </p>
      </div>
    </Link>
  );
}
