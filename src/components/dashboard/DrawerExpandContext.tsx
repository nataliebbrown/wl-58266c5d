import { createContext, useContext, type ReactNode } from 'react';

interface DrawerExpandContextType {
  expand: (content: ReactNode, id?: string) => void;
  collapse: () => void;
  expandedId: string | null;
}

const DrawerExpandContext = createContext<DrawerExpandContextType>({
  expand: () => {},
  collapse: () => {},
  expandedId: null,
});

export { DrawerExpandContext };

export function useDrawerExpand() {
  return useContext(DrawerExpandContext);
}
