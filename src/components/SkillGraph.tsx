
import { useState } from "react";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface SkillGraphProps {
  className?: string;
}

const SkillGraph = ({ className }: SkillGraphProps) => {
  const [showBenchmark, setShowBenchmark] = useState(false);

  // Sample user skills data
  const userSkills = {
    "Research": 25,
    "Content Strategy": 30,
    "Leadership": 46,
    "Core Qualities": 61,
    "Visual Design": 61,
    "Interaction Design": 47
  };

  // Sample benchmark data (average of all users)
  const benchmarkData = {
    "Research": 40,
    "Content Strategy": 35,
    "Leadership": 30,
    "Core Qualities": 45,
    "Visual Design": 50,
    "Interaction Design": 38
  };

  // Calculate design score (average of all categories)
  const designScore = Math.round(
    Object.values(userSkills).reduce((sum, score) => sum + score, 0) / Object.keys(userSkills).length
  );

  // Format data for the radar chart
  const chartData = Object.entries(userSkills).map(([skill, score]) => ({
    skill,
    score,
    benchmark: benchmarkData[skill as keyof typeof benchmarkData]
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
      {/* Filters and Controls */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Skill Graph Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="benchmark">Show Benchmark</Label>
              <Switch 
                id="benchmark" 
                checked={showBenchmark} 
                onCheckedChange={setShowBenchmark} 
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Compare your skills against industry standards
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select defaultValue="global">
              <SelectTrigger id="region">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="northamerica">North America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select defaultValue="designer">
              <SelectTrigger id="role">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="designer">UI/UX Designer</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="manager">Project Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience</Label>
            <Select defaultValue="all">
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                <SelectItem value="mid">Mid-Level (2-5 years)</SelectItem>
                <SelectItem value="senior">Senior (5+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Skill Graph */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Skill Graph</CardTitle>
            <CardDescription>Your skills visualization</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-skillsprint-50 text-skillsprint-700">
              Design Score: {designScore}/100
            </Badge>
            <a href="#" className="text-sm text-skillsprint-500 hover:underline">
              View Growth
            </a>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis 
                  dataKey="skill"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fill: '#94a3b8' }}
                />
                {showBenchmark && (
                  <Radar
                    name="Benchmark"
                    dataKey="benchmark"
                    stroke="#94c5f5"
                    fill="#94c5f5"
                    fillOpacity={0.3}
                  />
                )}
                <Radar
                  name="Your Score"
                  dataKey="score"
                  stroke="#7E69AB"
                  fill="#9b87f5"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">How to build your skill graph?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Your skill graph is built from your progress across courses and completed activities.
          </p>
          <ul className="list-disc pl-5 text-sm space-y-2">
            <li>Complete more courses to improve specific skills</li>
            <li>Take quizzes to validate your knowledge</li>
            <li>Earn XP by consistently practicing</li>
            <li>Compare with benchmarks to identify growth areas</li>
          </ul>
          <div className="pt-2">
            <a 
              href="#" 
              className="text-sm font-medium text-skillsprint-500 hover:text-skillsprint-600 hover:underline"
            >
              Learn more about skill assessment →
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillGraph;
