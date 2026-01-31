import { motion } from 'framer-motion';
import { getQuizData } from '@/lib/onboardingState';
import sophiaOrb from '@/assets/sophia-orb-brown.svg';
import type { JourneyNode } from '@/components/dashboard/JourneyCard';

// ============ Personalized Content ============

const JOURNEY_CONTENT: Record<string, { narration: string }> = {
  new_to_faith: {
    narration: 'Every step of faith matters — even the first one. You\'re already on your way.',
  },
  believer_going_deeper: {
    narration: 'The deeper you go, the more you discover. This journey has no ceiling.',
  },
  pastor_leader: {
    narration: 'Your journey shapes the journeys you lead. Walk with intention.',
  },
  seminary_student: {
    narration: 'Knowledge becomes wisdom when it\'s lived. Let this journey be both.',
  },
  exploring_faith: {
    narration: 'Questions are the beginning of every meaningful journey. Follow them.',
  },
};

// ============ Constants ============

const NODE_SPACING = 52;
const PATH_LEFT = 20;
const NODE_RADIUS_PAST = 7;
const NODE_RADIUS_CURRENT = 8;
const HORIZON_RADIUS = 10;

// ============ Component ============

export default function Journey() {
  const quizData = getQuizData();
  const personalized = JOURNEY_CONTENT[quizData.spiritualBackground ?? ''];
  const narration = personalized?.narration ?? 'Every journey begins with a single step. Yours just started.';

  // TODO: Replace with actual journey data from state/storage
  const nodes: JourneyNode[] = [];
  const isEmpty = nodes.length === 0;
  const nodeCount = isEmpty ? 1 : nodes.length;
  const svgHeight = (nodeCount + 1) * NODE_SPACING + 40;

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Your Journey</h2>
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
          <div className="flex items-start gap-2.5 mt-8">
            <img
              src={sophiaOrb}
              alt=""
              className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-60"
            />
            <p className="text-sm italic text-muted-foreground leading-relaxed">
              &ldquo;{narration}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ Path Components ============

function EmptyPath() {
  const startY = 30;
  const horizonY = startY + NODE_SPACING * 2;

  return (
    <>
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
      <motion.circle
        cx={PATH_LEFT}
        cy={startY}
        r={NODE_RADIUS_CURRENT}
        className="text-wl-olive dark:text-wl-olive-300"
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
      <HorizonNode cy={horizonY} />
    </>
  );
}

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
            {node.isCurrent ? (
              <motion.circle
                cx={PATH_LEFT}
                cy={y}
                r={NODE_RADIUS_CURRENT}
                className="text-wl-olive dark:text-wl-olive-300"
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
      <HorizonNode cy={startY + nodes.length * NODE_SPACING} />
    </>
  );
}

function HorizonNode({ cy }: { cy: number }) {
  return (
    <g>
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
