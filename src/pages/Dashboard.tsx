
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, CheckCircle, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ProgressChart from "@/components/ProgressChart";
import { userProgressData, currentUser } from "@/lib/data";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Calculate total completed levels across all courses
  const totalCompletedLevels = userProgressData.reduce(
    (acc, course) => acc + course.completedLevels,
    0
  );

  // Calculate total levels across all courses
  const totalLevels = userProgressData.reduce(
    (acc, course) => acc + course.totalLevels,
    0
  );

  // Calculate total completion percentage
  const overallProgressPercentage = 
    totalLevels > 0 
      ? Math.round((totalCompletedLevels / totalLevels) * 100) 
      : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                  <CardDescription>Your earned points</CardDescription>
                </div>
                <Award className="h-5 w-5 text-skillsprint-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentUser.points}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">Completed Levels</CardTitle>
                  <CardDescription>Your progress</CardDescription>
                </div>
                <CheckCircle className="h-5 w-5 text-skillsprint-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCompletedLevels}/{totalLevels}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                  <CardDescription>Across all courses</CardDescription>
                </div>
                <BookOpen className="h-5 w-5 text-skillsprint-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallProgressPercentage}%</div>
                <Progress value={overallProgressPercentage} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>
          
          {/* Progress Chart */}
          <div className="mb-8">
            <ProgressChart progressData={userProgressData} />
          </div>
          
          {/* Course Progress List */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
            <div className="space-y-4">
              {userProgressData.map((course) => (
                <Link to={`/courses/${course.courseId}`} key={course.courseId}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{course.courseTitle}</h3>
                          <p className="text-sm text-muted-foreground">
                            {course.completedLevels} of {course.totalLevels} levels completed
                          </p>
                          <Progress 
                            value={course.progressPercentage} 
                            className="h-2 mt-2 w-64" 
                          />
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold text-skillsprint-600 mr-2">
                            {course.progressPercentage}%
                          </span>
                          <ChevronRight size={20} className="text-gray-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
