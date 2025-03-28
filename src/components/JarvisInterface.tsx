
import React, { useEffect, useRef, useState } from 'react';
import { Cpu } from 'lucide-react';
import ElevenLabsEmbed from './ElevenLabsEmbed';

interface JarvisInterfaceProps {
  agentId: string;
}

const JarvisInterface: React.FC<JarvisInterfaceProps> = ({ agentId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number; opacity: number; }>>([]);
  
  // Generate random particles
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(newParticles);
    
    // Animated particle movement
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed) % 100,
        opacity: Math.sin((Date.now() / 3000) + particle.id) * 0.3 + 0.5,
      })));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    // Create pulse effect for the circuit nodes
    const interval = setInterval(() => {
      if (containerRef.current) {
        const nodes = containerRef.current.querySelectorAll('.circuit-node');
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (randomNode) {
          randomNode.classList.add('pulse-node');
          setTimeout(() => {
            randomNode.classList.remove('pulse-node');
          }, 2000);
        }
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div ref={containerRef} className="relative w-full h-[calc(100vh-160px)] flex flex-col items-center justify-center overflow-hidden">
      {/* Enhanced background with more circuit elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Horizontal lines */}
        <div className="absolute top-[10%] left-0 w-[40%] h-px bg-jarvis-blue/30 circuit-line" style={{ "--circuit-delay": "0" } as React.CSSProperties}></div>
        <div className="absolute top-[30%] right-0 w-[35%] h-px bg-jarvis-blue/30 circuit-line" style={{ "--circuit-delay": "2" } as React.CSSProperties}></div>
        <div className="absolute bottom-[25%] left-0 w-[30%] h-px bg-jarvis-blue/30 circuit-line" style={{ "--circuit-delay": "4" } as React.CSSProperties}></div>
        <div className="absolute bottom-[40%] right-0 w-[45%] h-px bg-jarvis-blue/30 circuit-line" style={{ "--circuit-delay": "1" } as React.CSSProperties}></div>
        <div className="absolute top-[20%] left-[30%] w-[30%] h-px bg-jarvis-blue/30 circuit-line" style={{ "--circuit-delay": "3" } as React.CSSProperties}></div>
        <div className="absolute bottom-[35%] left-[35%] w-[25%] h-px bg-jarvis-blue/30 circuit-line" style={{ "--circuit-delay": "5" } as React.CSSProperties}></div>
        
        {/* Vertical lines */}
        <div className="absolute top-0 left-[25%] w-px h-[35%] bg-jarvis-blue/30 circuit-line" style={{ "--circuit-delay": "2.5" } as React.CSSProperties}></div>
        <div className="absolute bottom-0 left-[65%] w-px h-[28%] bg-jarvis-blue/30 circuit-line" style={{ "--circuit-delay": "4.5" } as React.CSSProperties}></div>
        <div className="absolute top-0 right-[35%] w-px h-[25%] bg-jarvis-blue/30 circuit-line" style={{ "--circuit-delay": "1.5" } as React.CSSProperties}></div>
        <div className="absolute bottom-0 right-[15%] w-px h-[45%] bg-jarvis-blue/30 circuit-line" style={{ "--circuit-delay": "3.5" } as React.CSSProperties}></div>
        <div className="absolute top-0 right-[60%] w-px h-[45%] bg-jarvis-blue/30 circuit-line" style={{ "--circuit-delay": "0.5" } as React.CSSProperties}></div>
        <div className="absolute bottom-0 left-[20%] w-px h-[40%] bg-jarvis-blue/30 circuit-line" style={{ "--circuit-delay": "5.5" } as React.CSSProperties}></div>
        
        {/* Circuit nodes with glowing effect */}
        <div className="absolute top-[10%] left-[25%] w-2 h-2 border border-jarvis-blue/50 bg-jarvis-blue/10 circuit-node"></div>
        <div className="absolute bottom-[25%] left-[30%] w-2 h-2 border border-jarvis-blue/50 bg-jarvis-blue/10 circuit-node"></div>
        <div className="absolute top-[30%] right-[35%] w-2 h-2 border border-jarvis-blue/50 bg-jarvis-blue/10 circuit-node"></div>
        <div className="absolute bottom-[40%] right-[45%] w-2 h-2 border border-jarvis-blue/50 bg-jarvis-blue/10 circuit-node"></div>
        <div className="absolute top-[20%] left-[30%] w-2 h-2 border border-jarvis-blue/50 bg-jarvis-blue/10 circuit-node"></div>
        <div className="absolute bottom-[35%] left-[35%] w-2 h-2 border border-jarvis-blue/50 bg-jarvis-blue/10 circuit-node"></div>
        <div className="absolute top-[5%] right-[20%] w-2 h-2 border border-jarvis-blue/50 bg-jarvis-blue/10 circuit-node"></div>
        <div className="absolute bottom-[15%] right-[25%] w-2 h-2 border border-jarvis-blue/50 bg-jarvis-blue/10 circuit-node"></div>

        {/* Animated particle effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.05)_0%,transparent_70%)]"></div>
        
        {/* Floating particles */}
        {particles.map(particle => (
          <div 
            key={particle.id}
            className="absolute rounded-full bg-jarvis-blue"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px rgba(14, 165, 233, ${particle.opacity})`,
              transition: 'opacity 0.5s ease'
            }}
          />
        ))}
        
        {/* DNA-like double helix animation */}
        <div className="absolute h-[80%] w-[2px] left-[20%] top-[10%] overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-[8px] h-[8px] rounded-full bg-jarvis-blue/40"
              style={{
                left: `${Math.sin((i / 20) * Math.PI * 4) * 20}px`,
                top: `${i * 5}%`,
                animationDelay: `${i * 0.1}s`,
                animation: 'pulse 3s infinite ease-in-out'
              }}
            />
          ))}
        </div>
        
        <div className="absolute h-[80%] w-[2px] right-[20%] top-[10%] overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-[8px] h-[8px] rounded-full bg-jarvis-blue/40"
              style={{
                right: `${Math.sin((i / 20) * Math.PI * 4) * 20}px`,
                top: `${i * 5}%`,
                animationDelay: `${i * 0.1}s`,
                animation: 'pulse 3s infinite ease-in-out'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Enhanced central holographic circle with more rings and animations */}
      <div className="relative z-10 mb-8">
        <div className="relative">
          {/* Outer rings with rotations */}
          <div className="absolute inset-0 rounded-full border border-jarvis-blue/10 animate-[spin_60s_linear_infinite]" style={{ width: '320px', height: '320px', marginLeft: '-60px', marginTop: '-60px' }}></div>
          <div className="absolute inset-0 rounded-full border-2 border-jarvis-blue/20 animate-pulse-slow animate-[spin_45s_linear_infinite_reverse]" style={{ width: '280px', height: '280px', marginLeft: '-40px', marginTop: '-40px' }}></div>
          <div className="absolute inset-0 rounded-full border border-jarvis-blue/30 animate-[spin_30s_linear_infinite]" style={{ width: '240px', height: '240px', marginLeft: '-20px', marginTop: '-20px' }}></div>
          
          {/* Main circle */}
          <div className="w-[200px] h-[200px] rounded-full bg-gradient-to-r from-jarvis-blue/10 to-jarvis-blue/5 flex items-center justify-center border border-jarvis-blue/30 glow-effect">
            <div className="w-[160px] h-[160px] rounded-full bg-gradient-to-r from-jarvis-blue/20 to-transparent flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
              <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-r from-jarvis-blue/30 to-transparent flex items-center justify-center">
                <div className="w-[70px] h-[70px] rounded-full bg-jarvis-blue/40 flex items-center justify-center animate-pulse-slow">
                  <div className="w-[40px] h-[40px] rounded-full bg-jarvis-blue/60 flex items-center justify-center">
                    <div className="w-[20px] h-[20px] rounded-full bg-jarvis-blue"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Animated ticks around the circle */}
          {Array.from({ length: 24 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-3 bg-jarvis-blue/30"
              style={{ 
                top: '50%', 
                left: '50%', 
                transformOrigin: '0 100px',
                transform: `rotate(${i * 15}deg) translateY(-100px)` 
              }}
            />
          ))}
          
          {/* Enhanced interface details with animation */}
          <div className="absolute top-[40%] right-[-140px] text-xs text-jarvis-blue/70 animate-fade-in">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-1.5 h-1.5 bg-jarvis-blue/80 rounded-full animate-pulse"></div>
              <div>SYSTEM: OPTIMAL</div>
            </div>
            <div className="flex items-center gap-1 mb-1">
              <div className="w-1.5 h-1.5 bg-jarvis-blue/80 rounded-full animate-pulse"></div>
              <div>CORE STATUS: READY</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-jarvis-blue/80 rounded-full animate-pulse"></div>
              <div>AI ENGINE: ACTIVE</div>
            </div>
          </div>
          
          <div className="absolute bottom-[-30px] w-full text-center text-xs text-jarvis-blue/70">
            <div className="text-glow font-medium">JARVIS</div>
            <div>v1.0.2</div>
          </div>
        </div>
      </div>
      
      {/* ElevenLabs embed is now moved to the bottom right corner via its own CSS */}
      <ElevenLabsEmbed 
        agentId={agentId}
        className="elevenlabs-container"
      />
    </div>
  );
};

export default JarvisInterface;
