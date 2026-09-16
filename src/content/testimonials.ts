import type { Testimonial } from "@/types/content";

/**
 * EMPTY ON PURPOSE. Do not fill this with placeholder quotes.
 *
 * The brief asked for testimonials but confirmed there are none yet: no client
 * quotes, no reviews, no ratings ("NO TENEMOS IDEA", "NO NADA AUN"). Inventing
 * quotes and attributing them to named real projects would put fabricated
 * endorsements in front of buyers -- that is deceptive advertising, and in
 * Mexico it is what PROFECO regulates. It is also trivially discoverable: the
 * projects named here are real and their owners can be asked.
 *
 * The type, the component and the section are all built and waiting. The
 * landing renders the section only when this array has entries, so nothing
 * looks broken in the meantime.
 *
 * To go live, the brief said video is the preferred format. The fastest real
 * path: ask two or three past clients for a short clip or a written line, then
 * record them here with their project name as the attribution.
 */
export const testimonials: Testimonial[] = [];
