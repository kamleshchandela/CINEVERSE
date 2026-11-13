"use client";

import { useMemo, useState } from "react";
import SeriesCard from "@/components/series/SeriesCard";
import type { Series } from "@/types";

type StatusFilter = "All" | Series["status"];
type SortKey = "rating" | "year" | "title";

const sortLabels: Record<SortKey, string> = {
  rating: "Highest rated",
  year: "Newest first",
  title: "Title A–Z",
};

export default function FilterableSeriesGrid({ series }: { series: Series[] }) {
  const [genre, setGenre] = useState("All");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [sort, setSort] = useState<SortKey>("rating");

  const genres = useMemo(
    () => ["All", ...new Set(series.flatMap((item) => item.genre))].sort(
      (a, b) => (a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)),
    ),
    [series],
  );

  const filtered = useMemo(() => {
    const list = series.filter((item) => {
      const matchesGenre = genre === "All" || item.genre.includes(genre);
      const matchesStatus = status === "All" || item.status === status;
      return matchesGenre && matchesStatus;
    });

    return [...list].sort((a, b) => {
      if (sort === "year") return b.year - a.year;
      if (sort === "title") return a.title.localeCompare(b.title);
      return b.rating - a.rating;
    });
  }, [series, genre, status, sort]);

  const reset = () => {
    setGenre("All");
    setStatus("All");
    setSort("rating");
  };

  return (
    <div>
      <div className="filter-bar">
        <div className="filter-chips">
          {genres.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip ${genre === item ? "active" : ""}`}
              aria-pressed={genre === item}
              onClick={() => setGenre(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="filter-controls">
          <select
            className="select"
            value={status}
            onChange={(event) => setStatus(event.target.value as StatusFilter)}
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Ended">Ended</option>
          </select>
          <select
            className="select"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            aria-label="Sort series"
          >
            <option value="rating">Highest rated</option>
            <option value="year">Newest first</option>
            <option value="title">Title A–Z</option>
          </select>
        </div>
      </div>

      <div className="results-meta">
        <span>
          {filtered.length} {filtered.length === 1 ? "series" : "series"}
        </span>
        <span>Sorted by {sortLabels[sort].toLowerCase()}</span>
      </div>

      {filtered.length > 0 ? (
        <div className="cards-grid">
          {filtered.map((item) => (
            <SeriesCard key={item._id} series={item} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-title">Nothing in this frame</div>
          <p className="empty-text">
            No series match those filters. Try another genre or status.
          </p>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            style={{ marginTop: 18 }}
            onClick={reset}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
