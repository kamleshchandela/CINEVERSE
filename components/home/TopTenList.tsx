import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GenreChip from "@/components/ui/GenreChip";
import type { Movie, Series } from "@/types";

type TopTenListProps = {
  title: string;
  subtitle?: string;
  href: string;
  items: (Movie | Series)[];
  type: "movie" | "series";
};

export default function TopTenList({
  title,
  subtitle,
  href,
  items,
  type,
}: TopTenListProps) {
  return (
    <section className={`section ${type === "series" ? "topten-violet" : ""}`}>
      <div className="container">
        <div className="section-head">
          <div>
            <h2 className="section-title">{title}</h2>
            {subtitle ? <p className="section-sub">{subtitle}</p> : null}
          </div>
          <Link href={href} className="section-link">
            See full ranking
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="topten">
          {items.map((item, index) => {
            const isSeries = "seasons" in item;
            return (
              <Link
                key={item._id}
                href={`/${type === "movie" ? "movies" : "series"}/${item._id}`}
                className="topten-row"
              >
                <div className="topten-rank">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="topten-poster">
                  <Image
                    src={item.posterUrl}
                    alt={`${item.title} poster`}
                    fill
                    sizes="72px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="topten-info">
                  <div className="topten-title">{item.title}</div>
                  <div className="topten-meta">
                    {isSeries
                      ? `${item.creator} · ${item.seasons} ${
                          item.seasons === 1 ? "season" : "seasons"
                        } · ${item.status}`
                      : `${item.director} · ${item.runtime} min · ${item.year}`}
                  </div>
                  <div className="topten-chips">
                    {item.genre.slice(0, 2).map((genre) => (
                      <GenreChip key={genre} genre={genre} size="sm" link={false} />
                    ))}
                  </div>
                </div>

                <div className="topten-right">
                  <div className="topten-score">{item.rating.toFixed(1)}</div>
                  <div className="topten-score-label">
                    {item.reviewCount.toLocaleString("en-US")} reviews
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
