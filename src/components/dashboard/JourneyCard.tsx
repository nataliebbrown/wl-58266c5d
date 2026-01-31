import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Route } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ExpandButton } from '@/components/ui/ExpandButton';
import { useDrawerExpand } from './DrawerExpandContext';
import { getQuizData } from '@/lib/onboardingState';
import sophiaOrb from '@/assets/sophia-orb-brown.svg';

// ============ Personalized Content ============

const JOURNEY_CONTENT: Record<string, { narration: string; subtitle: string }> = {
  new_to_faith: {
    narration: 'Every step of faith matters — even the first one. You\'re already on your way.',
    subtitle: 'Your first steps in faith',
  },
  believer_going_deeper: {
    narration: 'The deeper you go, the more you discover. This journey has no ceiling.',
    subtitle: 'Going deeper from here',
  },
  pastor_leader: {
    narration: 'Your journey shapes the journeys you lead. Walk with intention.',
    subtitle: 'Leading from the path you walk',
  },
  seminary_student: {
    narration: 'Knowledge becomes wisdom when it\'s lived. Let this journey be both.',
    subtitle: 'Where study meets formation',
  },
  exploring_faith: {
    narration: 'Questions are the beginning of every meaningful journey. Follow them.',
    subtitle: 'Following your questions',
  },
};

// ============ Types ============

export interface JourneyNode {
  id: string;
  theme: string;
  timeLabel: string;
  isCurrent?: boolean;
}

interface JourneyCardProps {
  nodes?: JourneyNode[];
  narration?: string;
}

// ============ Constants ============

const NODE_SPACING = 52; // px between nodes vertically
const PATH_LEFT = 20; // px from left edge to node center
const NODE_RADIUS_PAST = 7;
const NODE_RADIUS_CURRENT = 8;
const HORIZON_RADIUS = 10;

// ============ Component ============

