
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu, X } from "lucide-react";
import { currentUser } from "@/lib/data";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
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
          <Link to="/courses" className="text-gray-700 hover:text-skillsprint-600">
            Courses
          </Link>
          <Link to="/leaderboard" className="text-gray-700 hover:text-skillsprint-600">
            Leaderboard
          </Link>
          <Link to="/hackbuddy" className="text-gray-700 hover:text-skillsprint-600">
            HackBuddy
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-skillsprint-500 rounded-full"></span>
          </Button>
          
          <div className="hidden md:flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={`https://i.pravatar.cc/150?img=3`} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">
              <span>{currentUser.name}</span>
              <div className="text-xs text-gray-500">{currentUser.points} points</div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <nav className="px-4 space-y-2">
            <Link
              to="/courses"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setShowMobileMenu(false)}
            >
              Courses
            </Link>
            <Link
              to="/leaderboard"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setShowMobileMenu(false)}
            >
              Leaderboard
            </Link>
            <Link
              to="/hackbuddy"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setShowMobileMenu(false)}
            >
              HackBuddy
            </Link>
            <div className="flex items-center space-x-2 py-2 px-4">
              <Avatar>
                <AvatarImage src={`https://i.pravatar.cc/150?img=3`} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">{currentUser.name}</div>
                <div className="text-xs text-gray-500">{currentUser.points} points</div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
