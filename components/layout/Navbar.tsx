"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Clapperboard, Film, Menu, Search, Tv, X } from "lucide-react";
import type { SearchItem } from "@/types";

const links = [
  { href: "/movies", label: "Movies" },
  { href: "/series", label: "Series" },
  { href: "/genres", label: "Genres" },
  { href: "/top-rated", label: "Top Rated" },
];

export default function Navbar({ items }: { items: SearchItem[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenus = () => {
    setSearchOpen(false);
    setMobileOpen(false);
    setQuery("");
  };

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? items
        .filter((item) => item.title.toLowerCase().includes(trimmed))
        .slice(0, 6)
    : [];

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    const first = results[0];
    if (first) {
      router.push(`/${first.type === "movie" ? "movies" : "series"}/${first.id}`);
    } else {
      router.push(`/movies?q=${encodeURIComponent(value)}`);
    }
    closeSearch();
  };

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link
          href="/"
          className="nav-logo"
          aria-label="Cineverse home"
          onClick={closeMenus}
        >
          <Clapperboard size={22} strokeWidth={1.6} aria-hidden="true" />
          CINEVERSE
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive(link.href) ? "active" : ""}`}
              onClick={closeMenus}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label={searchOpen ? "Close search" : "Search Cineverse"}
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((open) => !open);
              setMobileOpen(false);
            }}
          >
            {searchOpen ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Search size={18} aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            className="btn btn-ghost btn-sm nav-signin"
            title="Sign in to Cineverse"
          >
            Sign In
          </button>

          <button
            type="button"
            className="icon-btn mobile-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((open) => !open);
              setSearchOpen(false);
            }}
          >
            {mobileOpen ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Menu size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div className="search-panel">
          <div className="container">
            <form className="search-field" onSubmit={onSubmit}>
              <Search size={20} aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search films and series"
                aria-label="Search films and series"
              />
              <button
                type="button"
                className="icon-btn"
                aria-label="Close search"
                onClick={closeSearch}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </form>

            {trimmed ? (
              results.length > 0 ? (
                <div className="search-results">
                  {results.map((item) => (
                    <Link
                      key={`${item.type}-${item.id}`}
                      href={`/${item.type === "movie" ? "movies" : "series"}/${item.id}`}
                      className="search-result"
                      onClick={closeSearch}
                    >
                      {item.type === "movie" ? (
                        <Film size={16} aria-hidden="true" />
                      ) : (
                        <Tv size={16} aria-hidden="true" />
                      )}
                      <span className="search-result-title">{item.title}</span>
                      <span className="search-result-year">{item.year}</span>
                      <span className="search-result-type">
                        {item.type === "movie" ? "Film" : "Series"}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="search-empty">
                  Nothing matched “{query.trim()}”. Try another title.
                </p>
              )
            ) : (
              <p className="search-hint">
                Search across {items.length} films and series in the collection.
              </p>
            )}
          </div>
        </div>
      ) : null}

      {mobileOpen ? (
        <nav className="mobile-menu" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-link ${isActive(link.href) ? "active" : ""}`}
              onClick={closeMenus}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/" className="mobile-link" onClick={closeMenus}>
            Home
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
