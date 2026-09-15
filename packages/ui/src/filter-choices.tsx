import { SpiritButton } from "./primitives";

/** Stateless presentation filters; selection never changes source status or grants access. */
export function FilterChoices<Value extends string>({ options, value, onChange, label, controlsId, className }: {
  options: readonly { value: Value; label: string }[];
  value: Value;
  onChange: (value: Value) => void;
  label: string;
  controlsId: string;
  className?: string;
}) {
  return <div className={className} role="group" aria-label={label}>
    {options.map(option => <SpiritButton key={option.value} type="button" tone="neutral"
      aria-controls={controlsId} aria-pressed={value === option.value}
      onClick={() => onChange(option.value)}>{option.label}</SpiritButton>)}
  </div>;
}