export function JourneyCard({ nodes = [], narration }: JourneyCardProps) {
  const navigate = useNavigate();
  const { expand } = useDrawerExpand();
  const isEmpty = nodes.length === 0;
  const quizData = getQuizData();
  const personalized = JOURNEY_CONTENT[quizData.spiritualBackground ?? ''];

  const defaultNarration = isEmpty
    ? (personalized?.narration ?? 'Every journey begins with a single step. Yours just started.')
    : undefined;

  const displayNarration = narration ?? defaultNarration;

  // Calculate SVG height based on node count
  const nodeCount = isEmpty ? 1 : nodes.length;
  const svgHeight = (nodeCount + 1) * NODE_SPACING + 40; // +1 for horizon, +40 for padding

  // Expanded modal: unconstrained height for the full journey
  const expandedSvgHeight = (nodeCount + 1) * NODE_SPACING + 40;

  const handleExpand = () => expand(
    <div className="max-w-2xl mx-auto px-8 py-12">
      <h2 className="text-2xl font-semibold text-foreground mb-8">Your Journey</h2>
      <svg
        width="100%"
        height={expandedSvgHeight}
        viewBox={`0 0 260 ${expandedSvgHeight}`}
        className="block"
      >
        {isEmpty ? (
          <EmptyPath />
        ) : (
          <PopulatedPath nodes={nodes} />
        )}
      </svg>
      {displayNarration && (
        <div className="flex items-start gap-2.5 mt-8">
          <img
            src={sophiaOrb}
            alt=""
            className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-60"
          />
          <p className="text-sm italic text-muted-foreground leading-relaxed">
            &ldquo;{displayNarration}&rdquo;
          </p>
        </div>
      )}
    </div>
  );

  return (
    <GlassCard padding="none" className="flex flex-col h-full overflow-hidden">
      <div className="px-5 pt-5">
        {/* Header — icon + expand */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#756653]/10 dark:bg-[#A5A597]/10 flex items-center justify-center">
            <Route className="w-4.5 h-4.5 text-[#756653] dark:text-[#A5A597]" />
          </div>
          <ExpandButton onClick={handleExpand} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground leading-tight">
          Your Journey
        </h3>
        <p className="text-sm text-foreground/50 mt-1">
          {isEmpty ? (personalized?.subtitle ?? 'Your path is just beginning') : `${nodes.length} milestone${nodes.length !== 1 ? 's' : ''} reached`}
        </p>
      </div>

      {/* Scrollable path area */}
      <div
        className="flex-1 overflow-y-auto px-5 mt-3"
        style={{ maxHeight: 280, minHeight: 160 }}
      >
        <svg
          width="100%"
          height={svgHeight}
          viewBox={`0 0 260 ${svgHeight}`}
          className="block"
        >
          {isEmpty ? (
            <EmptyPath />
          ) : (
            <PopulatedPath nodes={nodes} />
          )}
        </svg>
      </div>

      {/* Narration + CTA */}
      {displayNarration && (
        <div className="px-5 pt-3 border-t border-foreground/[0.05]">
          <div className="flex items-start gap-2.5">
            <img
              src={sophiaOrb}
              alt=""
              className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-60"
            />
            <p className="text-[13px] italic text-foreground/50 leading-relaxed">
              &ldquo;{displayNarration}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* CTA button */}
      {!isEmpty && (
        <div className="mt-auto px-5 pb-5 pt-3">
          <button
            onClick={() => navigate('/journey')}
            className="w-full py-2.5 rounded-xl text-sm font-medium text-[#756653] dark:text-[#A5A597] border border-[#756653]/25 dark:border-[#A5A597]/25 hover:bg-[#756653]/8 dark:hover:bg-[#A5A597]/8 transition-colors"
          >
            See Full Journey
          </button>
        </div>
      )}
    </GlassCard>
  );
}

// ============ Empty State Path ============

function EmptyPath() {
  const startY = 30;
  const horizonY = startY + NODE_SPACING * 2;

  return (
    <>
      {/* Connecting dotted line */}
      <line
        x1={PATH_LEFT}
        y1={startY + NODE_RADIUS_CURRENT}
        x2={PATH_LEFT}
        y2={horizonY}
        stroke="#C5B49B"
        strokeWidth={2}
        strokeOpacity={0.3}
        strokeDasharray="4 6"
      />

      {/* Start node */}
      <motion.circle
        cx={PATH_LEFT}
        cy={startY}
        r={NODE_RADIUS_CURRENT}
        className="text-[#756653] dark:text-[#A5A597]"
        fill="currentColor"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
      />
      <text
        x={PATH_LEFT + 18}
        y={startY + 1}
        fontSize={14}
        fontWeight={500}
        fill="currentColor"
        dominantBaseline="middle"
        className="text-foreground"
      >
        START
      </text>

      {/* Horizon element */}
      <HorizonNode cy={horizonY} />
    </>
  );
}

// ============ Populated Path ============

function PopulatedPath({ nodes }: { nodes: JourneyNode[] }) {
  const startY = 30;

  return (
    <>
      {nodes.map((node, index) => {
        const y = startY + index * NODE_SPACING;
        const nextY = startY + (index + 1) * NODE_SPACING;
        const isLast = index === nodes.length - 1;

        return (
          <g key={node.id}>
            {/* Connecting line to next node */}
            {!isLast && (
              <line
                x1={PATH_LEFT}
                y1={y + (node.isCurrent ? NODE_RADIUS_CURRENT : NODE_RADIUS_PAST)}
                x2={PATH_LEFT}
                y2={nextY - (nodes[index + 1].isCurrent ? NODE_RADIUS_CURRENT : NODE_RADIUS_PAST)}
                stroke="#C5B49B"
                strokeWidth={2}
                strokeOpacity={0.4}
              />
            )}

            {/* Dotted line to horizon after last/current node */}
            {isLast && (
              <line
                x1={PATH_LEFT}
                y1={y + (node.isCurrent ? NODE_RADIUS_CURRENT : NODE_RADIUS_PAST)}
                x2={PATH_LEFT}
                y2={y + NODE_SPACING}
                stroke="#C5B49B"
                strokeWidth={2}
                strokeOpacity={0.3}
                strokeDasharray="4 6"
              />
            )}

            {/* Node circle */}
            {node.isCurrent ? (
              <motion.circle
                cx={PATH_LEFT}
                cy={y}
                r={NODE_RADIUS_CURRENT}
                className="text-[#756653] dark:text-[#A5A597]"
                fill="currentColor"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
              />
            ) : (
              <circle
                cx={PATH_LEFT}
                cy={y}
                r={NODE_RADIUS_PAST}
                fill="#C5B49B"
                opacity={0.6}
              />
            )}

            {/* Theme label */}
            <text
              x={PATH_LEFT + 18}
              y={y - 2}
              fontSize={14}
              fontWeight={node.isCurrent ? 600 : 500}
              fill="currentColor"
              className="text-foreground"
            >
              {node.theme}
            </text>

            {/* Time label */}
            <text
              x={PATH_LEFT + 18}
              y={y + 14}
              fontSize={12}
              fill="currentColor"
              opacity={0.5}
              className="text-muted-foreground"
            >
              {node.isCurrent ? 'NOW' : node.timeLabel}
            </text>
          </g>
        );
      })}

      {/* Horizon after last node */}
      <HorizonNode cy={startY + nodes.length * NODE_SPACING} />
    </>
  );
}

// ============ Horizon Node ============

function HorizonNode({ cy }: { cy: number }) {
  return (
    <g>
      {/* Radial glow */}
      <defs>
        <radialGradient id="horizon-glow">
          <stop offset="0%" stopColor="rgba(222, 209, 186, 0.6)" />
          <stop offset="100%" stopColor="rgba(222, 209, 186, 0)" />
        </radialGradient>
      </defs>
      <motion.circle
        cx={PATH_LEFT}
        cy={cy}
        r={HORIZON_RADIUS * 2.5}
        fill="url(#horizon-glow)"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.circle
        cx={PATH_LEFT}
        cy={cy}
        r={HORIZON_RADIUS}
        fill="#DED1BA"
        opacity={0.6}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      />
      <text
        x={PATH_LEFT + 18}
        y={cy + 1}
        fontSize={14}
        fill="currentColor"
        opacity={0.5}
        letterSpacing="0.1em"
        dominantBaseline="middle"
        className="text-muted-foreground"
      >
        HORIZON
      </text>
    </g>
  );
}
