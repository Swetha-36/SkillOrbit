
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, RefreshCw, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIRoadmapGeneratorProps {
  onRoadmapGenerated: (roadmap: any) => void;
}

const AIRoadmapGenerator = ({ onRoadmapGenerated }: AIRoadmapGeneratorProps) => {
  const [goal, setGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateRoadmap = async () => {
    if (!goal.trim()) {
      toast({
        title: "Goal Required",
        description: "Please enter a learning goal to generate a roadmap.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Simulating AI roadmap generation with mock data
      // In a real implementation, this would call an OpenAI or similar API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock response based on user goal
      const generatedRoadmap = {
        id: Date.now(),
        title: `${goal.split(" ").slice(-2).join(" ")} Path`,
        description: `Custom roadmap for: ${goal}`,
        progress: 0,
        stages: [
          {
            id: 1,
            name: "Fundamentals",
            completed: false,
            locked: false
          },
          {
            id: 2,
            name: "Core Concepts",
            completed: false,
            locked: false
          },
          {
            id: 3,
            name: "Advanced Techniques",
            completed: false,
            locked: false
          },
          {
            id: 4,
            name: "Practical Projects",
            completed: false,
            locked: false
          },
          {
            id: 5,
            name: "Professional Skills",
            completed: false,
            locked: true
          }
        ]
      };

      onRoadmapGenerated(generatedRoadmap);
      
      toast({
        title: "Roadmap Generated",
        description: "Your customized learning path is ready!",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Unable to generate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="mb-8 border-skillsprint-200/50">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Sparkles size={20} className="text-skillsprint-500 mr-2" />
          Generate Custom Roadmap
        </h2>
        <p className="text-gray-600 mb-4">
          Tell us your learning goal, and our AI will create a personalized roadmap for you.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="e.g., I want to become a full-stack developer"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={generateRoadmap}
            disabled={isGenerating || !goal.trim()}
            className="bg-skillsprint-500 hover:bg-skillsprint-600"
          >
            {isGenerating ? (
              <>
                <RefreshCw size={18} className="mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={18} className="mr-2" />
                Generate Roadmap
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRoadmapGenerator;
