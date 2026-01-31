import type { ReactNode } from 'react';

// ============ Sophia Markdown Renderer ============
// Shared renderer used by ChatMessage, DashboardSophiaPanel,
// CurriculumSophiaPanel, and any other component that displays
// Sophia's responses.

// Classify what a line represents
function lineType(line: string): 'empty' | 'heading' | 'bold-heading' | 'blockquote' | 'bullet' | 'numbered' | 'paragraph' {
  if (!line.trim()) return 'empty';
  const t = line.trim();
  if (/^#{2,3}\s+/.test(t)) return 'heading';
  if (/^\*\*[^*]+\*\*$/.test(t)) return 'bold-heading';
  if (/^>\s/.test(t)) return 'blockquote';
  if (/^[-•*]\s/.test(t)) return 'bullet';
  if (/^\d+[.)]\s/.test(t)) return 'numbered';
  return 'paragraph';
}

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      parts.push(<strong key={match.index} className="font-semibold text-foreground">{match[1]}</strong>);
    } else if (match[2]) {
      parts.push(<em key={match.index} className="text-foreground/80">{match[2]}</em>);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function renderSophiaMarkdown(text: string): ReactNode[] {
  const lines = text.split('\n');
  const nodes: ReactNode[] = [];
  let key = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const type = lineType(line);

    if (type === 'empty') { i++; continue; }

    // Heading: ## or ###
    if (type === 'heading') {
      const match = line.trim().match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        nodes.push(level === 2
          ? <h3 key={key++} className="text-[17px] font-semibold mt-4 mb-1.5 first:mt-0">{renderInline(match[2])}</h3>
          : <h4 key={key++} className="text-base font-semibold mt-3 mb-1 first:mt-0">{renderInline(match[2])}</h4>
        );
      }
      i++; continue;
    }

    // Standalone bold line → section heading
    if (type === 'bold-heading') {
      const headingText = line.trim().replace(/^\*\*|\*\*$/g, '');
      nodes.push(<h4 key={key++} className="text-base font-semibold mt-3 mb-1 first:mt-0">{headingText}</h4>);
      i++; continue;
    }

    // Blockquote: collect consecutive > lines
    if (type === 'blockquote') {
      const quoteLines: string[] = [];
      while (i < lines.length && lineType(lines[i]) === 'blockquote') {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ''));
        i++;
      }
      nodes.push(
        <blockquote key={key++} className="border-l-2 border-hl-green/40 pl-3.5 my-2.5 italic text-[15px] leading-relaxed text-foreground/80">
          {renderInline(quoteLines.join(' '))}
        </blockquote>
      );
      continue;
    }

    // Bullet list: collect consecutive bullet lines
    if (type === 'bullet') {
      const items: string[] = [];
      while (i < lines.length && lineType(lines[i]) === 'bullet') {
        items.push(lines[i].trim().replace(/^[-•*]\s+/, ''));
        i++;
      }
      nodes.push(
        <ul key={key++} className="list-disc list-outside pl-5 my-2 space-y-1.5">
          {items.map((item, idx) => <li key={idx} className="text-[15px] leading-relaxed">{renderInline(item)}</li>)}
        </ul>
      );
      continue;
    }

    // Numbered list: collect consecutive numbered lines
    if (type === 'numbered') {
      const items: string[] = [];
      while (i < lines.length && lineType(lines[i]) === 'numbered') {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/, ''));
        i++;
      }
      nodes.push(
        <ol key={key++} className="list-decimal list-outside pl-5 my-2 space-y-1.5">
          {items.map((item, idx) => <li key={idx} className="text-[15px] leading-relaxed">{renderInline(item)}</li>)}
        </ol>
      );
      continue;
    }

    // Paragraph: collect consecutive plain-text lines
    const paraLines: string[] = [];
    while (i < lines.length && lineType(lines[i]) === 'paragraph') {
      paraLines.push(lines[i].trim());
      i++;
    }
    nodes.push(
      <p key={key++} className="text-[15px] leading-relaxed mb-2.5 last:mb-0">
        {renderInline(paraLines.join(' '))}
      </p>
    );
  }

  return nodes;
}
