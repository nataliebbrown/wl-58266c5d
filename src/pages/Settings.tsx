import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Moon, Sun, RotateCcw, ChevronRight, BookOpen, Heart, GraduationCap, Users, Compass } from 'lucide-react';
import { getQuizData, resetOnboarding, clearQuizData } from '@/lib/onboardingState';
import { useDarkMode } from '@/components/layout/DarkModeContext';
import { getReadingHistory } from '@/lib/bibleApi';
import { getInsightCount } from '@/lib/insights';

// ============ Label maps ============

const BACKGROUND_LABELS: Record<string, string> = {
  new_to_faith: 'New to Faith',
  believer_going_deeper: 'Believer Going Deeper',
  pastor_leader: 'Pastor / Leader',
  seminary_student: 'Seminary Student',
  exploring_faith: 'Exploring Faith',
};

const LEARNING_LABELS: Record<string, string> = {
  reading_reflection: 'Reading & Reflection',
  visual_learner: 'Visual Learner',
  conversation_discussion: 'Conversation & Discussion',
  hands_on_interactive: 'Hands-On & Interactive',
  connections_patterns: 'Connections & Patterns',
};

const COMMUNITY_LABELS: Record<string, string> = {
  individual_study: 'Individual Study',
  small_group: 'Small Group',
  group_leader: 'Group Leader',
  seeking_community: 'Seeking Community',
  both_personal_group: 'Both Personal & Group',
};

const SEASON_LABELS: Record<string, string> = {
  deeper_relationship: 'Seeking a Deeper Relationship with God',
  questions_doubts: 'Working Through Questions & Doubts',
  difficult_situation: 'Walking Through a Difficult Season',
  ministry_preparation: 'Preparing for Ministry',
  understand_bible: 'Wanting to Understand the Bible',
  spiritual_growth: 'Focused on Spiritual Growth',
};

// ============ Sub-components ============

function SectionHeader({ label }: { label: string }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/35 dark:text-wl-olive-300/50 px-1 mb-3">
      {label}
    </p>
  );
}

function SettingsRow({
  icon: Icon,
  label,
  value,
  onClick,
  destructive,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string | null;
  onClick?: () => void;
  destructive?: boolean;
}) {
  const Wrapper = onClick ? 'button' : 'div';
  return (
    <Wrapper
      {...(onClick ? { onClick } : {})}
      className={`flex items-center gap-3.5 w-full text-left px-4 py-3.5 rounded-xl transition-colors ${
        onClick ? 'hover:bg-foreground/[0.03] active:bg-foreground/[0.06]' : ''
      }`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
          destructive
            ? 'bg-red-500/10 dark:bg-red-400/10'
            : 'bg-wl-olive/10 dark:bg-wl-olive-300/10'
        }`}
      >
        <Icon
          className={`w-4 h-4 ${
            destructive
              ? 'text-red-500/70 dark:text-red-400/70'
              : 'text-wl-olive/60 dark:text-wl-olive-300/60'
          }`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
            destructive
              ? 'text-red-600/80 dark:text-red-400/80'
              : 'text-foreground/80'
          }`}
        >
          {label}
        </p>
        {value && (
          <p className="text-[12px] text-foreground/40 dark:text-wl-olive-300/50 truncate mt-0.5">
            {value}
          </p>
        )}
      </div>
      {onClick && (
        <ChevronRight className="w-4 h-4 text-foreground/20 flex-shrink-0" />
      )}
    </Wrapper>
  );
}

// ============ Main ============

export default function Settings() {
  const navigate = useNavigate();
  const isDarkMode = useDarkMode();
  const quizData = getQuizData();
  const readingHistory = getReadingHistory();
  const insightCount = getInsightCount();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    resetOnboarding();
    clearQuizData();
    // Clear other user data
    localStorage.removeItem('wl-profile');
    localStorage.removeItem('wl-stats');
    localStorage.removeItem('wl-insights');
    localStorage.removeItem('wl-first-action-taken');
    localStorage.removeItem('wholelicity-reading-history');
    navigate('/');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="max-w-xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Settings</h2>

          {/* Profile */}
          <SectionHeader label="Profile" />
          <div className="rounded-2xl border border-foreground/[0.06] dark:border-wl-olive-300/10 mb-8 overflow-hidden">
            <SettingsRow
              icon={User}
              label={quizData.name || 'No name set'}
              value={
                quizData.spiritualBackground
                  ? BACKGROUND_LABELS[quizData.spiritualBackground] ?? quizData.spiritualBackground
                  : 'No background selected'
              }
            />
            {quizData.learningStyle && (
              <SettingsRow
                icon={GraduationCap}
                label="Learning Style"
                value={LEARNING_LABELS[quizData.learningStyle] ?? quizData.learningStyle}
              />
            )}
            {quizData.communityPreference && (
              <SettingsRow
                icon={Users}
                label="Community"
                value={COMMUNITY_LABELS[quizData.communityPreference] ?? quizData.communityPreference}
              />
            )}
            {quizData.currentSeason && (
              <SettingsRow
                icon={Compass}
                label="Current Season"
                value={SEASON_LABELS[quizData.currentSeason] ?? quizData.currentSeason}
              />
            )}
          </div>

          {/* Activity */}
          <SectionHeader label="Activity" />
          <div className="rounded-2xl border border-foreground/[0.06] dark:border-wl-olive-300/10 mb-8 overflow-hidden">
            <SettingsRow
              icon={BookOpen}
              label="Passages Read"
              value={`${readingHistory.length} passage${readingHistory.length !== 1 ? 's' : ''}`}
            />
            <SettingsRow
              icon={Heart}
              label="Saved Insights"
              value={`${insightCount} insight${insightCount !== 1 ? 's' : ''}`}
            />
          </div>

          {/* Appearance */}
          <SectionHeader label="Appearance" />
          <div className="rounded-2xl border border-foreground/[0.06] dark:border-wl-olive-300/10 mb-8 overflow-hidden">
            <SettingsRow
              icon={isDarkMode ? Moon : Sun}
              label="Theme"
              value={isDarkMode ? 'Dark mode' : 'Light mode (adapts to time of day)'}
            />
          </div>

          {/* Data */}
          <SectionHeader label="Data" />
          <div className="rounded-2xl border border-foreground/[0.06] dark:border-wl-olive-300/10 mb-8 overflow-hidden">
            {!showResetConfirm ? (
              <SettingsRow
                icon={RotateCcw}
                label="Reset All Data"
                value="Clear onboarding, reading history, and insights"
                onClick={() => setShowResetConfirm(true)}
                destructive
              />
            ) : (
              <div className="px-4 py-4">
                <p className="text-sm text-foreground/70 mb-3">
                  This will erase all your data and restart the onboarding experience. This cannot be undone.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-2 rounded-xl text-sm font-medium bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                  >
                    Confirm Reset
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 py-2 rounded-xl text-sm font-medium border border-foreground/10 text-foreground/60 hover:bg-foreground/[0.03] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* About */}
          <SectionHeader label="About" />
          <div className="rounded-2xl border border-foreground/[0.06] dark:border-wl-olive-300/10 mb-8 overflow-hidden">
            <div className="px-4 py-3.5">
              <p className="text-sm text-foreground/60">Wholelicity</p>
              <p className="text-[12px] text-foreground/30 mt-0.5">
                Scripture study guided by Sophia
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
