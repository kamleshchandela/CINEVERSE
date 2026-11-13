import { NextResponse, type NextRequest } from "next/server";
import { getAllMovies } from "@/lib/data";

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");
  const year = searchParams.get("year");
  const topTen = searchParams.get("topTen");
  const sort = searchParams.get("sort") ?? "rating";

  let movies = getAllMovies();

  if (genre) {
    const needle = genre.toLowerCase();
    movies = movies.filter((movie) =>
      movie.genre.some((item) => item.toLowerCase() === needle),
    );
  }

  if (year) {
    const parsed = Number(year);
    if (Number.isFinite(parsed)) {
      movies = movies.filter((movie) => movie.year === parsed);
    }
  }

  if (topTen === "true") {
    movies = movies.filter((movie) => movie.isTopTen);
  }

  movies = [...movies].sort((a, b) => {
    if (sort === "year") return b.year - a.year;
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "runtime") return b.runtime - a.runtime;
    return b.rating - a.rating;
  });

  return NextResponse.json({ count: movies.length, movies });
}
