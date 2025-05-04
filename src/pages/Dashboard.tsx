
import { useState } from 'react';
import Header from '@/components/Header';
import SlackConnect from '@/components/SlackConnect';
import ConversationSelector from '@/components/ConversationSelector';
import MessageHistory from '@/components/MessageHistory';
import EmailDraft from '@/components/EmailDraft';
import AIModelSelector from '@/components/AIModelSelector';
import { useEmailDraft } from '@/hooks/useEmailDraft';

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const { 
    emailContent, 
    setEmailContent, 
    isGenerating, 
    generateEmail, 
    regenerateEmail,
    selectedModel,
    setSelectedModel
  } = useEmailDraft();

  // Check if already connected (token in localStorage)
  useState(() => {
    const token = localStorage.getItem('slackToken');
    if (token) {
      setIsConnected(true);
    }
  });

  // Handle connection to Slack
  const handleConnected = () => {
    setIsConnected(true);
  };

  // Handle selecting a conversation
  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
  };

  // Handle generating email from context
  const handleGenerateEmail = (context: string) => {
    generateEmail(context);
  };

  // Display connection screen if not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <SlackConnect onConnected={handleConnected} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-72 flex-shrink-0">
          <ConversationSelector 
            onSelect={handleSelectConversation} 
            selectedId={selectedConversation} 
          />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <AIModelSelector 
            selectedModel={selectedModel} 
            onModelChange={setSelectedModel} 
          />
          
          <div className="flex-1 flex overflow-hidden">
            <div className="w-1/2 flex-shrink-0">
              <MessageHistory 
                conversationId={selectedConversation} 
                onGenerateEmail={handleGenerateEmail}
              />
            </div>
            
            <div className="w-1/2 flex-shrink-0">
              {isGenerating ? (
                <div className="h-full flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-slack-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sm text-muted-foreground animate-pulse-subtle">
                      Generating your email with IBM Granite...
                    </p>
                  </div>
                </div>
              ) : (
                <EmailDraft 
                  emailContent={emailContent} 
                  onEmailContentChange={setEmailContent} 
                  onRegenerateEmail={regenerateEmail}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
