
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Server, Shield, Brain, Database, Figma } from 'lucide-react';

interface Domain {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

interface DomainSelectorProps {
  onDomainSelect: (domain: string) => void;
}

const DomainSelector = ({ onDomainSelect }: DomainSelectorProps) => {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  
  const domains: Domain[] = [
    {
      id: 'web-dev',
      name: 'Web Development',
      icon: Code,
      description: 'Frontend, Backend, Full Stack'
    },
    {
      id: 'backend',
      name: 'Backend Engineering',
      icon: Server,
      description: 'APIs, Databases, Server Logic'
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      icon: Brain,
      description: 'Neural Networks, NLP, Computer Vision'
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      icon: Shield,
      description: 'Network Security, Encryption, Ethical Hacking'
    },
    {
      id: 'data',
      name: 'Data Science',
      icon: Database,
      description: 'Analysis, Visualization, Big Data'
    },
    {
      id: 'ui-ux',
      name: 'UI/UX Design',
      icon: Figma,
      description: 'User Experience, Interface Design, Prototyping'
    },
  ];

  const handleSelect = (domainId: string) => {
    setSelectedDomain(domainId);
    onDomainSelect(domainId);
  };

  return (
    <Card className="mb-8 border-skillsprint-200/50">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Choose Your Learning Domain</h2>
        <p className="text-gray-600 mb-6">
          Select a domain to see our recommended learning roadmaps
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {domains.map((domain) => (
            <Button
              key={domain.id}
              variant={selectedDomain === domain.id ? "default" : "outline"}
              className={`h-auto flex flex-col items-start p-4 border ${
                selectedDomain === domain.id 
                  ? 'bg-skillsprint-500 text-white' 
                  : 'hover:border-skillsprint-300 hover:bg-skillsprint-50'
              }`}
              onClick={() => handleSelect(domain.id)}
            >
              <div className="flex items-center w-full mb-2">
                <domain.icon className={`mr-2 h-5 w-5 ${selectedDomain === domain.id ? 'text-white' : 'text-skillsprint-500'}`} />
                <span className="font-medium text-left">{domain.name}</span>
              </div>
              <span className={`text-xs text-left ${selectedDomain === domain.id ? 'text-white/80' : 'text-gray-500'}`}>
                {domain.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DomainSelector;
