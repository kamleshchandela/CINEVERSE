import { NextResponse, type NextRequest } from "next/server";
import { getReviewsForContent } from "@/lib/data";
import reviewsData from "@/data/reviews.json";
import type { Review } from "@/types";

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const contentId = searchParams.get("contentId");
  const contentType = searchParams.get("contentType");
  const limitParam = Number(searchParams.get("limit"));
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : null;

  let reviews: Review[] = contentId
    ? getReviewsForContent(contentId)
    : [...(reviewsData as Review[])].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

  if (contentType === "movie" || contentType === "series") {
    reviews = reviews.filter((review) => review.contentType === contentType);
  }

  if (limit) {
    reviews = reviews.slice(0, limit);
  }

  return NextResponse.json({ count: reviews.length, reviews });
}
