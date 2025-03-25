
import React, { useEffect, useRef } from 'react';

interface ElevenLabsEmbedProps {
  agentId: string;
  className?: string;
}

const ElevenLabsEmbed: React.FC<ElevenLabsEmbedProps> = ({ agentId, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create the elevenlabs-convai element
    const convaiElement = document.createElement('elevenlabs-convai');
    convaiElement.setAttribute('agent-id', agentId);

    // Create script element
    const script = document.createElement('script');
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";
    
    // Append elements to container
    if (containerRef.current) {
      containerRef.current.appendChild(convaiElement);
      containerRef.current.appendChild(script);
    }

    // Cleanup function to remove elements when component unmounts
    return () => {
      if (containerRef.current) {
        if (containerRef.current.contains(convaiElement)) {
          containerRef.current.removeChild(convaiElement);
        }
        if (containerRef.current.contains(script)) {
          containerRef.current.removeChild(script);
        }
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
