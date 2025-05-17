
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Flame, Zap } from "lucide-react";
import { currentUser } from "@/lib/data";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
  const location = useLocation();
  const streakDays = 8; // Sample data - this would come from your user data
  const isLongStreak = streakDays > 7; // Check if streak is longer than 7 days

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/roadmap", label: "Roadmap" },
    { path: "/courses", label: "Courses" },
    { path: "/leaderboard", label: "Leaderboard" },
    { path: "/hackbuddy", label: "HackBuddy" },
    { path: "/profile", label: "Profile" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-skillsprint-700 dark:text-skillsprint-400">
              SkillSprint
            </span>
          </Link>
        </div>

        {/* Modern Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md font-medium transition-colors relative ${
                isActive(item.path)
                  ? "text-skillsprint-700 dark:text-skillsprint-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-skillsprint-600 dark:hover:text-skillsprint-300"
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-skillsprint-500 dark:bg-skillsprint-400"></span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Streak Counter */}
          <div className="hidden md:flex items-center rounded-full bg-orange-50 dark:bg-orange-900/30 px-3 py-1.5 text-sm font-medium">
            <Flame className={`mr-1 h-4 w-4 ${isLongStreak ? 'text-yellow-500' : 'text-orange-500'}`} />
            <span className={`${isLongStreak ? 'text-yellow-600 dark:text-yellow-400' : 'text-orange-700 dark:text-orange-400'}`}>
              {streakDays}-day streak
            </span>
          </div>

          {/* XP Points */}
          <div className="hidden md:flex items-center rounded-full bg-skillsprint-50 dark:bg-skillsprint-900/30 px-3 py-1.5 text-sm font-medium">
            <Zap className="mr-1 h-4 w-4 text-skillsprint-500 dark:text-skillsprint-400" />
            <span className="text-skillsprint-700 dark:text-skillsprint-300">{currentUser.points} XP</span>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-skillsprint-500 rounded-full"></span>
          </Button>
          
          <Link to="/profile" className="hidden md:flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={`https://i.pravatar.cc/150?img=3`} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">
              <span className="dark:text-gray-200">{currentUser.name}</span>
              <div className="text-xs text-gray-500 dark:text-gray-400">{currentUser.points} points</div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
