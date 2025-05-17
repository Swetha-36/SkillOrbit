
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Server, Shield, Brain, Database, Figma, Terminal, Globe, FileCode, Laptop } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

interface Domain {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  levels: number;
}

interface DomainSelectorProps {
  onDomainSelect: (domain: string) => void;
}

const DomainSelector = ({ onDomainSelect }: DomainSelectorProps) => {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const domains: Domain[] = [
    {
      id: 'frontend',
      name: 'Frontend Development',
      icon: Globe,
      description: 'HTML, CSS, JavaScript, React, Vue, Angular',
      levels: 5
    },
    {
      id: 'backend',
      name: 'Backend Engineering',
      icon: Server,
      description: 'APIs, Databases, Server Logic, Cloud',
      levels: 5
    },
    {
      id: 'fullstack',
      name: 'Full Stack Development',
      icon: Laptop,
      description: 'Frontend + Backend, DevOps, Architecture',
      levels: 6
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      icon: Brain,
      description: 'Neural Networks, NLP, Computer Vision, Data Science',
      levels: 5
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      icon: Shield,
      description: 'Network Security, Encryption, Ethical Hacking',
      levels: 4
    },
    {
      id: 'data',
      name: 'Data Science',
      icon: Database,
      description: 'Analysis, Visualization, Big Data, Statistics',
      levels: 5
    },
    {
      id: 'ui-ux',
      name: 'UI/UX Design',
      icon: Figma,
      description: 'User Experience, Interface Design, Prototyping',
      levels: 4
    },
    {
      id: 'devops',
      name: 'DevOps',
      icon: Terminal,
      description: 'CI/CD, Docker, Kubernetes, Cloud Infrastructure',
      levels: 5
    },
    {
      id: 'mobile',
      name: 'Mobile Development',
      icon: FileCode,
      description: 'Android, iOS, React Native, Flutter',
      levels: 5
    },
    {
      id: 'web3',
      name: 'Web3 & Blockchain',
      icon: Code,
      description: 'Smart Contracts, DApps, Cryptocurrencies',
      levels: 4
    },
  ];

  const handleSelect = (domainId: string) => {
    setSelectedDomain(domainId);
    onDomainSelect(domainId);
  };

  return (
    <Card className="mb-8 border-skillsprint-200/50 dark:border-gray-700 dark:bg-gray-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold dark:text-white">Choose Your Learning Domain</h2>
          <div className="flex items-center space-x-2">
            <Toggle 
              pressed={viewMode === 'grid'} 
              onPressedChange={() => setViewMode('grid')}
              aria-label="Grid view"
              variant="outline"
              size="sm"
            >
              <div className="grid grid-cols-2 gap-0.5 h-3 w-3">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </Toggle>
            <Toggle 
              pressed={viewMode === 'list'} 
              onPressedChange={() => setViewMode('list')}
              aria-label="List view"
              variant="outline"
              size="sm"
            >
              <div className="flex flex-col gap-0.5 h-3.5 w-3.5">
                <div className="h-0.5 w-full bg-current rounded-sm"></div>
                <div className="h-0.5 w-full bg-current rounded-sm"></div>
                <div className="h-0.5 w-full bg-current rounded-sm"></div>
              </div>
            </Toggle>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6 dark:text-gray-300">
          Select a domain to see our recommended learning roadmaps
        </p>
        
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
          : "flex flex-col gap-2"
        }>
          {domains.map((domain) => (
            <Button
              key={domain.id}
              variant={selectedDomain === domain.id ? "default" : "outline"}
              className={`h-auto ${viewMode === 'grid' ? 'flex flex-col items-start' : 'flex items-center justify-between'} p-4 border ${
                selectedDomain === domain.id 
                  ? 'bg-skillsprint-500 text-white dark:bg-skillsprint-600' 
                  : 'hover:border-skillsprint-300 hover:bg-skillsprint-50 dark:hover:bg-gray-700 dark:border-gray-600'
              }`}
              onClick={() => handleSelect(domain.id)}
            >
              <div className={`flex items-center ${viewMode === 'grid' ? 'w-full mb-2' : ''}`}>
                <domain.icon className={`mr-2 h-5 w-5 ${selectedDomain === domain.id ? 'text-white' : 'text-skillsprint-500 dark:text-skillsprint-400'}`} />
                <span className="font-medium text-left">{domain.name}</span>
              </div>
              
              {viewMode === 'grid' ? (
                <span className={`text-xs text-left ${selectedDomain === domain.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                  {domain.description}
                </span>
              ) : (
                <div className="flex items-center">
                  <span className={`text-xs ${selectedDomain === domain.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'} mr-2`}>
                    {domain.levels} levels
                  </span>
                  <div className={`h-2 w-2 rounded-full ${selectedDomain === domain.id ? 'bg-white' : 'bg-skillsprint-500 dark:bg-skillsprint-400'}`}></div>
                </div>
              )}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DomainSelector;
