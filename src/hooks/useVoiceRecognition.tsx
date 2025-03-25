
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseVoiceRecognitionProps {
  onTranscript: (transcript: string) => void;
  language?: string;
}

export default function useVoiceRecognition({ 
  onTranscript,
  language = 'en-US'
}: UseVoiceRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setErrorMessage('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = language;

    recognitionRef.current.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      // Only send final results
      if (event.results[0].isFinal) {
        onTranscript(transcript);
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setErrorMessage(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        try {
          recognitionRef.current?.start();
        } catch (e) {
          console.log('Recognition already started');
        }
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        
        if (isListening) {
          recognitionRef.current.stop();
        }
      }
    };
  }, [language, onTranscript, isListening]);

  const toggleListening = useCallback(() => {
    setIsListening(prevState => {
      const newState = !prevState;
      
      if (newState) {
        try {
          recognitionRef.current?.start();
        } catch (e) {
          console.log('Recognition already started');
        }
      } else {
        recognitionRef.current?.stop();
      }
      
      return newState;
    });
  }, []);

  return { isListening, toggleListening, errorMessage };
}

// Add missing type definitions
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
