
import { useState } from "react";
import { Level } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, BookOpen, Video, FileText, Book, ArrowRight } from "lucide-react";
import { currentUser } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

interface LevelItemProps {
  level: Level;
  onCompleted: (levelId: number) => void;
}

export function LevelItem({ level, onCompleted }: LevelItemProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const isCompleted = currentUser.completedLevels.includes(level.id);
  const { toast } = useToast();

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video size={16} className="mr-2" />;
      case "article":
        return <FileText size={16} className="mr-2" />;
      case "documentation":
        return <Book size={16} className="mr-2" />;
      default:
        return <BookOpen size={16} className="mr-2" />;
    }
  };

  const handleCompleteLevel = async () => {
    setIsCompleting(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the completion handler
      onCompleted(level.id);
      
      toast({
        title: "Level Completed!",
        description: "You've earned 10 points!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark level as completed",
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <Card className={`mb-4 ${isCompleted ? 'border-l-4 border-l-success' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm text-muted-foreground">Level {level.order}</div>
            <CardTitle className="text-lg flex items-center">
              {level.title}
              {isCompleted && (
                <CheckCircle size={18} className="ml-2 text-success" />
              )}
            </CardTitle>
          </div>
          {level.quiz && (
            <Badge className="bg-skillsprint-100 text-skillsprint-800 hover:bg-skillsprint-200">
              Quiz Available
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{level.description}</p>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="resources">
            <AccordionTrigger className="text-sm font-medium">
              Learning Resources ({level.resources.length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {level.resources.map((resource) => (
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
                
                {level.resources.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">
                    No resources available for this level yet.
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm">
            {level.quiz ? (
              <Button variant="outline" size="sm">
                Take Quiz
                <ArrowRight size={16} className="ml-1" />
              </Button>
            ) : (
              <span className="text-muted-foreground">No quiz for this level</span>
            )}
          </div>
          
          {!isCompleted ? (
            <Button
              onClick={handleCompleteLevel} 
              disabled={isCompleting}
              size="sm"
            >
              {isCompleting ? "Marking..." : "Mark as Completed"}
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              Completed
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default LevelItem;
