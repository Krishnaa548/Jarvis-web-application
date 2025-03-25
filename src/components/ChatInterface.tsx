
import React, { useState } from 'react';
import { Settings, Send } from 'lucide-react';
import MessageBubble from './MessageBubble';
import MicrophoneButton from './MicrophoneButton';
import useVoiceRecognition from '../hooks/useVoiceRecognition';
import useChat from '../hooks/useChat';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getElevenLabsApiKey, setElevenLabsApiKey } from '../lib/elevenlabs';

interface ChatInterfaceProps {
  webhookUrl: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ webhookUrl }) => {
  const [textInput, setTextInput] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(getElevenLabsApiKey());
  
  const { 
    messages, 
    sendMessage, 
    isProcessing, 
    messagesEndRef 
  } = useChat({ webhookUrl });

  const handleTranscript = (transcript: string) => {
    sendMessage(transcript);
  };

  const { 
    isListening, 
    toggleListening, 
    errorMessage 
  } = useVoiceRecognition({ onTranscript: handleTranscript });

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      sendMessage(textInput);
      setTextInput('');
    }
  };

  const handleMicrophoneClick = () => {
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }
    toggleListening();
  };

  const saveSettings = () => {
    setElevenLabsApiKey(apiKey);
    toast.success('Settings saved');
    setIsSettingsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Chat messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-4">
          {messages.map((message, index) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              isLatest={index === messages.length - 1}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="p-4 glass-card border-t border-jarvis-blue/10 rounded-xl">
          <form onSubmit={handleTextSubmit} className="flex items-center gap-2">
            <button 
              type="button" 
              className="p-2 rounded-full text-jarvis-blue hover:bg-jarvis-blue/10 transition-colors"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings size={20} />
            </button>
            
            <Input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border-jarvis-blue/20 focus-visible:ring-jarvis-blue/30"
              disabled={isProcessing || isListening}
            />
            
            <button 
              type="submit" 
              disabled={isProcessing || !textInput.trim() || isListening}
              className="p-2 rounded-full text-jarvis-blue hover:bg-jarvis-blue/10 transition-colors disabled:opacity-50"
            >
              <Send size={20} />
            </button>
            
            <MicrophoneButton
              isListening={isListening}
              onClick={handleMicrophoneClick}
            />
          </form>
          
          {/* Status indicator */}
          {isProcessing && (
            <div className="text-xs text-jarvis-blue animate-pulse mt-2 flex justify-center">
              Jarvis is processing...
            </div>
          )}
          {isListening && (
            <div className="text-xs text-jarvis-blue animate-pulse mt-2 flex justify-center">
              Listening for your command...
            </div>
          )}
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="glass-card border-jarvis-blue/20">
          <DialogHeader>
            <DialogTitle className="text-jarvis-blue">Jarvis Settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-foreground">ElevenLabs API Key</Label>
              <Input
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your ElevenLabs API key"
                className="bg-white/5 border-jarvis-blue/20 focus-visible:ring-jarvis-blue/30"
              />
              <p className="text-xs text-muted-foreground">
                This key is stored in your browser and used for voice synthesis.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={saveSettings}
              className="bg-jarvis-blue hover:bg-jarvis-blue-dark"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatInterface;
