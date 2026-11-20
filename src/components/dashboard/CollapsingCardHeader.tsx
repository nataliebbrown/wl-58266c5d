import { forwardRef, type ReactNode } from 'react';

interface CollapsingCardHeaderProps {
  /** Icon tile, orb, and so on. Same element and size in both states — only
   *  its position changes — so stateful visuals aren't torn down on collapse. */
  visual: ReactNode;
  /** Spacing under the visual in the expanded state. */
  visualClassName?: string;
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  collapsed: boolean;
}

/**
 * Dashboard card header that reflows to a single row once the card's content
 * is scrolled, freeing the height for the scroll area.
 *
 * Collapsing drops the eyebrow and description and moves the visual beside the
 * title, at the same size it has when expanded. The layout snaps rather than
 * animating: flex-direction isn't animatable, and a half-transitioned state
 * reads worse than a clean switch.
 */
export const CollapsingCardHeader = forwardRef<HTMLDivElement, CollapsingCardHeaderProps>(
  (
    {
      visual,
      visualClassName = 'mb-6',
      eyebrow,
      title,
      description,
      titleClassName = 'text-wl-earth dark:text-wl-olive-200',
      descriptionClassName = '',
      collapsed,
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={`flex-shrink-0 px-5 ${
        collapsed
          ? 'flex items-center gap-4 py-4 pr-12' // pr-12 clears the expand button
          : 'flex flex-col items-center text-center pt-8 pb-4'
      }`}
    >
      <div className={collapsed ? 'flex-shrink-0' : visualClassName}>{visual}</div>

      {/* `contents` in the expanded state so each line stays a direct flex item
          of the centred column, as it was before the header could collapse. */}
      <div className={collapsed ? 'min-w-0 flex-1' : 'contents'}>
        {!collapsed && (
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-foreground/40 dark:text-wl-olive-300">
            {eyebrow}
          </p>
        )}

        <h3
          className={`text-2xl leading-snug ${
            collapsed ? 'text-left line-clamp-2' : 'mt-2'
          } ${titleClassName}`}
        >
          {title}
        </h3>

        {!collapsed && (
          <p
            className={`text-sm text-foreground/40 mt-1 max-w-[260px] leading-relaxed ${descriptionClassName}`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  ),
);
CollapsingCardHeader.displayName = 'CollapsingCardHeader';
