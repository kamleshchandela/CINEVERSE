import Image from "next/image";

type PageHeroProps = {
  kicker: string;
  title: string;
  subtitle: string;
  image?: string;
};

export default function PageHero({
  kicker,
  title,
  subtitle,
  image,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      {image ? (
        <div className="page-hero-bg">
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : null}
      <div className="container page-hero-content">
        <p className="page-kicker">{kicker}</p>
        <h1 className="page-title">{title}</h1>
        <p className="page-sub">{subtitle}</p>
      </div>
    </section>
  );
}
