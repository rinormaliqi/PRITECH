import React, { createContext, useContext, ReactNode } from 'react';
import { useUser } from '../hooks/useUser';

interface UserContextValue {
  name: string | null;
  loading: boolean;
  saveName: (name: string) => Promise<void>;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const value = useUser();
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUserContext must be inside UserProvider');
  return ctx;
}
