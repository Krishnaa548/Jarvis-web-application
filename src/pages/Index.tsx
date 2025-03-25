
import React, { useState } from 'react';
import JarvisHeader from '../components/JarvisHeader';
import JarvisInterface from '../components/JarvisInterface';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Default webhook URL - this should be configurable
const DEFAULT_WEBHOOK_URL = 'https://echo.zuplo.io';
// Default ElevenLabs agent ID - this should be configurable
const DEFAULT_AGENT_ID = 'YWFCQVZNLyZrhZftuL'; // Replace with your actual agent ID

const Index = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState(
    localStorage.getItem('jarvisWebhookUrl') || DEFAULT_WEBHOOK_URL
  );
  const [agentId, setAgentId] = useState(
    localStorage.getItem('jarvisAgentId') || DEFAULT_AGENT_ID
  );

  const saveSettings = () => {
    localStorage.setItem('jarvisWebhookUrl', webhookUrl);
    localStorage.setItem('jarvisAgentId', agentId);
    setIsFirstVisit(false);
    toast.success('Settings saved successfully');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <JarvisHeader />
      
      {/* Main content */}
      <main className="flex-1 container mx-auto max-w-7xl px-4 py-6">
        <div className="h-[calc(100vh-160px)] glass rounded-xl overflow-hidden blue-glow">
          <JarvisInterface agentId={agentId} />
        </div>
      </main>
      
      {/* Setup Dialog */}
      <Dialog open={isFirstVisit} onOpenChange={setIsFirstVisit}>
        <DialogContent className="glass-card border-jarvis-blue/20">
          <DialogHeader>
            <DialogTitle className="text-jarvis-blue">Welcome to Jarvis</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-foreground">
              To get started, please provide your ElevenLabs agent ID and a webhook URL for Jarvis to communicate with.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="agentId" className="text-foreground">ElevenLabs Agent ID</Label>
              <Input
                id="agentId"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                placeholder="Enter your ElevenLabs agent ID"
                className="bg-white/5 border-jarvis-blue/20 focus-visible:ring-jarvis-blue/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhookUrl" className="text-foreground">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-webhook-url.com"
                className="bg-white/5 border-jarvis-blue/20 focus-visible:ring-jarvis-blue/30"
              />
              <p className="text-xs text-muted-foreground">
                This URL will receive your voice transcriptions and provide responses.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={saveSettings}
              className="bg-jarvis-blue hover:bg-jarvis-blue-dark"
            >
              Get Started
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
