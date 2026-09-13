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
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;
  const controlProps: FormFieldControlProps = {
    id,
    ...(describedBy ? { "aria-describedby": describedBy } : {}),
    ...(error ? { "aria-invalid": true } : {})
  };

  return (
    <div className={cx("lgo-form-field", Boolean(error) && "lgo-form-field-error", className)}>
      <label className="lgo-form-label" htmlFor={id}>
        {label}
        {required ? <span className="lgo-form-required" aria-hidden="true"> *</span> : null}
      </label>
      {children(controlProps)}
      {help ? <small id={helpId} className="lgo-form-help">{help}</small> : null}
      {error ? <small id={errorId} className="lgo-form-error">{error}</small> : null}
    </div>
  );
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cx("lgo-form-control lgo-text-input", className)} />;
}

export function SelectInput({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cx("lgo-form-control lgo-select-input", className)}>
      {children}
    </select>
  );
}

export function CheckboxField({
  id,
  label,
  description,
  className,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  id: string;
  label: ReactNode;
  description?: ReactNode;
}) {
  const descriptionId = description ? `${id}-description` : undefined;
  return (
    <label className={cx("lgo-checkbox-field", className)} htmlFor={id}>
      <input
        {...props}
        id={id}
        type="checkbox"
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
