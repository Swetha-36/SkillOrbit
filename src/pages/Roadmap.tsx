import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import AIChat from '@/components/AIChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, BookOpen, CheckCircle, Lock, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AIRoadmapGenerator from '@/components/AIRoadmapGenerator';
import DomainSelector from '@/components/DomainSelector';
import RoadmapLevelItem from '@/components/RoadmapLevelItem';
import { Button } from '@/components/ui/button';
import PaymentModal from '@/components/PaymentModal';

// Initial roadmap data
const initialRoadmapData = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Master the core web technologies",
    progress: 75,
    isFree: true,
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
    isFree: false,
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
    isFree: false,
    stages: [
      { id: 1, name: "Node.js Basics", completed: true, locked: false },
      { id: 2, name: "Express Framework", completed: false, locked: false },
      { id: 3, name: "Database Integration", completed: false, locked: true },
      { id: 4, name: "RESTful API Design", completed: false, locked: true },
      { id: 5, name: "Authentication & Security", completed: false, locked: true }
    ]
  }
];

// Domain-specific roadmaps (simplified mock data)
const domainRoadmaps: Record<string, any[]> = {
  'web-dev': initialRoadmapData,
  'backend': [
    {
      id: 4,
      title: "Backend Engineering Fundamentals",
      description: "Core concepts of server-side development",
      progress: 20,
      isFree: false,
      stages: [
        { id: 1, name: "Server Architecture", completed: true, locked: false },
        { id: 2, name: "API Development", completed: false, locked: false },
        { id: 3, name: "Database Design", completed: false, locked: false },
        { id: 4, name: "Authentication", completed: false, locked: true },
        { id: 5, name: "Deployment & DevOps", completed: false, locked: true }
      ]
    }
  ],
  'ai-ml': [
    {
      id: 5,
      title: "Machine Learning Foundations",
      description: "Core ML concepts and algorithms",
      progress: 10,
      isFree: false,
      stages: [
        { id: 1, name: "Python for ML", completed: true, locked: false },
        { id: 2, name: "Statistical Foundations", completed: false, locked: false },
        { id: 3, name: "Supervised Learning", completed: false, locked: false },
        { id: 4, name: "Deep Learning Basics", completed: false, locked: true },
        { id: 5, name: "ML Deployment", completed: false, locked: true }
      ]
    }
  ]
};

