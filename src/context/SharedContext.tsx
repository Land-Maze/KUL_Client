'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type SharedContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
};

const SharedContext = createContext<SharedContextType | undefined>(undefined);

export const SharedProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<SharedContextType>({
    isLoggedIn: false,
    setIsLoggedIn: (val: boolean) => {
      setValue((prev) => ({ ...prev, isLoggedIn: val }));
    },
  });

  return (
    <SharedContext.Provider value={value}>
      {children}
    </SharedContext.Provider>
  );
};

export const useShared = (): SharedContextType => {
  const context = useContext(SharedContext);
  if (!context) throw new Error('useShared must be used within SharedProvider');
  return context;
};
