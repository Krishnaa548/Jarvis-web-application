
import React from 'react';
import { User, Bot } from 'lucide-react';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'jarvis';
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  isLatest: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLatest }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div
      className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'} ${
        isLatest ? 'animate-fade-in' : ''
      }`}
    >
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div
          className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
            isUser 
              ? 'bg-jarvis-blue/20 text-jarvis-blue ml-3'
              : 'bg-jarvis-blue text-white mr-3'
          }`}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>
        
        {/* Message content */}
        <div
          className={`${
            isUser 
              ? 'glass-card rounded-l-xl rounded-br-xl' 
              : 'glass bg-jarvis-blue/10 rounded-r-xl rounded-bl-xl'
          } px-4 py-3`}
        >
          <p className="text-sm md:text-base">{message.content}</p>
          <span className="text-xs text-muted-foreground block mt-1">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
