
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

// In a real app, this would call an API that connects to IBM's Granite model
const generateEmailWithAI = async (context: string, model: string, tone: string): Promise<string> => {
  console.log(`Generating email with ${model} using ${tone} tone`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response based on tone
  if (tone === 'professional') {
    return `Dear Client,\n\nThank you for your feedback on our proposal. We understand your concerns regarding the timeline, particularly how the Q3 deliverables might coincide with your upcoming product launch.\n\nAfter reviewing our project schedule, we would like to propose a revised timeline that shifts some deliverables to early Q4. This adjustment would provide better alignment with your product launch while ensuring we maintain our high-quality standards without additional costs.\n\nI've outlined the key benefits of this revised schedule below:\n- Prevents resource conflicts during your critical launch period\n- Maintains our quality commitment and original budget\n- Provides additional time for feedback integration\n\nPlease review this proposal and let us know if it addresses your concerns. We're happy to discuss further adjustments as needed.\n\nBest regards,\nYour Project Team`;
  } else if (tone === 'friendly') {
    return `Hi there,\n\nThanks so much for sharing your thoughts on our proposal! I totally understand your worries about the timeline, especially with your big product launch coming up in Q3.\n\nI think we've got a great solution - we can shift some of our deliverables to early Q4, which would give your team more breathing room during the launch while still keeping us on track. The best part? No extra costs or quality compromises!\n\nHere's why I think this works better:\n- You won't be stretched thin during your launch (we know how hectic those can be!)\n- We'll still deliver the same great work at the same price\n- There's more time to incorporate your feedback along the way\n\nWhat do you think? Does this work better for your team? I'm happy to jump on a quick call to talk through the details if that's easier.\n\nCheers,\nThe Project Team`;
  } else {
    return `Dear Valued Client,\n\nI am writing in reference to your feedback regarding our proposal timeline. We acknowledge your concerns about the Q3 deliverable schedule conflicting with your product launch activities.\n\nUpon careful consideration, we would like to present a modified timeline for your review. The revised schedule proposes relocating specific deliverables to the beginning of Q4, thereby creating a more advantageous alignment with your product launch schedule.\n\nThis modification offers several notable benefits:\n1. Elimination of resource conflicts during your critical launch period\n2. Maintenance of our quality standards and original financial terms\n3. Extension of the feedback integration period\n\nPlease review this proposed adjustment at your earliest convenience. We remain available to discuss any further refinements that may better serve your requirements.\n\nYours sincerely,\nProject Management Team`;
  }
};

export const useEmailDraft = () => {
  const [emailContent, setEmailContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentContext, setCurrentContext] = useState('');
  const [selectedModel, setSelectedModel] = useState('ibm-granite-13b');
  const { toast } = useToast();

  const generateEmail = async (messageContext: string, tone: string = 'professional') => {
    setIsGenerating(true);
    setCurrentContext(messageContext);
    
    try {
      const generatedEmail = await generateEmailWithAI(messageContext, selectedModel, tone);
      setEmailContent(generatedEmail);
      toast({
        title: "Email Generated",
        description: "Your draft email has been created based on the conversation",
      });
    } catch (error) {
      console.error('Error generating email:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerateEmail = async (tone: string = 'professional') => {
    if (currentContext) {
      generateEmail(currentContext, tone);
    } else {
      toast({
        title: "No Context Available",
        description: "Please select a conversation first to generate an email",
        variant: "destructive",
      });
    }
  };

  return {
    emailContent,
    setEmailContent,
    isGenerating,
    generateEmail,
    regenerateEmail,
    selectedModel,
    setSelectedModel,
  };
};
