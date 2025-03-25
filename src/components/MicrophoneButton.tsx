
import React, { useState, useEffect } from 'react';
import { Mic, Square } from 'lucide-react';

interface MicrophoneButtonProps {
  isListening: boolean;
  onClick: () => void;
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ isListening, onClick }) => {
  const [ripples, setRipples] = useState<number[]>([]);
  
  // Add ripple effect when listening
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setRipples(prev => [...prev, Date.now()]);
      }, 1000);
      
      return () => clearInterval(interval);
    } else {
      setRipples([]);
    }
  }, [isListening]);
  
  // Remove ripples after animation completes
  useEffect(() => {
    if (ripples.length > 0) {
      const timeout = setTimeout(() => {
        setRipples(prev => prev.slice(1));
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [ripples]);

  return (
    <button
      onClick={onClick}
      className={`relative rounded-full p-4 transition-all duration-300 ${
        isListening 
          ? 'bg-jarvis-blue text-white blue-glow scale-110' 
          : 'bg-white/5 border border-jarvis-blue/30 text-jarvis-blue hover:bg-jarvis-blue/10'
      }`}
    >
      {/* Ripple effects */}
      {ripples.map(id => (
        <span
          key={id}
          className="absolute inset-0 rounded-full border border-jarvis-blue animate-ripple"
        />
      ))}
      
      {/* Icon */}
      {isListening ? (
        <Square size={24} className="animate-pulse" />
      ) : (
        <Mic size={24} />
      )}
    </button>
  );
};

export default MicrophoneButton;
