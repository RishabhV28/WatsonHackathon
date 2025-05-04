
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data for conversations
const mockConversations = [
  { id: '1', name: 'marketing-team', unread: 3, time: '10:45 AM', lastMessage: 'Can someone review the campaign brief?', avatar: '👥' },
  { id: '2', name: 'sarah-johnson', unread: 0, time: 'Yesterday', lastMessage: 'Let me know when the proposal is ready', avatar: '👤' },
  { id: '3', name: 'project-alpha', unread: 12, time: 'Yesterday', lastMessage: 'The client approved the timeline!', avatar: '📁' },
  { id: '4', name: 'design-team', unread: 0, time: 'Monday', lastMessage: 'New brand assets are available in Drive', avatar: '🎨' },
  { id: '5', name: 'john-smith', unread: 0, time: 'Monday', lastMessage: 'Thanks for your help with the presentation', avatar: '👤' },
  { id: '6', name: 'tech-support', unread: 0, time: 'Last week', lastMessage: 'The server issues have been resolved', avatar: '🛠️' },
];

interface ConversationSelectorProps {
  onSelect: (id: string) => void;
  selectedId: string | null;
}

const ConversationSelector = ({ onSelect, selectedId }: ConversationSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState(mockConversations);

  useEffect(() => {
    // Filter conversations based on search term
    const filtered = mockConversations.filter(
      conv => conv.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setConversations(filtered);
  }, [searchTerm]);

  return (
    <div className="flex flex-col h-full border-r bg-gray-50">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search conversations"
            className="pl-8 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-3 hover:bg-gray-100 cursor-pointer transition-colors ${
                selectedId === conv.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => onSelect(conv.id)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slack-secondary/10 rounded text-lg">
                  {conv.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <span className="font-medium truncate">{conv.name}</span>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-slack-primary text-white flex items-center justify-center text-xs">
                    {conv.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversationSelector;
