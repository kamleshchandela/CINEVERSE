"use client";

import { useState } from "react";
import Image from "next/image";
import { ThumbsUp } from "lucide-react";
import StarRating from "@/components/ui/StarRating";
import type { Review } from "@/types";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function ReviewsList({ reviews }: { reviews: Review[] }) {
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  if (reviews.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-title">No reviews yet</div>
        <p className="empty-text">Be the first to share your take.</p>
      </div>
    );
  }

  return (
    <div className="reviews">
      {reviews.map((review) => {
        const isLiked = Boolean(liked[review._id]);
        return (
          <article key={review._id} className="review-card">
            <div className="review-head">
              <div className="review-avatar">
                <Image
                  src={review.avatarUrl}
                  alt={review.author}
                  fill
                  sizes="42px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <div className="review-author">{review.author}</div>
                <div className="review-date">{formatDate(review.date)}</div>
              </div>
              <div className="review-stars">
                <StarRating rating={review.rating / 2} size={15} />
              </div>
            </div>

            <h3 className="review-title">{review.title}</h3>
            <p className="review-body">{review.body}</p>

            <div className="review-foot">
              <button
                type="button"
                className="review-like"
                aria-pressed={isLiked}
                onClick={() =>
                  setLiked((prev) => ({
                    ...prev,
                    [review._id]: !prev[review._id],
                  }))
                }
              >
                <ThumbsUp
                  size={14}
                  fill={isLiked ? "currentColor" : "none"}
                  aria-hidden="true"
                />
                {review.likes + (isLiked ? 1 : 0)} found this helpful
              </button>
              <span>Verified reader</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
