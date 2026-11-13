import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type GenreSummary = {
  name: string;
  count: number;
  posterUrl: string;
};

type GenreGridProps = {
  items: GenreSummary[];
  limit?: number;
};

export default function GenreGrid({ items, limit }: GenreGridProps) {
  const visible = typeof limit === "number" ? items.slice(0, limit) : items;

  return (
    <div className="genre-grid">
      {visible.map((genre) => (
        <Link
          key={genre.name}
          href={`/genres/${encodeURIComponent(genre.name)}`}
          className="genre-card"
        >
          {genre.posterUrl ? (
            <Image
              src={genre.posterUrl}
              alt=""
              fill
              sizes="(max-width: 760px) 50vw, 240px"
              style={{ objectFit: "cover" }}
            />
          ) : null}
          <span className="genre-overlay">
            <span className="genre-name">{genre.name}</span>
            <span className="genre-count">
              {genre.count} {genre.count === 1 ? "title" : "titles"}
            </span>
          </span>
          <span className="genre-arrow">
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}
