"use client";

import { useEffect, useState } from "react";

export type WorkspaceShellNavItem = {
  href: string;
  label: string;
  badge?: string;
};

function normalisePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function isCurrentRoute(currentPath: string, href: string): boolean {
  const current = normalisePath(currentPath);
  const target = normalisePath(href);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

export function WorkspaceNavigation({ items, ariaLabel = "Workspace navigation" }: { items: WorkspaceShellNavItem[]; ariaLabel?: string }) {
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

  return (
    <nav className="lgo-workspace-nav" aria-label={ariaLabel}>
      {items.map((item) => {
        const current = currentPath ? isCurrentRoute(currentPath, item.href) : false;
        return (
          <a
            href={item.href}
            key={`${item.href}:${item.label}`}
            aria-current={current ? "page" : undefined}
            data-current={current ? "page" : undefined}
          >
            <span>{item.label}</span>
            {item.badge ? <small>{item.badge}</small> : null}
          </a>
        );
      })}
    </nav>
  );
}
