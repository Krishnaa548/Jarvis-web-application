
import React, { useState } from 'react';
import JarvisHeader from '../components/JarvisHeader';
import ChatInterface from '../components/ChatInterface';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Default webhook URL - this should be configurable
const DEFAULT_WEBHOOK_URL = 'https://echo.zuplo.io';

const Index = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState(
    localStorage.getItem('jarvisWebhookUrl') || DEFAULT_WEBHOOK_URL
  );

  const saveWebhookUrl = () => {
    localStorage.setItem('jarvisWebhookUrl', webhookUrl);
    setIsFirstVisit(false);
    toast.success('Webhook URL set successfully');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <JarvisHeader />
      
      {/* Main content */}
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-6">
        <div className="h-[calc(100vh-160px)] glass rounded-xl overflow-hidden blue-glow">
          <ChatInterface webhookUrl={webhookUrl} />
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
              To get started, please provide a webhook URL for Jarvis to communicate with.
            </p>
            
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
              onClick={saveWebhookUrl}
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
