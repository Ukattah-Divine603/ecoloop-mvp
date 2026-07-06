import { createContext, useContext, useState } from "react";

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("ecoloop-history");

    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const addScan = (scan) => {
    const newScan = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      ...scan,
    };

    const updatedHistory = [newScan, ...history];

    setHistory(updatedHistory);

    localStorage.setItem("ecoloop-history", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);

    localStorage.removeItem("ecoloop-history");
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        addScan,
        clearHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useHistory() {
  return useContext(HistoryContext);
}
