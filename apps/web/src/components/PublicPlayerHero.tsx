import type { ReactNode } from "react";
import { ExperienceHero, type ExperienceHeroAction, type Tone } from "@lgo-web/ui";

export type PublicHeroAction = ExperienceHeroAction;

type PublicPlayerHeroProps = {
  badge: string;
  badgeTone?: Tone;
  kicker: string;
  title: string;
  lead: ReactNode;
  actions?: PublicHeroAction[];
  className: string;
  copyClassName?: string;
  detail?: ReactNode;
  visual?: ReactNode;
};

export function PublicPlayerHero(props: PublicPlayerHeroProps) {
  return <ExperienceHero {...props} className={`${props.className} lgo-public-player-hero`} />;
}
