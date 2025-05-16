
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import HackathonCard from "@/components/HackathonCard";
import { hackathonsData } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HackBuddy = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Filter hackathons to upcoming and past
  const currentDate = new Date();
  const upcomingHackathons = hackathonsData.filter(
    hackathon => new Date(hackathon.date) > currentDate
  );
  const pastHackathons = hackathonsData.filter(
    hackathon => new Date(hackathon.date) <= currentDate
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
      />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">HackBuddy</h1>
            <p className="text-muted-foreground">
              Discover hackathons and apply your new skills in real challenges
            </p>
          </div>
          
          <Tabs defaultValue="upcoming">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Hackathons</TabsTrigger>
              <TabsTrigger value="past">Past Hackathons</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="pt-6">
              {upcomingHackathons.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No upcoming hackathons at the moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingHackathons.map(hackathon => (
                    <HackathonCard key={hackathon.id} hackathon={hackathon} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="pt-6">
              {pastHackathons.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No past hackathons.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastHackathons.map(hackathon => (
                    <HackathonCard key={hackathon.id} hackathon={hackathon} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default HackBuddy;
