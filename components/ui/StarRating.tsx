import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  size?: number;
  max?: number;
};

export default function StarRating({
  rating,
  size = 14,
  max = 5,
}: StarRatingProps) {
  const clamped = Math.max(0, Math.min(max, rating));

  return (
    <span
      className="stars"
      role="img"
      aria-label={`${clamped.toFixed(1)} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, index) => {
        const fill = Math.max(0, Math.min(1, clamped - index));
        return (
          <span
            key={index}
            className="star-wrap"
            style={{ width: size, height: size }}
          >
            <Star
              size={size}
              strokeWidth={1.5}
              className="star-empty"
              aria-hidden="true"
            />
            {fill > 0 ? (
              <span className="star-fill" style={{ width: `${fill * 100}%` }}>
                <Star
                  size={size}
                  strokeWidth={1.5}
                  fill="currentColor"
                  aria-hidden="true"
                />
              </span>
            ) : null}
          </span>
        );
      })}
    </span>
  );
}
