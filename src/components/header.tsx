import { MenuIcon } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100 mr-3"
            aria-label="Toggle sidebar"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold">OTSI Entities</h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* Add any header actions here if needed */}
        </div>
      </div>
    </header>
  );
} 