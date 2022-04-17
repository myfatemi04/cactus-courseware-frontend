import {
    createContext,
    ReactNode,
    useState,
  } from "react";
  
  export type DrawerContextType = {
    open: boolean;
    setOpen: (open: boolean) => void
  };
  
  export const DrawerContext = createContext<DrawerContextType>({
    open: false,
    setOpen: (open: boolean) => {},
  });
  
  export function CourseContextProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
  
    return (
      <DrawerContext.Provider
        value={{
          open,
          setOpen,
        }}
      >
        {children}
      </DrawerContext.Provider>
    );
  }
  