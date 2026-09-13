"use client";

import { RouteAwareLink } from "./route-aware-link";

export type WorkspaceShellNavItem = {
  href: string;
  label: string;
  badge?: string;
};

export function WorkspaceNavigation({ items, ariaLabel = "Workspace navigation" }: { items: WorkspaceShellNavItem[]; ariaLabel?: string }) {
  return (
    <nav className="lgo-workspace-nav" aria-label={ariaLabel}>
      {items.map((item) => (
        <RouteAwareLink href={item.href} currentWhen="section" key={`${item.href}:${item.label}`}>
          <span>{item.label}</span>
          {item.badge ? <small>{item.badge}</small> : null}
        </RouteAwareLink>
      ))}
    </nav>
  );
}
