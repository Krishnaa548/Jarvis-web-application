
import React from 'react';
import { Cpu } from 'lucide-react';

const JarvisHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-center py-6">
      <div className="flex items-center space-x-3 px-6 py-3 glass rounded-full blue-glow animate-pulse-slow">
        <Cpu size={24} className="text-jarvis-blue" />
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          <span className="text-jarvis-blue text-glow">J</span>ARVIS
        </h1>
      </div>
    </header>
  );
};

export default JarvisHeader;
