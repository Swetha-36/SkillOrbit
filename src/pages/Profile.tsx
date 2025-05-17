
import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import AIChat from '@/components/AIChat';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, Award, Clock3, PenLine, Upload, Save } from 'lucide-react';
import { userProgressData, currentUser } from "@/lib/data";

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: currentUser.name || 'User',
    email: currentUser.email || 'user@example.com',
    goal: 'Become a Full Stack Developer',
    avatarUrl: '/placeholder.svg',
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save data to backend
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this file to your storage
      // For now, we'll just create a local URL
      const url = URL.createObjectURL(file);
      setUserData({ ...userData, avatarUrl: url });
    }
  };

  // Mock data for stats
  const stats = [
    { label: 'Hours Learned', value: '42', icon: Clock3 },
    { label: 'Daily Streak', value: '7', icon: Calendar },
    { label: 'Total XP', value: currentUser.points.toString(), icon: Award },
  ];

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
            <h1 className="text-3xl font-bold mb-2">Profile</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account and see your progress
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <div className="flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <PenLine size={18} />
                  </Button>
                </div>
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userData.avatarUrl} />
                      <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <label 
                        htmlFor="avatar-upload" 
                        className="absolute bottom-0 right-0 bg-skillsprint-500 text-white rounded-full p-1 cursor-pointer"
                      >
                        <Upload size={16} />
                        <input 
                          id="avatar-upload" 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>
                </div>
                <CardTitle>{!isEditing ? userData.name : 
                  <Input 
                    name="name"
                    value={userData.name} 
                    onChange={handleChange} 
                    className="text-center" 
                  />
                }</CardTitle>
                <CardDescription>{userData.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Learning Goal</label>
                    {!isEditing ? (
                      <p className="text-gray-600 dark:text-gray-400">{userData.goal}</p>
                    ) : (
                      <Input 
                        name="goal"
                        value={userData.goal} 
                        onChange={handleChange} 
                      />
                    )}
                  </div>
                  
                  {isEditing && (
                    <Button 
                      className="w-full" 
                      onClick={handleSave}
                    >
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </Button>
                  )}
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium mb-3">Stats</h3>
                    <div className="space-y-3">
                      {stats.map((stat, index) => (
                        <div key={index} className="flex items-center">
                          <div className="p-2 bg-skillsprint-100 dark:bg-skillsprint-900 rounded-md mr-3">
                            <stat.icon size={16} className="text-skillsprint-500 dark:text-skillsprint-400" />
                          </div>
                          <div>
                            <p className="font-medium">{stat.value}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity and Progress */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Track your overall progress and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Overall Progress</h3>
                      <span className="text-sm font-medium">
                        {totalCompletedLevels}/{totalLevels} Levels
                      </span>
                    </div>
                    <Progress 
                      value={(totalCompletedLevels / totalLevels) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Courses In Progress</h3>
                    <div className="space-y-3">
                      {userProgressData.map((course) => (
                        <div key={course.courseId} className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{course.courseTitle}</h4>
                            <Badge variant="outline">
                              {course.progressPercentage}% Complete
                            </Badge>
                          </div>
                          <Progress value={course.progressPercentage} className="h-1.5 mb-2" />
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {course.completedLevels} of {course.totalLevels} levels completed
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Achievements</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { name: 'First Lesson', unlocked: true },
                        { name: 'Quiz Master', unlocked: true },
                        { name: '7-Day Streak', unlocked: true },
                        { name: 'Level 10', unlocked: false },
                        { name: 'Roadmap Expert', unlocked: false },
                        { name: 'All-Star Learner', unlocked: false },
                      ].map((achievement, index) => (
                        <div 
                          key={index} 
                          className={`p-3 rounded-md text-center ${
                            achievement.unlocked 
                              ? 'bg-skillsprint-100 dark:bg-skillsprint-900 text-skillsprint-600 dark:text-skillsprint-300' 
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                          }`}
                        >
                          <p className="text-sm font-medium">{achievement.name}</p>
                          <p className="text-xs mt-1">
                            {achievement.unlocked ? 'Unlocked' : 'Locked'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <AIChat />
    </div>
  );
};

export default Profile;
