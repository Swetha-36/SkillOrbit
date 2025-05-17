import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, Code, FileText, Youtube, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FullStackRoadmapProps {
  onUnlockLevel?: (level: string) => void;
}

const FullStackRoadmap: React.FC<FullStackRoadmapProps> = ({ onUnlockLevel }) => {
  const [paidLevels, setPaidLevels] = useState<Record<string, boolean>>({});
  
  // Check which levels are paid for
  useEffect(() => {
    const storedPaidLevels = localStorage.getItem('paidLevels');
    if (storedPaidLevels) {
      setPaidLevels(JSON.parse(storedPaidLevels));
    }
  }, []);

  // Determine if a level is accessible
  const isLevelAccessible = (level: string) => {
    if (level === 'beginner') return true;
    return paidLevels[level] === true;
  };

  const handleUnlockClick = (level: string) => {
    if (onUnlockLevel) {
      onUnlockLevel(level);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Full Stack Web Development Roadmap</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          This comprehensive roadmap guides you through becoming a proficient full-stack web developer,
          from basic concepts to advanced techniques using free and accessible resources.
        </p>
      </div>

      <Tabs defaultValue="beginner" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">
            Intermediate
            {!isLevelAccessible('intermediate') && <Lock size={14} className="ml-1" />}
          </TabsTrigger>
          <TabsTrigger value="advanced">
            Advanced
            {!isLevelAccessible('advanced') && <Lock size={14} className="ml-1" />}
          </TabsTrigger>
        </TabsList>

        {/* Beginner Level - Always accessible */}
        <TabsContent value="beginner" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="outline" className="mb-2 bg-green-50 text-green-700 border-green-200">
                    Beginner Level
                  </Badge>
                  <CardTitle className="text-2xl">Web Development Fundamentals</CardTitle>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Clock size={18} className="mr-1" />
                  <span>Estimated: 4-6 weeks</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Concepts to Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>HTML structure and semantic elements</li>
                    <li>CSS styling, selectors, and layouts</li>
                    <li>CSS Flexbox and Grid</li>
                    <li>JavaScript fundamentals and DOM manipulation</li>
                    <li>Responsive design principles</li>
                  </ul>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Git basics and GitHub workflow</li>
                    <li>Command line basics</li>
                    <li>Browser developer tools</li>
                    <li>Web accessibility fundamentals</li>
                    <li>Basic deployment (GitHub Pages)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Free Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gray-50 dark:bg-gray-800 border">
                    <CardContent className="pt-4">
                      <div className="flex items-start">
                        <Youtube className="text-red-600 mr-2 flex-shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="font-medium">HTML & CSS Crash Course</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">freeCodeCamp - 11 hours</p>
                          <a href="https://www.youtube.com/watch?v=mU6anWqZJcc" target="_blank" rel="noopener noreferrer" className="text-sm text-skillsprint-600 hover:underline">
                            Watch Tutorial
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 dark:bg-gray-800 border">
                    <CardContent className="pt-4">
                      <div className="flex items-start">
                        <FileText className="text-blue-600 mr-2 flex-shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="font-medium">JavaScript.info</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive resource</p>
                          <a href="https://javascript.info/" target="_blank" rel="noopener noreferrer" className="text-sm text-skillsprint-600 hover:underline">
                            Access Resource
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 dark:bg-gray-800 border">
                    <CardContent className="pt-4">
                      <div className="flex items-start">
                        <Code className="text-green-600 mr-2 flex-shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="font-medium">Web Development Course</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">The Odin Project</p>
                          <a href="https://www.theodinproject.com/paths/foundations" target="_blank" rel="noopener noreferrer" className="text-sm text-skillsprint-600 hover:underline">
                            Start Learning
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 dark:bg-gray-800 border">
                    <CardContent className="pt-4">
                      <div className="flex items-start">
                        <BookOpen className="text-purple-600 mr-2 flex-shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="font-medium">MDN Web Docs</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Reference documentation</p>
                          <a href="https://developer.mozilla.org/en-US/" target="_blank" rel="noopener noreferrer" className="text-sm text-skillsprint-600 hover:underline">
                            Explore Documentation
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Projects & Challenges</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-1">Personal Portfolio</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Create a responsive portfolio showcasing your projects with HTML, CSS, and basic JavaScript.
                      </p>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">HTML</Badge>
                      <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200 ml-2">CSS</Badge>
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 ml-2">JS</Badge>
                    </CardContent>
                  </Card>
                  <Card className="border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-1">Quiz Application</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Build a simple quiz with score tracking using JavaScript DOM manipulation.
                      </p>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">HTML</Badge>
                      <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200 ml-2">CSS</Badge>
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 ml-2">JS</Badge>
                    </CardContent>
                  </Card>
                  <Card className="border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-1">Landing Page Clone</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Recreate a popular website landing page with responsive design principles.
                      </p>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">HTML</Badge>
                      <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200 ml-2">CSS</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Knowledge Check Quiz</h3>
                <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="font-medium mb-2">1. Which CSS property is used to create space between the content and border of an element?</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <Button variant="outline" className="justify-start hover:bg-skillsprint-100">A. margin</Button>
                      <Button variant="outline" className="justify-start hover:bg-skillsprint-100">B. padding</Button>
                      <Button variant="outline" className="justify-start hover:bg-skillsprint-100">C. spacing</Button>
                      <Button variant="outline" className="justify-start hover:bg-skillsprint-100">D. border-spacing</Button>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-2">2. Which of the following is NOT a semantic HTML element?</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <Button variant="outline" className="justify-start hover:bg-skillsprint-100">A. &lt;article&gt;</Button>
                      <Button variant="outline" className="justify-start hover:bg-skillsprint-100">B. &lt;section&gt;</Button>
                      <Button variant="outline" className="justify-start hover:bg-skillsprint-100">C. &lt;header&gt;</Button>
                      <Button variant="outline" className="justify-start hover:bg-skillsprint-100">D. &lt;div&gt;</Button>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-2">3. How do you select an element with the class "header" in CSS?</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <Button variant="outline" className="justify-start hover:bg-skillsprint-100">A. #header</Button>
                      <Button variant="outline" className="justify-start hover:bg-skillsprint-100">B. .header</Button>
                      <Button variant="outline" className="justify-start hover:bg-skillsprint-100">C. header</Button>
                      <Button variant="outline" className="justify-start hover:bg-skillsprint-100">D. *header</Button>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                    <p>Answers: 1-B, 2-D, 3-B</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Tips Before Starting</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Focus on understanding core concepts before memorizing syntax</li>
                  <li>Practice coding daily, even if just for 30 minutes</li>
                  <li>Build small projects as you learn each concept</li>
                  <li>Use browser developer tools to experiment and debug</li>
                  <li>Join web development communities like freeCodeCamp forums or r/webdev</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Intermediate Level - Requires payment */}
        <TabsContent value="intermediate" className="space-y-6">
          {isLevelAccessible('intermediate') ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700 border-blue-200">
                      Intermediate Level
                    </Badge>
                    <CardTitle className="text-2xl">Frontend & Backend Frameworks</CardTitle>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Clock size={18} className="mr-1" />
                    <span>Estimated: 8-10 weeks</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Concepts to Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>JavaScript ES6+ features</li>
                      <li>React.js or Vue.js fundamentals</li>
                      <li>State management</li>
                      <li>Frontend routing</li>
                      <li>API integration and Fetch/Axios</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Node.js basics</li>
                      <li>Express.js framework</li>
                      <li>RESTful API design</li>
                      <li>Database basics (MongoDB or SQL)</li>
                      <li>Authentication fundamentals</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Resources section would continue in a similar format</h3>
                  <div className="text-center py-4">
                    <Badge variant="outline" className="mb-2">Preview</Badge>
                    <p className="text-gray-500 dark:text-gray-400">
                      The intermediate section includes resources for learning React, Node.js, Express, databases, and building full-stack applications.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Lock size={64} className="text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold mb-2 text-center">Unlock Intermediate Level</h2>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
                  Continue your learning journey by unlocking the Intermediate Level for just ₹49. Get access to frontend and backend frameworks, API integration, and more.
                </p>
                <Button 
                  onClick={() => handleUnlockClick('intermediate')}
                  className="bg-skillsprint-500 hover:bg-skillsprint-600 text-white"
                >
                  Unlock for ₹49
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Advanced Level - Requires payment */}
        <TabsContent value="advanced" className="space-y-6">
          {isLevelAccessible('advanced') ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="mb-2 bg-purple-50 text-purple-700 border-purple-200">
                      Advanced Level
                    </Badge>
                    <CardTitle className="text-2xl">Mastering Full Stack Development</CardTitle>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Clock size={18} className="mr-1" />
                    <span>Estimated: 12-16 weeks</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Concepts to Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Advanced React patterns</li>
                      <li>Performance optimization</li>
                      <li>TypeScript</li>
                      <li>GraphQL</li>
                      <li>Testing (Jest, React Testing Library)</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Microservices architecture</li>
                      <li>CI/CD pipelines</li>
                      <li>Docker and containerization</li>
                      <li>Cloud deployment (AWS/GCP/Azure)</li>
                      <li>Security best practices</li>
                    </ul>
                  </div>
                </div>
                
                <div className="text-center py-4">
                  <Badge variant="outline" className="mb-2">Preview</Badge>
                  <p className="text-gray-500 dark:text-gray-400">
                    The advanced section covers topics like TypeScript, GraphQL, testing, microservices, containerization, and cloud deployment.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Lock size={64} className="text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold mb-2 text-center">Unlock Advanced Level</h2>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
                  Master Full Stack Development with advanced concepts, TypeScript, GraphQL, testing, and cloud deployment techniques for just ₹49.
                </p>
                <Button 
                  onClick={() => handleUnlockClick('advanced')}
                  className="bg-skillsprint-500 hover:bg-skillsprint-600 text-white"
                >
                  Unlock for ₹49
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FullStackRoadmap;
