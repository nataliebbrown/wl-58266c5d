import { Book, FileText, Video, Globe, Headphones } from 'lucide-react';
import type { Resource, ResourceType } from '@/types/curriculum';

const typeIcon: Record<ResourceType, typeof Book> = {
  book: Book,
  article: FileText,
  video: Video,
  website: Globe,
  podcast: Headphones,
};

const typeLabel: Record<ResourceType, string> = {
  book: 'Book',
  article: 'Article',
  video: 'Video',
  website: 'Website',
  podcast: 'Podcast',
};

interface ResourcesTabContentProps {
  resources: Resource[];
}

export function ResourcesTabContent({ resources }: ResourcesTabContentProps) {
  if (resources.length === 0) {
    return (
      <p className="text-sm text-foreground/40 py-6 text-center">
        No resources for this lesson.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {resources.map((resource, i) => {
        const Icon = typeIcon[resource.type];
        return (
          <div
            key={i}
            className="border border-border/20 rounded-xl p-4 hover:bg-foreground/[0.02] dark:hover:bg-wl-olive-300/5 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-hl-green/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-hl-green" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm font-semibold text-foreground">{resource.title}</h4>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/35">
                    {typeLabel[resource.type]}
                  </span>
                </div>
                {resource.author && (
                  <p className="text-xs text-foreground/45 mb-1">by {resource.author}</p>
                )}
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {resource.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
