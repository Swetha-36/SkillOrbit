
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-skillsprint-100 to-skillsprint-200 pattern-bg">
            <div className="container mx-auto px-4 py-16 md:py-24">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-6 gradient-heading">
                  Accelerate Your Skills with SkillSprint
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                  Master new technologies through structured learning paths, earn points, and connect with hackathons.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    className="text-white bg-skillsprint-600 hover:bg-skillsprint-700 px-6 py-6"
                    onClick={() => navigate("/courses")}
                  >
                    Explore Courses
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-skillsprint-600 text-skillsprint-600 hover:bg-skillsprint-50 px-6 py-6"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 gradient-heading">
                What Makes SkillSprint Different
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-skillsprint-100 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-skillsprint-600">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Structured Courses</h3>
                  <p className="text-gray-600">
                    Learn through carefully crafted roadmaps with curated resources at each level.
                  </p>
                </div>
                
                <div className="p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-skillsprint-100 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-skillsprint-600">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Earn Points & Rewards</h3>
                  <p className="text-gray-600">
                    Earn points as you complete levels and quizzes, climb the leaderboard and track your progress.
                  </p>
                </div>
                
                <div className="p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-skillsprint-100 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-skillsprint-600">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Connect with Hackathons</h3>
                  <p className="text-gray-600">
                    Apply your skills in real-world hackathons and coding challenges with our HackBuddy feature.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-skillsprint-800 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-skillsprint-100">
                Join SkillSprint today and unlock your full potential with our interactive learning platform.
              </p>
              <Button 
                onClick={() => navigate("/signup")}
                className="bg-white text-skillsprint-800 hover:bg-skillsprint-100 px-8 py-6"
              >
                Sign Up Now - It's Free
              </Button>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <h2 className="font-bold text-xl gradient-heading mb-2">SkillSprint</h2>
                <p className="text-gray-600 text-sm">
                  © {new Date().getFullYear()} SkillSprint. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
