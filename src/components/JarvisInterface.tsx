
import React from 'react';
import { Cpu } from 'lucide-react';
import ElevenLabsEmbed from './ElevenLabsEmbed';

interface JarvisInterfaceProps {
  agentId: string;
}

const JarvisInterface: React.FC<JarvisInterfaceProps> = ({ agentId }) => {
  return (
    <div className="relative w-full h-[calc(100vh-160px)] flex flex-col items-center justify-center">
      {/* Background circuit lines (can be extended with actual SVG for more detail) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[10%] left-0 w-[40%] h-px bg-jarvis-blue/30"></div>
        <div className="absolute top-[30%] right-0 w-[35%] h-px bg-jarvis-blue/30"></div>
        <div className="absolute bottom-[25%] left-0 w-[30%] h-px bg-jarvis-blue/30"></div>
        <div className="absolute bottom-[40%] right-0 w-[45%] h-px bg-jarvis-blue/30"></div>
        
        {/* Vertical lines */}
        <div className="absolute top-0 left-[25%] w-px h-[35%] bg-jarvis-blue/30"></div>
        <div className="absolute bottom-0 left-[65%] w-px h-[28%] bg-jarvis-blue/30"></div>
        <div className="absolute top-0 right-[35%] w-px h-[25%] bg-jarvis-blue/30"></div>
        <div className="absolute bottom-0 right-[15%] w-px h-[45%] bg-jarvis-blue/30"></div>
        
        {/* Circuit nodes */}
        <div className="absolute top-[10%] left-[25%] w-2 h-2 border border-jarvis-blue/50 bg-transparent"></div>
        <div className="absolute bottom-[25%] left-[30%] w-2 h-2 border border-jarvis-blue/50 bg-transparent"></div>
        <div className="absolute top-[30%] right-[35%] w-2 h-2 border border-jarvis-blue/50 bg-transparent"></div>
        <div className="absolute bottom-[40%] right-[45%] w-2 h-2 border border-jarvis-blue/50 bg-transparent"></div>
      </div>
      
      {/* Central holographic circle */}
      <div className="relative z-10 mb-8">
        <div className="relative">
          {/* Outer rings */}
          <div className="absolute inset-0 rounded-full border-2 border-jarvis-blue/20 animate-pulse-slow" style={{ width: '280px', height: '280px', marginLeft: '-40px', marginTop: '-40px' }}></div>
          <div className="absolute inset-0 rounded-full border border-jarvis-blue/30" style={{ width: '240px', height: '240px', marginLeft: '-20px', marginTop: '-20px' }}></div>
          
          {/* Main circle */}
          <div className="w-[200px] h-[200px] rounded-full bg-gradient-to-r from-jarvis-blue/10 to-jarvis-blue/5 flex items-center justify-center border border-jarvis-blue/30 glow-effect">
            <div className="w-[160px] h-[160px] rounded-full bg-gradient-to-r from-jarvis-blue/20 to-transparent flex items-center justify-center">
              <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-r from-jarvis-blue/30 to-transparent flex items-center justify-center">
                <div className="w-[70px] h-[70px] rounded-full bg-jarvis-blue/40 flex items-center justify-center animate-pulse-slow">
                  <div className="w-[40px] h-[40px] rounded-full bg-jarvis-blue/60 flex items-center justify-center">
                    <div className="w-[20px] h-[20px] rounded-full bg-jarvis-blue"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Interface details */}
          <div className="absolute top-[40%] right-[-120px] text-xs text-jarvis-blue/70">
            <div>SYSTEM: OPTIMAL</div>
            <div>CORE STATUS: READY</div>
          </div>
          
          <div className="absolute bottom-[-30px] w-full text-center text-xs text-jarvis-blue/70">
            <div>JARVIS</div>
            <div>v1.0.2</div>
          </div>
        </div>
      </div>
      
      {/* ElevenLabs embed (positioned centrally) */}
      <div className="relative z-20 w-full max-w-2xl mx-auto">
        <ElevenLabsEmbed 
          agentId={agentId}
          className="elevenlabs-container"
        />
      </div>
    </div>
  );
};

export default JarvisInterface;
