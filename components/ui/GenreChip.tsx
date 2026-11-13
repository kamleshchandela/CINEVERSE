import Link from "next/link";

type GenreChipProps = {
  genre: string;
  size?: "sm" | "md";
  gold?: boolean;
  link?: boolean;
};

export default function GenreChip({
  genre,
  size = "md",
  gold = false,
  link = true,
}: GenreChipProps) {
  const className = ["genre-chip", size === "sm" ? "sm" : "", gold ? "gold" : ""]
    .filter(Boolean)
    .join(" ");

  if (!link) {
    return <span className={className}>{genre}</span>;
  }

  return (
    <Link href={`/genres/${encodeURIComponent(genre)}`} className={className}>
      {genre}
    </Link>
  );
}
