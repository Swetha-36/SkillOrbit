
import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import FullStackRoadmap from '@/components/FullStackRoadmap';
import PaymentModal from '@/components/PaymentModal'; 

const WebDevRoadmap = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const handlePaymentSuccess = () => {
    // Save payment status to localStorage
    if (selectedLevel) {
      const paidLevels = JSON.parse(localStorage.getItem('paidLevels') || '{}');
      paidLevels[selectedLevel] = true;
      localStorage.setItem('paidLevels', JSON.stringify(paidLevels));
    }
    setIsPaymentModalOpen(false);
  };

  const handleUnlockLevel = (level: string) => {
    setSelectedLevel(level);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
          <FullStackRoadmap onUnlockLevel={handleUnlockLevel} />
        </main>
      </div>
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        onSuccess={handlePaymentSuccess}
        level={selectedLevel}
      />
    </div>
  );
};

export default WebDevRoadmap;
