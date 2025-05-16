
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { LeaderboardEntry } from "@/lib/types";
import { currentUser } from "@/lib/data";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16 text-center">Rank</TableHead>
          <TableHead>Student</TableHead>
          <TableHead className="text-right">Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => {
          const isCurrentUser = entry.id === currentUser.id;
          
          return (
            <TableRow 
              key={entry.id}
              className={isCurrentUser ? "bg-skillsprint-50" : ""}
            >
              <TableCell className="text-center font-medium">
                {entry.rank === 1 && (
                  <div className="flex justify-center">
                    <Trophy size={18} className="text-yellow-500" />
                  </div>
                )}
                {entry.rank === 2 && (
                  <div className="flex justify-center">
                    <Trophy size={18} className="text-gray-400" />
                  </div>
                )}
                {entry.rank === 3 && (
                  <div className="flex justify-center">
                    <Trophy size={18} className="text-amber-700" />
                  </div>
                )}
                {entry.rank > 3 && (
                  <span>{entry.rank}</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={entry.avatarUrl} />
                    <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium flex items-center">
                      {entry.name}
                      {isCurrentUser && (
                        <Badge variant="outline" className="ml-2 text-xs">You</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">
                {entry.points}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default LeaderboardTable;
