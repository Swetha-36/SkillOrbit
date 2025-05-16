
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LeaderboardTable from "@/components/LeaderboardTable";
import { leaderboardData } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Leaderboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
      />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
          <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-amber-100 to-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-amber-800">1st Place</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      src={leaderboardData[0].avatarUrl}
                      alt={leaderboardData[0].name}
                      className="w-12 h-12 rounded-full border-2 border-amber-400"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-semibold text-amber-900">{leaderboardData[0].name}</p>
                    <p className="text-amber-800">{leaderboardData[0].points} points</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-gray-100 to-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">2nd Place</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      src={leaderboardData[1].avatarUrl}
                      alt={leaderboardData[1].name}
                      className="w-12 h-12 rounded-full border-2 border-gray-400"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-semibold text-gray-700">{leaderboardData[1].name}</p>
                    <p className="text-gray-600">{leaderboardData[1].points} points</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-amber-50 to-amber-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-amber-700">3rd Place</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      src={leaderboardData[2].avatarUrl}
                      alt={leaderboardData[2].name}
                      className="w-12 h-12 rounded-full border-2 border-amber-700"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-semibold text-amber-800">{leaderboardData[2].name}</p>
                    <p className="text-amber-700">{leaderboardData[2].points} points</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <LeaderboardTable entries={leaderboardData} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Leaderboard;
