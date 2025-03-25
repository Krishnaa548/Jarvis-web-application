
import { useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Message } from '../components/MessageBubble';
import { playSpeech } from '../lib/elevenlabs';

interface UseChatProps {
  webhookUrl: string;
}

export default function useChat({ webhookUrl }: UseChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize with a welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      content: "Hello, I'm Jarvis. How can I assist you today?",
      sender: 'jarvis',
      timestamp: new Date(),
    };
    
    setMessages([welcomeMessage]);
    
    // Play welcome message after a short delay
    setTimeout(() => {
      playSpeech(welcomeMessage.content);
    }, 500);
  }, []);

  // Auto scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Send message to webhook and handle response
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      // Send to webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      // Add Jarvis response
      const jarvisResponse: Message = {
        id: `jarvis-${Date.now()}`,
        content: data.response || "I'm having trouble processing that request.",
        sender: 'jarvis',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, jarvisResponse]);
      
      // Play Jarvis response
      playSpeech(jarvisResponse.content);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to communicate with Jarvis');
      
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "I'm having trouble connecting to my systems. Please try again later.",
        sender: 'jarvis',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  }, [webhookUrl]);

  return { 
    messages, 
    sendMessage, 
    isProcessing,
    messagesEndRef
  };
}
