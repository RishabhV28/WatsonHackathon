
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Bot, Cpu } from "lucide-react";

interface AIModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const AIModelSelector = ({ selectedModel, onModelChange }: AIModelSelectorProps) => {
  return (
    <div className="p-4 bg-gray-50 border-b">
      <div className="flex items-center mb-2">
        <Cpu className="h-4 w-4 mr-2 text-slack-primary" />
        <h3 className="font-medium text-sm">AI Model Selection</h3>
      </div>
      
      <RadioGroup
        value={selectedModel}
        onValueChange={onModelChange}
        className="grid grid-cols-2 gap-2"
      >
        <div className="flex items-start space-x-2">
          <RadioGroupItem value="ibm-granite-13b" id="ibm-granite" />
          <div className="grid gap-1">
            <Label htmlFor="ibm-granite" className="font-medium">
              IBM Granite
            </Label>
            <span className="text-xs text-muted-foreground">
              13B parameter model, professional tone
            </span>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <RadioGroupItem value="ibm-granite-20b" id="ibm-granite-large" />
          <div className="grid gap-1">
            <Label htmlFor="ibm-granite-large" className="font-medium">
              IBM Granite Large
            </Label>
            <span className="text-xs text-muted-foreground">
              20B parameter model, more nuanced
            </span>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default AIModelSelector;
