
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Flame, Menu, X, Zap, MessageSquare } from "lucide-react";
import { currentUser } from "@/lib/data";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const streakDays = 8; // Sample data - this would come from your user data
  const isLongStreak = streakDays > 7; // Check if streak is longer than 7 days

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
    }

    // Add event listener to track theme changes from sidebar
    const handleStorageChange = () => {
      const currentTheme = localStorage.getItem("theme");
      setIsDark(currentTheme === "dark");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Simplified navigation items
  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/roadmap", label: "Roadmap" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 dark:bg-gray-900 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link to="/" className="ml-4 flex items-center">
            <span className="text-xl font-bold gradient-heading">
              SkillSprint
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className="text-gray-700 hover:text-skillsprint-600 dark:text-gray-300 dark:hover:text-skillsprint-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Streak Counter */}
          <div className="hidden md:flex items-center rounded-full bg-orange-50 px-3 py-1.5 text-sm font-medium dark:bg-orange-900/30">
            <Flame className={`mr-1 h-4 w-4 ${isLongStreak ? 'text-yellow-500' : 'text-orange-500'}`} />
            <span className={`${isLongStreak ? 'text-yellow-600 dark:text-yellow-400' : 'text-orange-700 dark:text-orange-400'}`}>
              {streakDays}-day streak
            </span>
          </div>

          {/* XP Points */}
          <div className="hidden md:flex items-center rounded-full bg-skillsprint-50 px-3 py-1.5 text-sm font-medium dark:bg-skillsprint-900/30">
            <Zap className="mr-1 h-4 w-4 text-skillsprint-500 dark:text-skillsprint-400" />
            <span className="text-skillsprint-700 dark:text-skillsprint-400">{currentUser.points} XP</span>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} className="dark:text-gray-300" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-skillsprint-500 rounded-full dark:bg-skillsprint-400"></span>
          </Button>
          
          {/* Chat button */}
          <Button variant="ghost" size="icon" className="relative md:hidden">
            <MessageSquare size={20} className="dark:text-gray-300" />
          </Button>
          
          <div className="hidden md:flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={`https://i.pravatar.cc/150?img=3`} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium dark:text-gray-300">
              <span>{currentUser.name}</span>
              <div className="text-xs text-gray-500 dark:text-gray-400">{currentUser.points} points</div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2 dark:bg-gray-900 dark:border-gray-700">
          <nav className="px-4 space-y-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => setShowMobileMenu(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Streak Counter */}
            <div className="flex items-center py-2 px-4">
              <div className="flex items-center rounded-full bg-orange-50 px-3 py-1.5 text-sm font-medium dark:bg-orange-900/30">
                <Flame className={`mr-1 h-4 w-4 ${isLongStreak ? 'text-yellow-500' : 'text-orange-500'}`} />
                <span className={`${isLongStreak ? 'text-yellow-600 dark:text-yellow-400' : 'text-orange-700 dark:text-orange-400'}`}>
                  {streakDays}-day streak
                </span>
              </div>
            </div>
            
            {/* Mobile XP Points */}
            <div className="flex items-center py-2 px-4">
              <div className="flex items-center rounded-full bg-skillsprint-50 px-3 py-1.5 text-sm font-medium dark:bg-skillsprint-900/30">
                <Zap className="mr-1 h-4 w-4 text-skillsprint-500 dark:text-skillsprint-400" />
                <span className="text-skillsprint-700 dark:text-skillsprint-400">{currentUser.points} XP</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 py-2 px-4">
              <Avatar>
                <AvatarImage src={`https://i.pravatar.cc/150?img=3`} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium dark:text-gray-300">{currentUser.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{currentUser.points} points</div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
