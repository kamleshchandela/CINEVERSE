type RatingBadgeProps = {
  rating: number;
  size?: "sm" | "md" | "lg";
  variant?: "gold" | "violet";
};

export default function RatingBadge({
  rating,
  size = "sm",
  variant = "gold",
}: RatingBadgeProps) {
  return (
    <span
      className={`rating-badge ${size} ${variant === "violet" ? "violet" : ""}`}
      aria-label={`Rated ${rating.toFixed(1)} out of 10`}
    >
      {rating.toFixed(1)}
    </span>
  );
}
