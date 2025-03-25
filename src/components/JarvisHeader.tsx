
import React from 'react';
import { Cpu } from 'lucide-react';

const JarvisHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-4 px-6">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 px-3 py-2">
          <div className="w-3 h-3 rounded-full bg-jarvis-blue animate-pulse" />
          <h1 className="text-xl font-semibold tracking-wider text-jarvis-blue">
            JARVIS
          </h1>
        </div>
      </div>
      
      <div className="flex items-center">
        <span className="text-xs flex items-center text-jarvis-blue">
          <span className="w-2 h-2 rounded-full bg-jarvis-blue mr-1"></span>
          Online
        </span>
      </div>
    </header>
  );
};

export default JarvisHeader;
