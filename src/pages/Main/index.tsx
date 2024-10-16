import React, { createContext, useContext, ReactNode } from "react";

import { Sidebar } from "@Components/ui/Sidebar";
import Header from "@Components/ui/Header";

interface MainLayoutContextProps {
  moduleName: string;
  setModuleName: (name: string) => void;
}

const MainLayoutContext = createContext<MainLayoutContextProps | undefined>(
  undefined
);

export const useMainLayout = () => {
  const context = useContext(MainLayoutContext);
  if (!context) {
    throw new Error("useMainLayout must be used within a MainLayoutProvider");
  }
  return context;
};

interface MainLayoutProviderProps {
  children: ReactNode;
}

export const MainLayoutProvider: React.FC<MainLayoutProviderProps> = ({
  children,
}) => {
  const [moduleName, setModuleName] = React.useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <MainLayoutContext.Provider value={{ moduleName, setModuleName }}>
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <div className="flex flex-col flex-1 bg-gray-100">
          <Header moduleName={moduleName} onToggleSidebar={toggleSidebar} />

          <div className="flex-1 overflow-auto p-6">{children}</div>
        </div>
      </div>
    </MainLayoutContext.Provider>
  );
};
