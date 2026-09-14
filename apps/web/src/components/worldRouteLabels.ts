const worldRouteKindLabels: Record<string, string> = {
  hub: "Trung tâm",
  gate: "Cổng thành",
  field: "Linh lâm",
  ruins: "Di tích",
  realm: "Âm giới"
};

export function getWorldRouteKindLabel(kind: string) {
  return worldRouteKindLabels[kind] ?? kind;
}
