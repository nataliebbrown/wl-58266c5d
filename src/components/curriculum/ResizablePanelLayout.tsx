import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react';

interface ResizablePanelLayoutProps {
  leftPanel: ReactNode;
  middlePanel?: ReactNode;
  rightPanel?: ReactNode;
}

export function ResizablePanelLayout({
  leftPanel,
  middlePanel,
  rightPanel,
}: ResizablePanelLayoutProps) {
  const panelCount = 1 + (middlePanel ? 1 : 0) + (rightPanel ? 1 : 0);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<number | null>(null);

  // Column widths as percentages
  const [widths, setWidths] = useState<number[]>(() => {
    if (panelCount === 1) return [100];
    if (panelCount === 2) return [50, 50];
    return [33.33, 33.33, 33.34];
  });

  // Reset widths when panel count changes
  useEffect(() => {
    if (panelCount === 1) setWidths([100]);
    else if (panelCount === 2) setWidths([50, 50]);
    else setWidths([33.33, 33.33, 33.34]);
  }, [panelCount]);

  const handleMouseDown = useCallback((handleIndex: number) => {
    draggingRef.current = handleIndex;
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (draggingRef.current === null || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const totalWidth = rect.width;
      const pct = (x / totalWidth) * 100;

      const idx = draggingRef.current;

      setWidths((prev) => {
        const next = [...prev];
        const minWidth = 20; // minimum 20% per panel

        if (panelCount === 2) {
          const left = Math.max(minWidth, Math.min(100 - minWidth, pct));
          next[0] = left;
          next[1] = 100 - left;
        } else if (panelCount === 3) {
          if (idx === 0) {
            // Dragging first handle — adjusts left and middle
            const left = Math.max(minWidth, Math.min(100 - next[2] - minWidth, pct));
            next[0] = left;
            next[1] = 100 - left - next[2];
            if (next[1] < minWidth) {
              next[1] = minWidth;
              next[0] = 100 - minWidth - next[2];
            }
          } else {
            // Dragging second handle — adjusts middle and right
            const leftMiddle = Math.max(
              next[0] + minWidth,
              Math.min(100 - minWidth, pct)
            );
            next[1] = leftMiddle - next[0];
            next[2] = 100 - leftMiddle;
          }
        }

        return next;
      });
    },
    [panelCount]
  );

  const handleMouseUp = useCallback(() => {
    draggingRef.current = null;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  if (panelCount === 1) {
    return <div className="h-full">{leftPanel}</div>;
  }

  const panels: ReactNode[] = [leftPanel];
  if (middlePanel) panels.push(middlePanel);
  if (rightPanel) panels.push(rightPanel);

  return (
    <div
      ref={containerRef}
      className="h-full flex"
      style={{ userSelect: draggingRef.current !== null ? 'none' : undefined }}
    >
      {panels.map((panel, i) => (
        <div key={i} className="flex" style={{ width: `${widths[i]}%` }}>
          <div className="flex-1 min-w-0 overflow-hidden">{panel}</div>
          {i < panels.length - 1 && (
            <div
              className="w-1.5 flex-shrink-0 cursor-col-resize group relative"
              onMouseDown={() => handleMouseDown(i)}
              style={{ touchAction: 'none' }}
            >
              <div className="absolute inset-y-0 left-0 right-0 bg-border/30 group-hover:bg-[#87A96B]/40 transition-colors" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
