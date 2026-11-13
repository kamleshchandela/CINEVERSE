"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

type HorizontalScrollProps = {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  children: React.ReactNode;
};

export default function HorizontalScroll({
  title,
  subtitle,
  href,
  linkLabel = "View all",
  children,
}: HorizontalScrollProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const moved = useRef(false);
  const [dragging, setDragging] = useState(false);

  const scrollBy = (direction: 1 | -1) => {
    viewportRef.current?.scrollBy({
      left: direction * 520,
      behavior: "smooth",
    });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    setDragging(true);
    moved.current = false;
    startX.current = event.pageX;
    startScroll.current = viewport.scrollLeft;
    viewport.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const delta = event.pageX - startX.current;
    if (Math.abs(delta) > 5) moved.current = true;
    viewport.scrollLeft = startScroll.current - delta;
  };

  const endDrag = () => setDragging(false);

  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!moved.current) return;
    event.preventDefault();
    event.stopPropagation();
    moved.current = false;
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 className="section-title">{title}</h2>
            {subtitle ? <p className="section-sub">{subtitle}</p> : null}
          </div>
          {href ? (
            <Link href={href} className="section-link">
              {linkLabel}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        <div className={`hscroll ${dragging ? "is-dragging" : ""}`}>
          <button
            type="button"
            className="hscroll-arrow left"
            aria-label={`Scroll ${title} left`}
            onClick={() => scrollBy(-1)}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          <div
            ref={viewportRef}
            className="hscroll-viewport"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
            onDragStart={(event) => event.preventDefault()}
          >
            <div className="hscroll-track">{children}</div>
          </div>

          <button
            type="button"
            className="hscroll-arrow right"
            aria-label={`Scroll ${title} right`}
            onClick={() => scrollBy(1)}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
