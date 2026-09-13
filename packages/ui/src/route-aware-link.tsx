"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useEffect, useState } from "react";

export type RouteAwareLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  currentWhen?: "exact" | "section";
  children: ReactNode;
};

function normalisePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function isCurrentRoute(currentPath: string, href: string, currentWhen: "exact" | "section"): boolean {
  const current = normalisePath(currentPath);
  const target = normalisePath(href);
  if (currentWhen === "exact" || target === "/") return current === target;
  return current === target || current.startsWith(`${target}/`);
}

export function RouteAwareLink({ href, currentWhen = "exact", children, ...props }: RouteAwareLinkProps) {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    const syncPath = () => setCurrentPath(window.location.pathname);
    syncPath();
    window.addEventListener("popstate", syncPath);
    window.addEventListener("hashchange", syncPath);
    return () => {
      window.removeEventListener("popstate", syncPath);
      window.removeEventListener("hashchange", syncPath);
    };
  }, []);

  const current = currentPath ? isCurrentRoute(currentPath, href, currentWhen) : false;

  return (
    <a
      {...props}
      href={href}
      aria-current={current ? "page" : props["aria-current"]}
      data-current={current ? "page" : undefined}
    >
      {children}
    </a>
  );
}
