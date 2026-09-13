import type {
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes
} from "react";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export type FormFieldControlProps = {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  "aria-labelledby"?: string;
};

export function FormField({
  id,
  label,
  help,
  error,
  required = false,
  children,
  className
}: {
  id: string;
  label: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  children: (props: FormFieldControlProps) => ReactNode;
  className?: string;
}) {
  const labelId = `${id}-label`;
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;
  const controlProps: FormFieldControlProps = {
    id,
    "aria-labelledby": labelId,
    ...(describedBy ? { "aria-describedby": describedBy } : {}),
    ...(error ? { "aria-invalid": true } : {})
  };

  return (
    <div className={cx("lgo-form-field", Boolean(error) && "lgo-form-field-error", className)}>
      <label id={labelId} className="lgo-form-label" htmlFor={id}>
        {label}
        {required ? <span className="lgo-form-required" aria-hidden="true"> *</span> : null}
      </label>
      {children(controlProps)}
      {help ? <small id={helpId} className="lgo-form-help">{help}</small> : null}
      {error ? <small id={errorId} className="lgo-form-error">{error}</small> : null}
    </div>
  );
}

export function TextInput({ className, disabled, readOnly, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  const locked = Boolean(disabled);
  return (
    <input
      {...props}
      readOnly={locked ? true : readOnly}
      aria-disabled={locked ? "true" : props["aria-disabled"]}
      data-disabled={locked ? "true" : undefined}
      className={cx("lgo-form-control lgo-text-input", className)}
    />
  );
}

function selectedOptionText(children: ReactNode, value: SelectHTMLAttributes<HTMLSelectElement>["defaultValue"]) {
  const childrenArray = Array.isArray(children) ? children : [children];
  const selected = childrenArray.find((child) => {
    if (!child || typeof child !== "object" || !("props" in child)) return false;
    const props = child.props as { value?: unknown };
    return String(props.value ?? "") === String(value ?? "");
  });
  if (selected && typeof selected === "object" && "props" in selected) {
    const props = selected.props as { children?: ReactNode };
    return props.children;
  }
  return childrenArray[0] && typeof childrenArray[0] === "object" && "props" in childrenArray[0]
    ? (childrenArray[0].props as { children?: ReactNode }).children
    : "Fixture option";
}

export function SelectInput({ className, children, disabled, defaultValue, value, id, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  const locked = Boolean(disabled);
  if (locked) {
    const selectedValue = value ?? defaultValue;
    return (
      <div
        id={id}
        role="combobox"
        aria-disabled="true"
        data-disabled="true"
        aria-readonly="true"
        aria-expanded="false"
        aria-labelledby={props["aria-labelledby"]}
        aria-describedby={props["aria-describedby"]}
        data-value={selectedValue === undefined ? undefined : String(selectedValue)}
        tabIndex={0}
        className={cx("lgo-form-control lgo-select-input lgo-form-control-readout", className)}
      >
        {selectedOptionText(children, selectedValue)}
      </div>
    );
  }
  return (
    <select
      {...props}
      id={id}
      defaultValue={defaultValue}
      value={value}
      className={cx("lgo-form-control lgo-select-input", className)}
    >
      {children}
    </select>
  );
}

export function CheckboxField({
  id,
  label,
  description,
  className,
  disabled,
  checked,
  defaultChecked,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  id: string;
  label: ReactNode;
  description?: ReactNode;
}) {
  const locked = Boolean(disabled);
  const descriptionId = description ? `${id}-description` : undefined;
  const checkedState = Boolean(checked ?? defaultChecked ?? false);
  if (locked) {
    return (
      <div className={cx("lgo-checkbox-field", "lgo-checkbox-field-disabled", className)}>
        <span
          id={id}
          role="checkbox"
          aria-checked={checkedState}
          aria-disabled="true"
          aria-labelledby={`${id}-label`}
          data-disabled="true"
          tabIndex={0}
          {...(descriptionId ? { "aria-describedby": descriptionId } : {})}
          className="lgo-checkbox-readout"
        />
        <span className="lgo-checkbox-copy">
          <strong id={`${id}-label`}>{label}</strong>
          {description ? <small id={descriptionId}>{description}</small> : null}
        </span>
      </div>
    );
  }
  return (
    <label className={cx("lgo-checkbox-field", className)} htmlFor={id}>
      <input
        {...props}
        id={id}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        {...(descriptionId ? { "aria-describedby": descriptionId } : {})}
      />
      <span className="lgo-checkbox-copy">
        <strong>{label}</strong>
        {description ? <small id={descriptionId}>{description}</small> : null}
      </span>
    </label>
  );
}

export function FormActions({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("lgo-form-actions", className)} />;
}

export function InlineFeedback({
  tone = "info",
  title,
  children,
  className
}: {
  tone?: "info" | "success" | "warning" | "error";
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx("lgo-inline-feedback", `lgo-inline-feedback-${tone}`, className)}
      role={tone === "error" ? "alert" : "status"}
    >
      <strong>{title}</strong>
      {children ? <div>{children}</div> : null}
    </div>
  );
}
