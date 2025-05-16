
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  BookOpen,
  Award,
  BarChart,
  Calendar,
  Settings,
  Map,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const sidebarItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/roadmap", label: "Roadmap", icon: Map },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/leaderboard", label: "Leaderboard", icon: Award },
    { path: "/hackbuddy", label: "HackBuddy", icon: Calendar },
    { path: "/dashboard", label: "Dashboard", icon: BarChart },
  ];

  return (
    <aside
      className={cn(
        "fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-0 -translate-x-full md:translate-x-0 md:w-16"
      )}
    >
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center px-3 py-2 rounded-md transition-all duration-200",
              isActive(item.path)
                ? "bg-skillsprint-100 text-skillsprint-700"
                : "text-gray-700 hover:bg-gray-100",
              !isOpen && "md:justify-center"
            )}
          >
            <item.icon 
              size={20} 
              className={cn(
                !isOpen ? "mx-auto" : "mr-3",
                isActive(item.path) && "text-skillsprint-600"
              )} 
            />
            {isOpen && (
              <span className={cn(
                "transition-opacity duration-200",
                isActive(item.path) ? "font-medium" : ""
              )}>
                {item.label}
              </span>
            )}
            
            {isActive(item.path) && isOpen && (
              <div className="ml-auto h-2 w-2 rounded-full bg-skillsprint-500"></div>
            )}
          </Link>
        ))}
      </nav>
      
      <div className="p-3 border-t border-gray-200">
        <Link
          to="/settings"
          className={cn(
            "flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors",
            !isOpen && "md:justify-center"
          )}
        >
          <Settings size={20} className={!isOpen ? "mx-auto" : "mr-3"} />
          {isOpen && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
