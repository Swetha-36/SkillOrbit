
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LevelItem from "@/components/LevelItem";
import { coursesData, currentUser } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [completedLevels, setCompletedLevels] = useState<number[]>(currentUser.completedLevels);
  const { toast } = useToast();

  // Find the course based on the ID from the URL
  const course = coursesData.find(c => c.id === Number(id));

  // Calculate progress
  const progress = course 
    ? (completedLevels.filter(levelId => 
        course.levels.some(level => level.id === levelId)
      ).length / course.levelCount) * 100
    : 0;

  // Handle level completion
  const handleLevelCompleted = (levelId: number) => {
    if (!completedLevels.includes(levelId)) {
      const updatedLevels = [...completedLevels, levelId];
      setCompletedLevels(updatedLevels);
      
      // In a real app, this would be an API call
      console.log(`Level ${levelId} completed!`);
    }
  };

  // Show a toast if the course is not found
  useEffect(() => {
    if (!course) {
      toast({
        title: "Course not found",
        description: "The requested course could not be found.",
        variant: "destructive",
      });
    }
  }, [course, toast]);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          isSidebarOpen={isSidebarOpen} 
        />
        <div className="flex flex-1">
          <Sidebar isOpen={isSidebarOpen} />
          <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
              <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
              <Link to="/courses">
                <Button>
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Courses
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
            <Link to="/courses" className="inline-flex items-center text-sm text-skillsprint-600 hover:text-skillsprint-700 mb-4">
              <ArrowLeft size={16} className="mr-1" />
              Back to Courses
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <h1 className="text-2xl font-bold">{course.title}</h1>
              <div className="mt-2 md:mt-0">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Progress:</span>
                  <span className="text-sm font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2 w-40 mt-1" />
              </div>
            </div>
            <p className="mt-2 text-muted-foreground">{course.description}</p>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Course Levels</h2>
            <div className="space-y-4">
              {course.levels.map((level) => (
                <LevelItem 
                  key={level.id} 
                  level={level}
                  onCompleted={handleLevelCompleted}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseDetails;
