import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { MapPinIcon, BuildingIcon, HomeIcon, LandmarkIcon } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

type SidebarProps = {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function CustomSidebar({ className, isOpen, setIsOpen }: SidebarProps) {
  const [collapsed] = React.useState(false);
  const isMobile = useIsMobile();

  const sidebarWidth = collapsed ? "w-16" : "w-64";
  const sidebarClass = isMobile
    ? `fixed inset-y-0 left-0 z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out`
    : `sticky top-0 h-screen ${sidebarWidth} transition-width duration-200 ease-in-out ${
        !isOpen ? "hidden" : ""
      }`;

  const navItems = [
    {
      name: "States",
      path: "/states",
      icon: <MapPinIcon className="h-5 w-5" />,
    },
    {
      name: "Districts",
      path: "/districts",
      icon: <BuildingIcon className="h-5 w-5" />,
    },
    {
      name: "Mandals",
      path: "/mandals",
      icon: <LandmarkIcon className="h-5 w-5" />,
    },
    {
      name: "Villages",
      path: "/villages",
      icon: <HomeIcon className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-sidebar text-sidebar-foreground border-r border-sidebar-border overflow-y-auto",
          sidebarClass,
          className
        )}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1
              className={cn(
                "font-bold text-xl",
                collapsed && !isMobile ? "hidden" : ""
              )}
            >
              OTSI Entities
            </h1>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <span className="mr-3">{item.icon}</span>
                {(!collapsed || isMobile) && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
