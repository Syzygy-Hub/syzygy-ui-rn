import React, { createContext, useContext, useState } from 'react';

import { SyzygyTheme, defaultTheme } from './SyzygyTheme';

const SyzygyThemeContext = createContext<{
  theme: SyzygyTheme;
  setTheme: (theme: SyzygyTheme) => void;
}>({ theme: defaultTheme, setTheme: () => {} });

export interface SyzygyThemeProviderProps {
  theme?: SyzygyTheme;
  children: React.ReactNode;
}

export function SyzygyThemeProvider({
  theme: initialTheme = defaultTheme,
  children,
}: SyzygyThemeProviderProps) {
  const [theme, setTheme] = useState<SyzygyTheme>(initialTheme);
  return (
    <SyzygyThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </SyzygyThemeContext.Provider>
  );
}

export function useSyzygyTheme(): { theme: SyzygyTheme; setTheme: (t: SyzygyTheme) => void } {
  return useContext(SyzygyThemeContext);
}

/** Component-level theme override wrapper */
export function SyzygyThemeOverride({
  theme,
  children,
}: { theme: SyzygyTheme; children: React.ReactNode }) {
  return (
    <SyzygyThemeContext.Provider value={{ theme, setTheme: () => {} }}>
      {children}
    </SyzygyThemeContext.Provider>
  );
}
