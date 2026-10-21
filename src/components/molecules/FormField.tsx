import { cx } from "@/lib/cx";

interface FormFieldProps {
  /** Matches `name`, so the label click focuses the control. */
  id: string;
  name: string;
  label: string;
  placeholder: string;
  /** Defaults to a single-line text input. */
  type?: "text" | "email" | "tel";
  /** Optional standard autocomplete attribute. */
  autoComplete?: string;
  /** Switches the control to a textarea. */
  multiline?: boolean;
  required?: boolean;
  className?: string;
}

/**
 * One labelled form control.
 *
 * Uncontrolled on purpose: the form reads a `FormData` snapshot on submit, so
 * no field needs state and no value round-trips through React on every
 * keystroke. The field only owns its markup and its label association.
 *
 * Styling follows the square-cornered house rule -- the radius scale is zeroed
 * globally, so there is nothing to un-round -- and the focus ring is the
 * global `:focus-visible` outline rather than a per-field one.
 */
export function FormField({
  id,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
  multiline = false,
  required = false,
  className,
}: FormFieldProps) {
  const control = cx(
    "w-full bg-bone-100/70 px-4 py-3 text-base text-ink transition-colors",
    "placeholder:text-ink-muted/60 focus:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-800",
  );

  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="label text-ink-muted">
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={5}
          className={cx(control, "resize-y")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          className={control}
        />
      )}
    </div>
  );
}
