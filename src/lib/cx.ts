/**
 * Joins conditional class names.
 *
 * Deliberately not a dependency: this is the whole feature.
 */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
