/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const TestSessionContext = createContext(null);

export function TestSessionProvider({ children }) {
  const [sessions, setSessions] = useState({});

  const value = useMemo(
    () => ({
      sessions,
      setSessionState: (sessionId, updater) => {
        setSessions((prev) => {
          const previousState = prev[sessionId] || {};
          const nextState =
            typeof updater === "function" ? updater(previousState) : updater;

          return {
            ...prev,
            [sessionId]: nextState,
          };
        });
      },
      clearSession: (sessionId) => {
        setSessions((prev) => {
          if (!prev[sessionId]) return prev;
          const cloned = { ...prev };
          delete cloned[sessionId];
          return cloned;
        });
      },
    }),
    [sessions],
  );

  return (
    <TestSessionContext.Provider value={value}>
      {children}
    </TestSessionContext.Provider>
  );
}

export function useTestSession() {
  const context = useContext(TestSessionContext);
  if (!context) {
    throw new Error("useTestSession must be used within TestSessionProvider");
  }
  return context;
}
