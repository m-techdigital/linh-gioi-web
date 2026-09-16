"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Decorative brand art with an accessible label and live fallback before load/on error. */
export function ArtWordmark({ src, width, height, label, fallback }: {
  src: string; width: number; height: number; label: string; fallback: ReactNode;
}) {
  const image = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const node = image.current;
    setLoaded(Boolean(node?.complete && node.naturalWidth > 0));
  }, [src]);
  return <span className="lgo-art-wordmark" style={{ aspectRatio: `${width} / ${height}` }} data-fallback={loaded ? "false" : "true"}>
    <span className="lgo-art-wordmark-label">{label}</span>
    <span className="lgo-art-wordmark-fallback" aria-hidden="true">{fallback}</span>
    <img ref={image} src={src} width={width} height={height} alt="" aria-hidden="true" fetchPriority="high"
      onLoad={() => setLoaded(true)} onError={() => setLoaded(false)}/>
  </span>;
}
