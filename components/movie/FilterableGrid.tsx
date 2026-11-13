"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import MovieCard from "@/components/movie/MovieCard";
import type { Movie } from "@/types";

type SortKey = "rating" | "year" | "title";

const sortLabels: Record<SortKey, string> = {
  rating: "Highest rated",
  year: "Newest first",
  title: "Title A–Z",
};

export default function FilterableGrid({
  movies,
  initialQuery = "",
}: {
  movies: Movie[];
  initialQuery?: string;
}) {
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState<SortKey>("rating");
  const [query, setQuery] = useState(initialQuery);

  const genres = useMemo(
    () => ["All", ...new Set(movies.flatMap((movie) => movie.genre))].sort(
      (a, b) => (a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)),
    ),
    [movies],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = movies.filter((movie) => {
      const matchesGenre = genre === "All" || movie.genre.includes(genre);
      const matchesQuery =
        !needle ||
        movie.title.toLowerCase().includes(needle) ||
        movie.director.toLowerCase().includes(needle) ||
        movie.genre.some((item) => item.toLowerCase().includes(needle));
      return matchesGenre && matchesQuery;
    });

    return [...list].sort((a, b) => {
      if (sort === "year") return b.year - a.year;
      if (sort === "title") return a.title.localeCompare(b.title);
      return b.rating - a.rating;
    });
  }, [movies, genre, sort, query]);

  const reset = () => {
    setGenre("All");
    setQuery("");
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
          <label className="search-box">
            <Search size={15} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search films"
              aria-label="Search films"
            />
          </label>
          <select
            className="select"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            aria-label="Sort films"
          >
            <option value="rating">Highest rated</option>
            <option value="year">Newest first</option>
            <option value="title">Title A–Z</option>
          </select>
        </div>
      </div>

      <div className="results-meta">
        <span>
          {filtered.length} {filtered.length === 1 ? "film" : "films"}
        </span>
        <span>Sorted by {sortLabels[sort].toLowerCase()}</span>
      </div>

      {filtered.length > 0 ? (
        <div className="cards-grid">
          {filtered.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-title">Nothing in this frame</div>
          <p className="empty-text">
            No films match those filters. Try a different genre or title.
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
