import { useState } from "react";
import { Outlet } from "react-router-dom";
import { CustomSidebar } from "./custom-sidebar";
import { Header } from "./header";
import { useIsMobile } from "../hooks/use-mobile";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <CustomSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className={isMobile ? "pt-2" : ""}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
