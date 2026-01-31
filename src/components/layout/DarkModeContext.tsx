import { createContext, useContext } from 'react';

const DarkModeContext = createContext(false);

export { DarkModeContext };

export function useDarkMode() {
  return useContext(DarkModeContext);
}
