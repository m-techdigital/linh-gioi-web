import { LinkButton } from "./primitives";
import { ReleaseIcon } from "./release";

/** Editorial article cover with a real destination, not a game launch or enrollment. */
export function FeaturedReading({ title, description, href, image, actionLabel = "Mở bài hướng dẫn" }: {
  title: string; description: string; href: string; actionLabel?: string;
  image: { src: string; width: number; height: number; alt: string };
}) {
  return <article className="lgo-library-featured lgo-release-frame">
    <div className="lgo-library-featured-art"><img {...image}/><span>Tranh minh họa · Không phải gameplay live</span></div>
    <div className="lgo-library-featured-copy">
      <span className="lgo-library-featured-kicker"><ReleaseIcon name="document"/> BÀI ĐỌC KHỞI ĐẦU</span>
      <h2>{title}</h2><details className="lgo-catalog-summary"><summary>Tóm tắt bài viết <span aria-hidden="true">+</span></summary><p>{description}</p></details><LinkButton href={href} tone="gold">{`${actionLabel} `}<ReleaseIcon name="arrow"/></LinkButton>
    </div>
  </article>;
}
