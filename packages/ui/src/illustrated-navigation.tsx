import type React from "react";
import { ReleaseIcon } from "./release";

export type IllustratedLinkProps = {
  href: string; title: string; description?: string;
  image: { src: string; width: number; height: number };
  className?: string;
};

/** Image-backed navigation. The label and entire hit area remain real, accessible HTML. */
export function IllustratedLink({ href, title, description, image, className = "" }: IllustratedLinkProps) {
  return <a className={`lgo-illustrated-link ${className}`} href={href}>
    <img {...image} alt="" loading="lazy"/>
    <div className="lgo-illustrated-link-copy"><h3>{title}</h3>{description ? <p>{description}</p> : null}</div>
    <span className="lgo-illustrated-link-arrow" aria-hidden="true"><ReleaseIcon name="arrow"/></span>
  </a>;
}

/** A lead illustration and smaller onward destinations, never a simulated media player. */
export function MediaMosaic({ lead, items, leadAdornment }: { lead: IllustratedLinkProps; items: readonly IllustratedLinkProps[]; leadAdornment?: React.ReactNode }) {
  return <div className="lgo-media-mosaic">
    {leadAdornment ? <div className="lgo-media-mosaic-lead-wrap"><IllustratedLink {...lead} className="lgo-media-mosaic-lead"/>{leadAdornment}</div> : <IllustratedLink {...lead} className="lgo-media-mosaic-lead"/>}
    {items.length ? <div className="lgo-media-mosaic-tiles">{items.map(item => <IllustratedLink {...item} key={item.href}/>)}</div> : null}
  </div>;
}
