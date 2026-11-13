import { NextResponse, type NextRequest } from "next/server";
import { getAllSeries } from "@/lib/data";

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");
  const status = searchParams.get("status");
  const topTen = searchParams.get("topTen");
  const sort = searchParams.get("sort") ?? "rating";

  let series = getAllSeries();

  if (genre) {
    const needle = genre.toLowerCase();
    series = series.filter((item) =>
      item.genre.some((entry) => entry.toLowerCase() === needle),
    );
  }

  if (status) {
    const needle = status.toLowerCase();
    series = series.filter((item) => item.status.toLowerCase() === needle);
  }

  if (topTen === "true") {
    series = series.filter((item) => item.isTopTen);
  }

  series = [...series].sort((a, b) => {
    if (sort === "year") return b.year - a.year;
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "episodes") return b.episodes - a.episodes;
    return b.rating - a.rating;
  });

  return NextResponse.json({ count: series.length, series });
}
