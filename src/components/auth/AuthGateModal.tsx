import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, X } from 'lucide-react';
import sophiaOrb from '@/assets/sophia-orb-brown.svg';

type Tab = 'signup' | 'signin';

export function AuthGateModal() {
  const { signUp, signIn, signInWithGoogle } = useAuth();
  const [dismissed, setDismissed] = useState(false);
  const [tab, setTab] = useState<Tab>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (tab === 'signup') {
        if (!name.trim()) {
          setError('Please enter your name');
          setIsSubmitting(false);
          return;
        }
        const result = await signUp(email, password, name.trim());
        if (result.error) setError(result.error);
      } else {
        const result = await signIn(email, password);
        if (result.error) setError(result.error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    const result = await signInWithGoogle();
    if (result.error) setError(result.error);
  };

  const switchTab = (newTab: Tab) => {
    setTab(newTab);
    setError(null);
  };

  // TODO: Remove dismiss functionality before production — auth should be required
  if (dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md mx-4"
      >
        {/* Temporary dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        <div
          className="rounded-3xl overflow-hidden p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(244, 239, 230, 0.95) 0%, rgba(241, 237, 233, 0.98) 100%)',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.25), 0 8px 24px rgba(0, 0, 0, 0.15)',
          }}
        >
          {/* Sophia orb accent */}
          <div className="flex justify-center mb-5">
            <img src={sophiaOrb} alt="" className="w-14 h-14 opacity-80" />
          </div>

          {/* Heading */}
          <h2
            className="text-2xl text-center text-charcoal mb-1"
            style={{ fontFamily: '"Libre Bodoni", Georgia, serif' }}
          >
            {tab === 'signup' ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-sm text-charcoal/50 text-center mb-6">
            {tab === 'signup'
              ? 'Sign up to save your progress and unlock all features'
              : 'Sign in to continue your journey'}
          </p>

          {/* Tab toggle */}
          <div className="flex rounded-full bg-charcoal/8 p-1 mb-6">
            {(['signup', 'signin'] as const).map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  tab === t
                    ? 'bg-white text-charcoal shadow-sm'
                    : 'text-charcoal/50 hover:text-charcoal/70'
                }`}
              >
                {t === 'signup' ? 'Sign Up' : 'Sign In'}
              </button>
            ))}
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogle}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-charcoal/15 hover:border-charcoal/25 bg-white hover:bg-charcoal/3 transition-all duration-200 mb-4 disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm font-medium text-charcoal/80">
              Continue with Google
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-charcoal/10" />
            <span className="text-xs text-charcoal/35 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-charcoal/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <AnimatePresence mode="wait">
              {tab === 'signup' && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/35" />
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-charcoal/15 bg-white/80 text-charcoal text-sm placeholder:text-charcoal/35 focus:outline-none focus:border-charcoal/30 focus:ring-2 focus:ring-charcoal/8 transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/35" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-charcoal/15 bg-white/80 text-charcoal text-sm placeholder:text-charcoal/35 focus:outline-none focus:border-charcoal/30 focus:ring-2 focus:ring-charcoal/8 transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/35" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-charcoal/15 bg-white/80 text-charcoal text-sm placeholder:text-charcoal/35 focus:outline-none focus:border-charcoal/30 focus:ring-2 focus:ring-charcoal/8 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/35 hover:text-charcoal/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-sm text-red-600 px-1"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 disabled:opacity-50"
              style={{
                backgroundColor: '#2F2921',
                boxShadow: '0 2px 8px rgba(47, 41, 33, 0.3)',
              }}
            >
              {isSubmitting
                ? 'Please wait...'
                : tab === 'signup'
                  ? 'Create Account'
                  : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs text-charcoal/35 text-center mt-5">
            {tab === 'signup'
              ? <>By signing up, you agree to our <a href="/terms" className="underline hover:text-charcoal/60 transition-colors">Terms of Service</a></>
              : 'Forgot your password? Contact support'}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
