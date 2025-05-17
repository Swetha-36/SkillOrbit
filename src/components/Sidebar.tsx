
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Map,
  User,
  MessageSquare,
  Moon,
  Sun,
} from "lucide-react";
import { useState, useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage or default to light
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Simplified navigation items as requested
  const sidebarItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/roadmap", label: "Roadmap", icon: Map },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <aside
      className={cn(
        "fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 flex flex-col dark:bg-gray-900 dark:border-gray-700",
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
                ? "bg-skillsprint-100 text-skillsprint-700 dark:bg-gray-800 dark:text-skillsprint-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
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
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className={cn(
            "flex items-center w-full px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:bg-gray-800",
            !isOpen && "md:justify-center"
          )}
        >
          {isDark ? (
            <Sun size={20} className={!isOpen ? "mx-auto" : "mr-3"} />
          ) : (
            <Moon size={20} className={!isOpen ? "mx-auto" : "mr-3"} />
          )}
          {isOpen && <span>{isDark ? "Light Mode" : "Dark Mode"}</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
