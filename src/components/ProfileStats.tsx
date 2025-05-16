
import { User, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileStatsProps {
  name: string;
  points: number;
  avatarUrl?: string;
}

const ProfileStats = ({ name, points, avatarUrl }: ProfileStatsProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:block text-sm font-medium text-right pr-2">
        <div className="font-semibold">{name}</div>
        <div className="text-xs text-gray-500">Student</div>
      </div>
      
      <Avatar className="h-10 w-10 border-2 border-skillsprint-200">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="bg-skillsprint-100 text-skillsprint-700">
          <User size={18} />
        </AvatarFallback>
      </Avatar>
      
      <div className="flex items-center">
        <Badge variant="outline" className="flex items-center gap-1 bg-skillsprint-50 text-skillsprint-700 font-medium py-1">
          <Zap size={14} className="text-skillsprint-500" />
          <span>{points} XP</span>
        </Badge>
      </div>
    </div>
  );
};

export default ProfileStats;
