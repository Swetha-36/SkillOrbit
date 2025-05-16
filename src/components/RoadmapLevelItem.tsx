
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lock, CheckCircle, Video, BookOpen, Link, Award, ArrowRight, List } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Resource {
  id: number;
  title: string;
  type: "video" | "article" | "documentation";
  url: string;
}

interface Level {
  id: number;
  name: string;
  completed: boolean;
  locked: boolean;
  description?: string;
  resources?: Resource[];
  objective?: string;
}

interface RoadmapLevelItemProps {
  level: Level;
  order: number;
  onComplete: (levelId: number) => void;
}

const RoadmapLevelItem = ({ level, order, onComplete }: RoadmapLevelItemProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const { toast } = useToast();

  const mockResources: Resource[] = [
    { 
      id: 1, 
      title: "Introduction to the Concept", 
      type: "video", 
      url: "https://www.youtube.com/watch?v=example" 
    },
    { 
      id: 2, 
      title: "Complete Guide Documentation", 
      type: "documentation", 
      url: "https://docs.example.com" 
    },
    { 
      id: 3, 
      title: "Practical Tutorial from freeCodeCamp", 
      type: "article", 
      url: "https://freecodecamp.org/example" 
    },
  ];

  const resources = level.resources || mockResources;
  const objective = level.objective || "Master the fundamental concepts and build a strong foundation for advanced topics.";
  const description = level.description || "This level focuses on core concepts that every learner should understand before moving forward.";

  const handleComplete = async () => {
    setIsCompleting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onComplete(level.id);
    setIsCompleting(false);
    setIsDialogOpen(false);
    
    toast({
      title: "Level Completed!",
      description: "You've earned 10 points! Keep up the good work!",
    });
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video size={16} className="mr-2" />;
      case "article":
        return <BookOpen size={16} className="mr-2" />;
      case "documentation":
        return <List size={16} className="mr-2" />;
      default:
        return <Link size={16} className="mr-2" />;
    }
  };

  return (
    <>
      <li 
        className={`py-3 px-2 rounded-md flex justify-between items-center group ${
          level.locked ? 'opacity-60' : 'hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center">
          {level.completed ? (
            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
          ) : level.locked ? (
            <Lock className="h-5 w-5 text-gray-400 mr-3" />
          ) : (
            <Badge className="h-5 w-5 flex items-center justify-center mr-3 bg-skillsprint-100 text-skillsprint-700 p-1 rounded-full">
              {order}
            </Badge>
          )}
          <span className={level.completed ? 'font-medium' : ''}>
            {level.name}
          </span>
        </div>
        
        {!level.locked && (
          <Button
            size="sm"
            variant={level.completed ? "outline" : "ghost"}
            disabled={level.locked}
            className={`opacity-0 group-hover:opacity-100 transition-opacity ${
              level.completed 
                ? 'text-green-500 hover:bg-green-50 hover:text-green-600' 
                : 'text-skillsprint-500 hover:bg-skillsprint-50 hover:text-skillsprint-600'
            }`}
            onClick={() => setIsDialogOpen(true)}
          >
            {level.completed ? (
              <>Review</>
            ) : (
              <>Start<ArrowRight className="ml-1 h-4 w-4" /></>
            )}
          </Button>
        )}
      </li>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Badge className="mr-2 bg-skillsprint-100 text-skillsprint-700 px-2">Level {order}</Badge>
              {level.name}
            </DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Objective</h4>
              <p className="text-sm text-gray-600">{objective}</p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="resources">
                <AccordionTrigger className="text-sm font-medium">
                  Learning Resources ({resources.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    {resources.map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm p-2 hover:bg-gray-50 rounded transition-colors"
                      >
                        {getResourceIcon(resource.type)}
                        <span>{resource.title}</span>
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="rounded-lg bg-skillsprint-50 p-4 flex items-start">
              <Award className="text-skillsprint-500 h-5 w-5 mt-0.5 mr-2" />
              <div>
                <h4 className="font-medium text-skillsprint-700">Complete This Level</h4>
                <p className="text-sm text-skillsprint-600">
                  Mark this level as completed to earn 10 points and unlock the next level.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            {!level.completed && (
              <Button 
                onClick={handleComplete}
                disabled={isCompleting}
                className="bg-skillsprint-500 hover:bg-skillsprint-600"
              >
                {isCompleting ? "Marking..." : "Mark as Completed"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RoadmapLevelItem;
