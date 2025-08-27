import { useState } from "react";
import { AppContext } from "./AppContext";

export function AppProvider({ children }) {
  const [showModal, setShowModal] = useState(null);
    
  return (
    <AppContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </AppContext.Provider>
  );
}
