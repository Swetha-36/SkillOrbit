
import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import AIChat from '@/components/AIChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, BookOpen, CheckCircle, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sample roadmap data
const roadmapData = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Master the core web technologies",
    progress: 75,
    stages: [
      { id: 1, name: "HTML Basics", completed: true, locked: false },
      { id: 2, name: "CSS Styling", completed: true, locked: false },
      { id: 3, name: "JavaScript Essentials", completed: false, locked: false },
      { id: 4, name: "Responsive Design", completed: false, locked: false },
      { id: 5, name: "Web Accessibility", completed: false, locked: true }
    ]
  },
  {
    id: 2,
    title: "React Framework",
    description: "Build modern interfaces with React",
    progress: 40,
    stages: [
      { id: 1, name: "React Fundamentals", completed: true, locked: false },
      { id: 2, name: "Component Architecture", completed: false, locked: false },
      { id: 3, name: "State Management", completed: false, locked: false },
      { id: 4, name: "Hooks in Depth", completed: false, locked: true },
      { id: 5, name: "Advanced Patterns", completed: false, locked: true }
    ]
  },
  {
    id: 3,
    title: "Backend Development",
    description: "Server-side programming and APIs",
    progress: 10,
    stages: [
      { id: 1, name: "Node.js Basics", completed: true, locked: false },
      { id: 2, name: "Express Framework", completed: false, locked: false },
      { id: 3, name: "Database Integration", completed: false, locked: true },
      { id: 4, name: "RESTful API Design", completed: false, locked: true },
      { id: 5, name: "Authentication & Security", completed: false, locked: true }
    ]
  }
];

const Roadmap = () => {
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Learning Roadmaps</h1>
            <p className="text-gray-600">
              Follow structured learning paths to master new skills step-by-step
            </p>
          </div>
          
          <div className="space-y-8">
            {roadmapData.map((roadmap) => (
              <Card key={roadmap.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold mb-1">{roadmap.title}</CardTitle>
                      <p className="text-gray-500">{roadmap.description}</p>
                    </div>
                    <Badge variant="outline" className="bg-skillsprint-50 text-skillsprint-700">
                      {roadmap.progress}% Complete
                    </Badge>
                  </div>
                  <Progress value={roadmap.progress} className="h-2 mt-4" />
                </CardHeader>
                
                <CardContent>
                  <ul className="divide-y divide-gray-100 mt-2">
                    {roadmap.stages.map((stage) => (
                      <li 
                        key={stage.id} 
                        className={`py-3 px-2 rounded-md flex justify-between items-center ${
                          stage.locked ? 'opacity-60' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          {stage.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          ) : stage.locked ? (
                            <Lock className="h-5 w-5 text-gray-400 mr-3" />
                          ) : (
                            <BookOpen className="h-5 w-5 text-skillsprint-500 mr-3" />
                          )}
                          <span className={stage.completed ? 'font-medium' : ''}>
                            {stage.name}
                          </span>
                        </div>
                        
                        {!stage.locked && (
                          <button 
                            className={`rounded-full p-1 ${
                              stage.completed 
                                ? 'text-green-500 hover:bg-green-50' 
                                : 'text-skillsprint-500 hover:bg-skillsprint-50'
                            }`}
                          >
                            <ArrowRight className="h-5 w-5" />
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
      <AIChat />
    </div>
  );
};

export default Roadmap;
