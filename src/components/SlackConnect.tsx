
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ExternalLink } from 'lucide-react';

const SlackConnect = ({ onConnected }: { onConnected: () => void }) => {
  const [token, setToken] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = () => {
    if (!token) {
      toast({
        title: "Token Required",
        description: "Please enter your Slack API token to continue",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    // Simulate connection - in a real app this would validate with Slack API
    setTimeout(() => {
      localStorage.setItem('slackToken', token);
      toast({
        title: "Connected to Slack",
        description: "Successfully connected to your Slack workspace",
      });
      setIsConnecting(false);
      onConnected();
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <svg viewBox="0 0 24 24" height="24" width="24" className="mr-2">
            <path fill="#4A154B" d="M6.016 15.2764H9.0239V18.2843C9.0239 19.1575 8.3238 19.8576 7.4506 19.8576C6.5775 19.8576 5.8774 19.1575 5.8774 18.2843V15.2764H6.016ZM7.4506 4.1144C8.3238 4.1144 9.0239 4.8145 9.0239 5.6876V11.9912H7.4506C6.5775 11.9912 5.8774 11.2911 5.8774 10.418V5.6876C5.8774 4.8145 6.5775 4.1144 7.4506 4.1144ZM12.0229 10.418C12.0229 11.2911 11.3228 11.9912 10.4496 11.9912C9.5764 11.9912 8.8763 11.2911 8.8763 10.418C8.8763 9.5449 9.5764 8.8448 10.4496 8.8448H12.0229V10.418ZM13.5962 10.418C13.5962 9.5449 14.2963 8.8448 15.1694 8.8448C16.0426 8.8448 16.7427 9.5449 16.7427 10.418V13.4259C16.7427 14.2991 16.0426 14.9992 15.1694 14.9992C14.2963 14.9992 13.5962 14.2991 13.5962 13.4259V10.418ZM15.1694 7.2716C14.2963 7.2716 13.5962 6.5715 13.5962 5.6983C13.5962 4.8252 14.2963 4.1251 15.1694 4.1251H19.8998C20.773 4.1251 21.4731 4.8252 21.4731 5.6983C21.4731 6.5715 20.773 7.2716 19.8998 7.2716H15.1694ZM15.1694 8.8448C16.0426 8.8448 16.7427 9.5449 16.7427 10.418C16.7427 11.2911 16.0426 11.9912 15.1694 11.9912H13.5962V10.418C13.5962 9.5449 14.2963 8.8448 15.1694 8.8448ZM12.0229 13.4259C12.0229 14.2991 11.3228 14.9992 10.4496 14.9992C9.5764 14.9992 8.8763 14.2991 8.8763 13.4259C8.8763 12.5528 9.5764 11.8527 10.4496 11.8527H12.0229V13.4259ZM10.4496 16.5724C11.3228 16.5724 12.0229 17.2725 12.0229 18.1457C12.0229 19.0188 11.3228 19.7189 10.4496 19.7189H5.7191C4.8459 19.7189 4.1458 19.0188 4.1458 18.1457C4.1458 17.2725 4.8459 16.5724 5.7191 16.5724H10.4496Z" />
          </svg>
          Connect to Slack
        </CardTitle>
        <CardDescription>
          Connect your Slack workspace to enable the email assistant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm">Enter your Slack API token:</p>
            <Input 
              type="password" 
              value={token}
              onChange={(e) => setToken(e.target.value)} 
              placeholder="xoxb-your-token" 
            />
          </div>
          <div className="text-xs text-muted-foreground">
            <p>Don't have a token? <a href="https://api.slack.com/apps" target="_blank" rel="noopener noreferrer" className="text-slack-secondary hover:underline inline-flex items-center">
              Create a Slack App 
              <ExternalLink className="h-3 w-3 ml-1" />
            </a></p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleConnect} 
          className="w-full bg-slack-primary hover:bg-slack-primary/90"
          disabled={isConnecting}
        >
          {isConnecting ? "Connecting..." : "Connect Workspace"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SlackConnect;
