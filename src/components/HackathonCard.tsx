
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Hackathon } from "@/lib/types";

interface HackathonCardProps {
  hackathon: Hackathon;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Check if hackathon is upcoming (in the future)
  const isUpcoming = new Date(hackathon.date) > new Date();

  return (
    <Card className="card-hover h-full flex flex-col">
      {hackathon.image && (
        <div className="w-full h-36 overflow-hidden">
          <img 
            src={hackathon.image} 
            alt={hackathon.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className={`${hackathon.image ? 'pt-4' : 'pt-6'}`}>
        <div className="flex justify-between">
          <CardTitle className="text-lg">{hackathon.name}</CardTitle>
          {isUpcoming && (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Upcoming
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-3">{hackathon.description}</p>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Calendar size={16} className="mr-2" />
          <span>{formatDate(hackathon.date)}</span>
        </div>
        {hackathon.location && (
          <div className="text-sm text-gray-500 mt-1 ml-6">
            {hackathon.location}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <a 
          href={hackathon.registrationUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button variant="outline" className="w-full">
            Register
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}

export default HackathonCard;
