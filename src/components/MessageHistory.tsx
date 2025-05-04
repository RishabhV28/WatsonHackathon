
import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Clipboard } from 'lucide-react';

// Mock data for a conversation history
const mockMessages = [
  { id: '1', user: 'Sarah Johnson', text: 'Hi team, I need to follow up with the client about their feedback on our proposal.', time: '10:40 AM', avatar: '/placeholder.svg' },
  { id: '2', user: 'David Chen', text: 'I have the notes from the meeting. They liked the concept but had some concerns about the timeline.', time: '10:42 AM', avatar: '/placeholder.svg' },
  { id: '3', user: 'You', text: 'What specific concerns did they mention?', time: '10:45 AM', avatar: '/placeholder.svg' },
  { id: '4', user: 'Sarah Johnson', text: 'They were worried about the Q3 deliverables coinciding with their product launch.', time: '10:47 AM', avatar: '/placeholder.svg' },
  { id: '5', user: 'Lisa Wong', text: 'I think we can adjust the timeline to accommodate their launch. Maybe we can push some items to early Q4?', time: '10:50 AM', avatar: '/placeholder.svg' },
  { id: '6', user: 'You', text: "That's a good idea. I'll draft an email proposing the revised timeline.", time: '10:52 AM', avatar: '/placeholder.svg' },
  { id: '7', user: 'Sarah Johnson', text: 'Great! Can you highlight the benefits of the new schedule in your email?', time: '10:55 AM', avatar: '/placeholder.svg' },
  { id: '8', user: 'David Chen', text: 'Also mention that this won\'t affect our delivery quality or increase costs.', time: '10:56 AM', avatar: '/placeholder.svg' },
  { id: '9', user: 'You', text: "I'll include all of that. Should I send a draft to the team first for review?", time: '10:58 AM', avatar: '/placeholder.svg' },
  { id: '10', user: 'Sarah Johnson', text: 'Yes, please do. I want to make sure our messaging is consistent.', time: '11:00 AM', avatar: '/placeholder.svg' },
];

interface MessageHistoryProps {
  conversationId: string | null;
  onGenerateEmail: (messageContext: string) => void;
}

const MessageHistory = ({ conversationId, onGenerateEmail }: MessageHistoryProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change or conversation changes
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [conversationId]);

  if (!conversationId) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center text-muted-foreground">
          <p>Select a conversation to view messages</p>
        </div>
      </div>
    );
  }

  // Combine all messages to create context for email generation
  const generateContextForEmail = () => {
    const context = mockMessages.map(msg => `${msg.user}: ${msg.text}`).join('\n');
    onGenerateEmail(context);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b bg-white">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Message History</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={generateContextForEmail}
            className="text-slack-primary border-slack-primary"
          >
            <Clipboard className="h-4 w-4 mr-1" />
            Draft Email
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 space-y-4">
          {mockMessages.map((message) => (
            <div key={message.id} className={`flex ${message.user === 'You' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${message.user === 'You' ? 'bg-slack-secondary/10' : 'bg-white'} p-3 rounded-lg shadow-sm`}>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm">{message.user}</span>
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                </div>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessageHistory;
