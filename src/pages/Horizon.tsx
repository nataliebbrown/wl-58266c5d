import type { HorizonItem } from '@/components/dashboard/HorizonCard';

// ============ Component ============

export default function Horizon() {
  // TODO: Replace with actual horizon data from state/storage
  const items: HorizonItem[] = [];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-semibold text-foreground mb-8">On Your Horizon</h2>
          {items.length === 0 ? (
            <p className="text-sm italic text-muted-foreground text-center py-12">
              The horizon is forming. As you explore with Sophia, themes will emerge that point to what&apos;s next.
            </p>
          ) : (
            <div className="space-y-0">
              {items.map((item, index) => (
                <HorizonRow
                  key={item.id}
                  item={item}
                  isLast={index === items.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ Horizon Row ============

function HorizonRow({ item, isLast }: { item: HorizonItem; isLast: boolean }) {
  const dotClassName = getDotClassName(item.state);

  return (
    <div
      className={`py-2.5 hover:bg-foreground/[0.03] rounded-lg transition-colors ${
        !isLast ? 'border-b border-foreground/[0.04]' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1.5 flex-shrink-0">
          <div className={`w-2.5 h-2.5 rounded-full ${dotClassName}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <p
              className="text-sm font-medium text-foreground/80"
              style={{ opacity: item.state === 'distant' ? 0.6 : 1 }}
            >
              &ldquo;{item.theme}&rdquo;
            </p>
            <span className="text-[11px] text-foreground/40 flex-shrink-0">
              {item.timeHint}
            </span>
          </div>
          <p className="text-[12px] text-foreground/40 leading-snug mt-0.5">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function getDotClassName(state: HorizonItem['state']): string {
  switch (state) {
    case 'near':
      return 'bg-wl-olive dark:bg-wl-olive-300';
    case 'emerging':
      return 'bg-wl-sage/50 dark:bg-wl-olive-300/50';
    case 'distant':
      return 'border-2 border-wl-sage/30 dark:border-wl-olive-300/30';
  }
}
