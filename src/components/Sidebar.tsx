
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  BookOpen,
  Award,
  BarChart,
  Calendar,
  Settings,
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
    { path: "/dashboard", label: "Dashboard", icon: BarChart },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/leaderboard", label: "Leaderboard", icon: Award },
    { path: "/hackbuddy", label: "HackBuddy", icon: Calendar },
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
              "flex items-center px-3 py-2 rounded-md transition-colors",
              isActive(item.path)
                ? "bg-skillsprint-100 text-skillsprint-700"
                : "text-gray-700 hover:bg-gray-100",
              !isOpen && "md:justify-center"
            )}
          >
            <item.icon size={20} className={!isOpen ? "mx-auto" : ""} />
            {isOpen && <span className="ml-3">{item.label}</span>}
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
          <Settings size={20} className={!isOpen ? "mx-auto" : ""} />
          {isOpen && <span className="ml-3">Settings</span>}
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
