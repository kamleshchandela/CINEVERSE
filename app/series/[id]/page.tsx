import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Tv } from "lucide-react";
import SeriesDetailHero from "@/components/series/SeriesDetailHero";
import CastGrid from "@/components/movie/CastGrid";
import ReviewsList from "@/components/movie/ReviewsList";
import {
  getAllSeries,
  getReviewsForContent,
  getSeriesById,
} from "@/lib/data";

type SeriesPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getAllSeries().map((series) => ({ id: series._id }));
}

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { id } = await params;
  const series = getSeriesById(id);

  if (!series) {
    return { title: "Series not found" };
  }

  return {
    title: series.title,
    description: series.description,
    openGraph: {
      title: series.title,
      description: series.description,
      images: [
        {
          url: new URL(
            series.backdropUrl,
            process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
          ).toString(),
        },
      ],
    },
  };
}

export default async function SeriesDetailPage({ params }: SeriesPageProps) {
  const { id } = await params;
  const series = getSeriesById(id);

  if (!series) {
    notFound();
  }

  const reviews = getReviewsForContent(series._id);

  return (
    <>
      <SeriesDetailHero series={series} />

      <div className="container detail-body">
        <div className="detail-layout">
          <div>
            <section className="detail-section">
              <h2 className="detail-heading">Synopsis</h2>
              <p className="detail-text">{series.longDescription}</p>
            </section>

            <section className="detail-section">
              <h2 className="detail-heading">Cast</h2>
              <CastGrid cast={series.cast} />
            </section>

            <section className="detail-section" id="reviews">
              <div className="section-head">
                <div>
                  <h2 className="detail-heading" style={{ marginBottom: 0 }}>
                    Reviews
                  </h2>
                  <p className="section-sub">
                    {reviews.length} {reviews.length === 1 ? "review" : "reviews"}{" "}
                    · average {series.rating.toFixed(1)} / 10
                  </p>
                </div>
              </div>

              <div className="write-review" style={{ marginBottom: 18 }}>
                <span>Have a take on {series.title}?</span>
                <button type="button" className="btn btn-ghost btn-sm">
                  Write a review
                </button>
              </div>

              <ReviewsList reviews={reviews} />
            </section>
          </div>

          <aside>
            <div className="info-panel">
              <div className="info-row">
                <span className="info-label">Creator</span>
                <span className="info-value">{series.creator}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Premiered</span>
                <span className="info-value">{series.year}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Seasons</span>
                <span className="info-value">{series.seasons}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Episodes</span>
                <span className="info-value">{series.episodes}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Language</span>
                <span className="info-value">{series.language}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Status</span>
                <span
                  className={`status-badge ${
                    series.status === "Ongoing" ? "status-ongoing" : "status-ended"
                  }`}
                >
                  {series.status}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Genres</span>
                <span className="info-value">{series.genre.join(", ")}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Rating</span>
                <span className="info-value">{series.rating.toFixed(1)} / 10</span>
              </div>
              <div className="info-row">
                <span className="info-label">Reviews</span>
                <span className="info-value">
                  {series.reviewCount.toLocaleString("en-US")}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Top ten</span>
                <span className="info-value">#{series.topTenRank}</span>
              </div>

              <div style={{ marginTop: 18 }}>
                <span className="info-label">Where to watch</span>
                <div className="stream-list">
                  {series.streamingOn.map((service) => (
                    <span key={service} className="stream-pill">
                      <Tv size={13} aria-hidden="true" />
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
