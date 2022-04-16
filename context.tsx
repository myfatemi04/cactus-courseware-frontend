import { createContext, ReactNode, useContext, useState } from "react";

const ProgressContext = createContext({
  progress: 0,
  setProgress: (n: number) => {},
});

export function ProgressContextProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        setProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function ProgressBar() {
  const progressContext = useContext(ProgressContext);

  const { progress, setProgress } = progressContext;

  return <>Progress: {progress}</>;
}

export function App() {
  return (
    <ProgressContextProvider>
      <ProgressBar />
    </ProgressContextProvider>
  );
}
