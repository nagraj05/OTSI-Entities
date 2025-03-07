import { Outlet } from "react-router-dom";
import { CustomSidebar } from "./custom-sidebar";
import { Button } from "./ui/button";
import { PanelLeftIcon } from "lucide-react";
import React from "react";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="flex min-h-screen">
      <CustomSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <header className="bg-primary text-primary-foreground h-14 flex items-center px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground mr-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <PanelLeftIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
          <h1 className="text-xl font-semibold">OTSI Entities</h1>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
