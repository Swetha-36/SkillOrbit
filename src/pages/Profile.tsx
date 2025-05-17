
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, CalendarDays, Clock, Edit, Save, Upload, User } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { currentUser } from "@/lib/data";

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: "user@example.com",
    careerGoal: "Full Stack Developer",
    bio: "Learning enthusiast passionate about web development and AI.",
    joinDate: "May 2023",
    totalHours: 247,
    completedLessons: 48,
    githubUrl: "https://github.com/username",
    linkedinUrl: "https://linkedin.com/in/username"
  });
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      // In a real app, this would send data to backend
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`flex-1 p-4 md:p-6 transition-all duration-300 dark:bg-gray-900 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 dark:text-white">My Profile</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Profile Card */}
              <Card className="col-span-1 md:row-span-2 dark:border-gray-700 dark:bg-gray-800">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="relative mb-6 group">
                    <Avatar className="h-24 w-24 border-2 border-skillsprint-200 dark:border-skillsprint-800">
                      <AvatarImage src={`https://i.pravatar.cc/150?img=3`} alt={profileData.name} />
                      <AvatarFallback className="text-2xl">{profileData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button size="sm" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0">
                        <Upload className="h-4 w-4" />
                        <span className="sr-only">Upload avatar</span>
                      </Button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <Input 
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      className="text-center font-semibold mb-2"
                    />
                  ) : (
                    <h2 className="text-xl font-semibold mb-2 dark:text-white">{profileData.name}</h2>
                  )}
                  
                  <div className="text-sm text-gray-500 mb-6 dark:text-gray-400">{profileData.email}</div>
                  
                  {isEditing ? (
                    <Input 
                      name="careerGoal"
                      value={profileData.careerGoal}
                      onChange={handleChange}
                      className="mb-4 text-center"
                    />
                  ) : (
                    <div className="bg-skillsprint-50 text-skillsprint-800 text-sm font-medium px-3 py-1 rounded-full mb-4 dark:bg-skillsprint-900/30 dark:text-skillsprint-300">
                      {profileData.careerGoal}
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleEditToggle} 
                    variant={isEditing ? "default" : "outline"} 
                    className="w-full"
                  >
                    {isEditing ? (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Profile
                      </>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" /> Edit Profile
                      </>
                    )}
                  </Button>
                  
                  {/* Account info */}
                  <div className="w-full mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 text-gray-500 mr-2 dark:text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">Joined</span>
                      </div>
                      <span className="text-sm font-medium dark:text-gray-300">{profileData.joinDate}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-2 dark:text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">Learning hours</span>
                      </div>
                      <span className="text-sm font-medium dark:text-gray-300">{profileData.totalHours}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-gray-500 mr-2 dark:text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">Completed</span>
                      </div>
                      <span className="text-sm font-medium dark:text-gray-300">{profileData.completedLessons} lessons</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Account Details Card */}
              <Card className="col-span-1 md:col-span-2 dark:border-gray-700 dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg dark:text-white">Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Bio</label>
                    {isEditing ? (
                      <Input 
                        name="bio"
                        value={profileData.bio}
                        onChange={handleChange}
                        className="w-full"
                      />
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{profileData.bio}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">GitHub URL</label>
                      {isEditing ? (
                        <Input 
                          name="githubUrl"
                          value={profileData.githubUrl}
                          onChange={handleChange}
                        />
                      ) : (
                        <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-skillsprint-600 hover:underline dark:text-skillsprint-400">
                          {profileData.githubUrl}
                        </a>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">LinkedIn URL</label>
                      {isEditing ? (
                        <Input 
                          name="linkedinUrl"
                          value={profileData.linkedinUrl}
                          onChange={handleChange}
                        />
                      ) : (
                        <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-skillsprint-600 hover:underline dark:text-skillsprint-400">
                          {profileData.linkedinUrl}
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Activity Card */}
              <Card className="col-span-1 md:col-span-2 dark:border-gray-700 dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg dark:text-white">Learning Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="progress">
                    <TabsList className="mb-4">
                      <TabsTrigger value="progress">Progress</TabsTrigger>
                      <TabsTrigger value="achievements">Achievements</TabsTrigger>
                      <TabsTrigger value="certificates">Certificates</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="progress">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium dark:text-gray-300">Frontend Development</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">65%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                            <div className="h-full bg-skillsprint-500 rounded-full dark:bg-skillsprint-600" style={{width: "65%"}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium dark:text-gray-300">Backend Development</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">40%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                            <div className="h-full bg-skillsprint-500 rounded-full dark:bg-skillsprint-600" style={{width: "40%"}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium dark:text-gray-300">DevOps</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">20%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                            <div className="h-full bg-skillsprint-500 rounded-full dark:bg-skillsprint-600" style={{width: "20%"}}></div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="achievements">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border rounded-md p-3 flex items-center space-x-3 dark:border-gray-700">
                          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center dark:bg-yellow-900/30">
                            <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium dark:text-gray-200">Fast Learner</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Completed 5 lessons in one day</p>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-3 flex items-center space-x-3 dark:border-gray-700">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
                            <User className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium dark:text-gray-200">Profile Complete</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Filled all profile information</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="certificates">
                      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                        <p>Complete a roadmap to earn certificates</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
