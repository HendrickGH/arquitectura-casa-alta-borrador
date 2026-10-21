import { ProjectCard } from "@/components/molecules/ProjectCard";
import { cx } from "@/lib/cx";
import type { Project } from "@/types/content";

interface ProjectsGridProps {
  projects: Project[];
  /** Spacing between this grid and whatever precedes it in the section. */
  className?: string;
  /** Optional interactive drawer handler for the /proyectos explorer. */
  onSelect?: (project: Project) => void;
}

/**
 * Partitions any number of projects into an alternating cadence of rows
 * of 2 (50% landscape) and rows of 3 (33.3% portrait), exactly mirroring Bloom 3D Studio.
 */
function computeRowPattern(total: number): number[] {
  if (total <= 0) return [];
  if (total === 1) return [1];
  if (total === 2) return [2];
  if (total === 3) return [3];
  if (total === 4) return [2, 2];
  if (total === 5) return [2, 3];
  if (total === 6) return [3, 3];
  if (total === 7) return [2, 3, 2];
  if (total === 8) return [3, 2, 3];
  if (total === 9) return [2, 3, 2, 2];
  if (total === 10) return [2, 3, 2, 3];
  if (total === 11) return [2, 3, 3, 3];
  if (total === 12) return [2, 3, 2, 3, 2];
  if (total === 13) return [3, 2, 3, 2, 3];
  if (total === 14) return [2, 3, 2, 2, 3, 2];
  if (total === 15) return [2, 3, 2, 3, 2, 3];
  if (total === 16) return [2, 3, 2, 3, 3, 3];
  if (total === 17) return [2, 3, 2, 3, 2, 3, 2];
  if (total === 18) return [2, 3, 2, 3, 2, 3, 2, 1];

  const rows: number[] = [];
  let remaining = total;
  let preferThree = false;

  while (remaining > 0) {
    if (remaining === 2) {
      rows.push(2);
      break;
    }
    if (remaining === 3) {
      rows.push(3);
      break;
    }
    if (remaining === 4) {
      rows.push(2, 2);
      break;
    }
    if (remaining === 5) {
      rows.push(2, 3);
      break;
    }

    const nextSize = preferThree ? 3 : 2;
    rows.push(nextSize);
    remaining -= nextSize;
    preferThree = !preferThree;
  }

  return rows;
}

export function ProjectsGrid({
  projects,
  className,
  onSelect,
}: ProjectsGridProps) {
  if (projects.length === 0) return null;

  const rowSizes = computeRowPattern(projects.length);

  // Map each project index to its row's width count (1, 2, or 3)
  const itemRowSizes: number[] = [];
  for (const size of rowSizes) {
    for (let i = 0; i < size; i++) {
      itemRowSizes.push(size);
    }
  }

  return (
    <div
      className={cx(
        "mx-auto w-full max-w-[1920px] px-1 sm:px-2 md:px-3 lg:px-4",
        className,
      )}
    >
      <div className="grid grid-cols-12 gap-1 sm:gap-1.5">
        {projects.map((project, index) => {
          const rowSize = itemRowSizes[index] ?? 2;
          const isTwo = rowSize === 2;
          const isSingle = rowSize === 1;

          // Responsive grid column spans:
          // In a row of 2: both cards span 6 columns (50% width each)
          // In a row of 3: all three cards span 4 columns (33.3% width each)
          // In a row of 1: full width 12 columns
          const colSpanClass = isSingle
            ? "col-span-12"
            : isTwo
              ? "col-span-12 md:col-span-6"
              : "col-span-12 md:col-span-4";

          // Proportions matching Bloom 3D Studio:
          // Row of 2: landscape (aspect-[16/10])
          // Row of 3: vertical monograph (aspect-[4/5], identical to The Ubud)
          // Row of 1: panoramic (aspect-[16/9] md:aspect-[21/9])
          const aspectClass = isSingle
            ? "aspect-[16/9] md:aspect-[21/9]"
            : isTwo
              ? "aspect-[16/10]"
              : "aspect-[4/5]";

          const sizes = isSingle
            ? "100vw"
            : isTwo
              ? "(min-width: 768px) 50vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw";

          return (
            <ProjectCard
              key={project.slug}
              project={project}
              sizes={sizes}
              revealIndex={index}
              onSelect={onSelect}
              aspectClassName={aspectClass}
              className={colSpanClass}
              preferWide={isTwo || isSingle}
            />
          );
        })}
      </div>
    </div>
  );
}
