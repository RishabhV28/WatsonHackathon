
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, RotateCcw, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface EmailDraftProps {
  emailContent: string;
  onEmailContentChange: (content: string) => void;
  onRegenerateEmail: () => void;
}

const EmailDraft = ({ emailContent, onEmailContentChange, onRegenerateEmail }: EmailDraftProps) => {
  const [subject, setSubject] = useState('RE: Proposal Timeline Adjustment');
  const [to, setTo] = useState('client@example.com');
  const [tone, setTone] = useState('professional');
  const { toast } = useToast();
  
  const handleSend = () => {
    toast({
      title: "Email Prepared",
      description: "Your draft has been copied to clipboard and is ready to send from your email client.",
    });
    
    // Copy to clipboard
    navigator.clipboard.writeText(`To: ${to}\nSubject: ${subject}\n\n${emailContent}`);
  };
  
  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your email draft has been saved.",
    });
  };
  
  return (
    <div className="flex flex-col h-full border-l">
      <div className="p-3 border-b bg-white">
        <h3 className="font-medium">Email Draft</h3>
      </div>
      
      <div className="p-4 space-y-4 flex-1 overflow-auto">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">To:</label>
            <input 
              type="text" 
              value={to} 
              onChange={(e) => setTo(e.target.value)}
              className="w-full border rounded-md px-3 py-1.5 text-sm"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Subject:</label>
            <input 
              type="text" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border rounded-md px-3 py-1.5 text-sm"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">Message:</label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground mr-1">Tone:</span>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="w-[140px] h-8 text-xs">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Tabs defaultValue="edit">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="mt-2">
                <Textarea 
                  value={emailContent} 
                  onChange={(e) => onEmailContentChange(e.target.value)}
                  placeholder="Your email content will appear here"
                  className="min-h-[200px]"
                />
              </TabsContent>
              <TabsContent value="preview" className="mt-2">
                <div className="border rounded-md p-4 min-h-[200px] prose max-w-none">
                  {emailContent.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t bg-gray-50 mt-auto">
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onRegenerateEmail}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
          
          <div className="space-x-2">
            <Button 
              variant="outline"
              onClick={handleSaveDraft}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            
            <Button 
              className="bg-slack-primary hover:bg-slack-primary/90"
              onClick={handleSend}
            >
              <Send className="h-4 w-4 mr-2" />
              Prepare to Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDraft;
