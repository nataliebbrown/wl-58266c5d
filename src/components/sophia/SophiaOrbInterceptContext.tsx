import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type OrbHandler = (prompt?: string) => void;

interface SophiaOrbInterceptValue {
  handler: OrbHandler | null;
  hideOrb: boolean;
  contextLabel: string | null;
  register: (fn: OrbHandler) => void;
  unregister: () => void;
  setHideOrb: (hide: boolean) => void;
  setContextLabel: (label: string | null) => void;
}

const SophiaOrbInterceptContext = createContext<SophiaOrbInterceptValue>({
  handler: null,
  hideOrb: false,
  contextLabel: null,
  register: () => {},
  unregister: () => {},
  setHideOrb: () => {},
  setContextLabel: () => {},
});

export function SophiaOrbInterceptProvider({ children }: { children: ReactNode }) {
  const [handler, setHandler] = useState<OrbHandler | null>(null);
  const [hideOrb, setHideOrb] = useState(false);
  const [contextLabel, setContextLabel] = useState<string | null>(null);

  const register = useCallback((fn: OrbHandler) => {
    setHandler(() => fn);
  }, []);

  const unregister = useCallback(() => {
    setHandler(null);
    setHideOrb(false);
    setContextLabel(null);
  }, []);

  return (
    <SophiaOrbInterceptContext.Provider value={{ handler, hideOrb, contextLabel, register, unregister, setHideOrb, setContextLabel }}>
      {children}
    </SophiaOrbInterceptContext.Provider>
  );
}

export function useSophiaOrbIntercept() {
  return useContext(SophiaOrbInterceptContext);
}
