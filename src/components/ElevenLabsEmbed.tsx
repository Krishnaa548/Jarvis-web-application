
import React, { useEffect, useRef } from 'react';

interface ElevenLabsEmbedProps {
  agentId: string;
  className?: string;
}

const ElevenLabsEmbed: React.FC<ElevenLabsEmbedProps> = ({ agentId, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = "https://elevenlabs-convai-agent-widget-index.js" 
    script.async = true;
    script.type = "text/javascript";
    script.setAttribute("data-elevenlabs-convai-agent-id", agentId);
    
    // Append script to container
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    // Cleanup function to remove script when component unmounts
    return () => {
      if (containerRef.current && containerRef.current.contains(script)) {
        containerRef.current.removeChild(script);
      }
    };
  }, [agentId]);

  return (
    <div ref={containerRef} className={className}>
      {/* ElevenLabs widget will be injected here */}
    </div>
  );
};

export default ElevenLabsEmbed;