const Roadmap = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [roadmapData, setRoadmapData] = useState(initialRoadmapData);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState<number | null>(null);
  
  // Track which roadmaps have been paid for
  const [paidRoadmaps, setPaidRoadmaps] = useState<Record<number, boolean>>({});

  // Load roadmaps and payment status from localStorage on component mount
  useEffect(() => {
    const savedRoadmaps = localStorage.getItem('skillsprint-roadmaps');
    if (savedRoadmaps) {
      try {
        setRoadmapData(JSON.parse(savedRoadmaps));
      } catch (e) {
        console.error('Failed to parse saved roadmaps', e);
      }
    }
    
    const savedPaidRoadmaps = localStorage.getItem('skillsprint-paid-roadmaps');
    if (savedPaidRoadmaps) {
      try {
        setPaidRoadmaps(JSON.parse(savedPaidRoadmaps));
      } catch (e) {
        console.error('Failed to parse saved paid roadmaps', e);
      }
    }
  }, []);

  // Save roadmaps and payment status to localStorage when they change
  useEffect(() => {
    localStorage.setItem('skillsprint-roadmaps', JSON.stringify(roadmapData));
  }, [roadmapData]);
  
  useEffect(() => {
    localStorage.setItem('skillsprint-paid-roadmaps', JSON.stringify(paidRoadmaps));
  }, [paidRoadmaps]);

  const handleDomainSelect = (domainId: string) => {
    setSelectedDomain(domainId);
    if (domainRoadmaps[domainId]) {
      setRoadmapData(domainRoadmaps[domainId]);
    }
  };

  const handleRoadmapGenerated = (newRoadmap: any) => {
    setRoadmapData(prev => [newRoadmap, ...prev]);
  };

  const handleCompleteLevel = (roadmapId: number, levelId: number) => {
    setRoadmapData(prev => 
      prev.map(roadmap => {
        if (roadmap.id === roadmapId) {
          const updatedStages = roadmap.stages.map(stage => 
            stage.id === levelId ? { ...stage, completed: true } : stage
          );
          
          // Unlock the next level if it exists
          const currentLevelIndex = updatedStages.findIndex(stage => stage.id === levelId);
          if (currentLevelIndex < updatedStages.length - 1) {
            updatedStages[currentLevelIndex + 1] = {
              ...updatedStages[currentLevelIndex + 1],
              locked: false
            };
          }
          
          // Calculate new progress
          const totalLevels = updatedStages.length;
          const completedLevels = updatedStages.filter(stage => stage.completed).length;
          const newProgress = Math.round((completedLevels / totalLevels) * 100);
          
          return {
            ...roadmap,
            stages: updatedStages,
            progress: newProgress
          };
        }
        return roadmap;
      })
    );
  };
  
  const handlePaymentSuccess = () => {
    if (selectedRoadmap !== null) {
      // Update the paid status
      setPaidRoadmaps(prev => ({
        ...prev,
        [selectedRoadmap]: true
      }));
      setIsPaymentModalOpen(false);
    }
  };
  
  const handleUnlockRoadmap = (roadmapId: number) => {
    setSelectedRoadmap(roadmapId);
    setIsPaymentModalOpen(true);
  };
  
  // Check if a roadmap is paid or free
  const isRoadmapAccessible = (roadmap: any) => {
    return roadmap.isFree || paidRoadmaps[roadmap.id] === true;
  };

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
              Personalized learning paths to help you master new skills step-by-step
            </p>
          </div>
          
          {/* Domain Selector */}
          <DomainSelector onDomainSelect={handleDomainSelect} />
          
          {/* AI Roadmap Generator */}
          <AIRoadmapGenerator onRoadmapGenerated={handleRoadmapGenerated} />
          
          {/* View Growth Link */}
          <div className="mb-4 flex justify-end">
            <Button variant="link" className="text-skillsprint-600 font-medium p-0">
              View Your Growth <ArrowUpRight size={16} className="ml-1" />
            </Button>
          </div>
          
          {/* Roadmaps */}
          <div className="space-y-8">
            {roadmapData.map((roadmap) => (
              <Card key={roadmap.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold mb-1">{roadmap.title}</CardTitle>
                      <p className="text-gray-500">{roadmap.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {roadmap.isFree ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Free
                        </Badge>
                      ) : (
                        <>
                          {paidRoadmaps[roadmap.id] ? (
                            <Badge variant="outline" className="bg-skillsprint-50 text-skillsprint-700">
                              Purchased
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 flex items-center">
                              <Lock size={12} className="mr-1" /> Premium
                            </Badge>
                          )}
                        </>
                      )}
                      <Badge variant="outline" className="bg-skillsprint-50 text-skillsprint-700">
                        {roadmap.progress}% Complete
                      </Badge>
                    </div>
                  </div>
                  <Progress value={roadmap.progress} className="h-2 mt-4" />
                </CardHeader>
                
                <CardContent>
                  {isRoadmapAccessible(roadmap) ? (
                    <ul className="divide-y divide-gray-100 mt-2">
                      {roadmap.stages.map((stage, index) => (
                        <RoadmapLevelItem 
                          key={stage.id}
                          level={stage}
                          order={index + 1}
                          onComplete={(levelId) => handleCompleteLevel(roadmap.id, levelId)}
                        />
                      ))}
                    </ul>
                  ) : (
                    <div className="py-8 flex flex-col items-center justify-center">
                      <Lock size={40} className="text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Unlock {roadmap.title}</h3>
                      <p className="text-gray-500 text-center mb-4 max-w-md">
                        Continue your learning journey with advanced concepts and hands-on projects.
                      </p>
                      <Button 
                        onClick={() => handleUnlockRoadmap(roadmap.id)}
                        className="bg-skillsprint-500 hover:bg-skillsprint-600"
                      >
                        Unlock for ₹49 <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
      <AIChat />
      
      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        level={selectedRoadmap !== null ? roadmapData.find(r => r.id === selectedRoadmap)?.title || null : null}
      />
    </div>
  );
};

export default Roadmap;
