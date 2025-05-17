
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import {
  Home,
  Map,
  BarChart,
  User,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { ThemeContext } from "@/contexts/ThemeContext";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Simplified navigation items
  const sidebarItems = [
    { path: "/dashboard", label: "Dashboard", icon: BarChart },
    { path: "/roadmap", label: "Roadmap", icon: Map },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <aside
      className={cn(
        "fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col",
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
                ? "bg-skillsprint-100 text-skillsprint-700 dark:bg-skillsprint-900 dark:text-skillsprint-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
              !isOpen && "md:justify-center"
            )}
          >
            <item.icon 
              size={20} 
              className={cn(
                !isOpen ? "mx-auto" : "mr-3",
                isActive(item.path) && "text-skillsprint-600 dark:text-skillsprint-400"
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
              <div className="ml-auto h-2 w-2 rounded-full bg-skillsprint-500 dark:bg-skillsprint-400"></div>
            )}
          </Link>
        ))}
      </nav>
      
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className={cn(
            "flex items-center w-full px-3 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
            !isOpen && "md:justify-center"
          )}
        >
          {isDarkMode ? (
            <Sun size={20} className={!isOpen ? "mx-auto" : "mr-3"} />
          ) : (
            <Moon size={20} className={!isOpen ? "mx-auto" : "mr-3"} />
          )}
          {isOpen && <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        <Link
          to="/settings"
          className={cn(
            "flex items-center px-3 py-2 mt-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
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
