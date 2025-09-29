import { createContext, useContext, useState } from "react";

type DarkModeContextType = {
  darkMode: boolean | undefined;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

type DarkModeProviderType = {
  children: React.ReactNode;
};

function DarkModeProvider({ children }: DarkModeProviderType) {
  const [darkMode, setDarkMode] = useState(() => {
    const storedValue = localStorage.getItem("darkMode");
    if (storedValue) {
      return storedValue === "false" ? false : true;
    }
  });

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkMode context was used outside of context provider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useDarkMode, DarkModeProvider };
