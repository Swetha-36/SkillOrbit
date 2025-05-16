
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Course } from "@/lib/types";
import { currentUser } from "@/lib/data";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  // Calculate how many levels of this course the user has completed
  const completedLevels = course.levels.filter(level => 
    currentUser.completedLevels.includes(level.id)
  ).length;
  
  // Calculate progress percentage
  const progress = (completedLevels / course.levelCount) * 100;

  return (
    <Card className="card-hover">
      <CardHeader className="p-4">
        <div className="w-full h-40 rounded-md overflow-hidden mb-2">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-all hover:scale-105 duration-500"
          />
        </div>
        <CardTitle className="text-lg">{course.title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <p className="text-muted-foreground text-sm line-clamp-2">{course.description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{completedLevels} of {course.levelCount} levels completed</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4">
        <Link to={`/courses/${course.id}`} className="w-full">
          <Button className="w-full" variant="outline">
            Continue Learning
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default CourseCard;
