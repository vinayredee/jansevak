import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, X, MessageSquare, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: 'user' | 'bot';
  text: string;
};

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', text: 'Namaste! I am your Civic Assistant. How can I help you with government schemes or reporting an issue today?' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");

    // Mock AI Response
    setTimeout(() => {
      let botResponse = "I can help guide you to the right department. Please check the 'Schemes' page for more details.";
      const lowerInput = newUserMsg.text.toLowerCase();
      
      if (lowerInput.includes("road") || lowerInput.includes("pothole")) {
        botResponse = "For road issues, please file a report under the 'Infrastructure' sector in the Report Issue tab. Would you like me to take you there?";
      } else if (lowerInput.includes("scheme") || lowerInput.includes("loan")) {
        botResponse = "We have several schemes for financial assistance like PM Jan Dhan Yojana. You can filter them by 'Finance' in the Schemes section.";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        botResponse = "Namaste! How can I serve you today?";
      }

      const newBotMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', text: botResponse };
      setMessages(prev => [...prev, newBotMsg]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 z-50 w-[350px] shadow-2xl"
          >
            <Card className="border-primary/20 h-[500px] flex flex-col">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg p-4 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-full">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-medium">Civic AI Helper</CardTitle>
                    <p className="text-xs text-primary-foreground/80 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Online
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-primary-foreground hover:bg-white/20 h-8 w-8"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-hidden bg-muted/5 relative">
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#2A4365_1px,transparent_1px)] [background-size:16px_16px]" />
                <ScrollArea className="h-full p-4" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                          msg.role === 'user'
                            ? "ml-auto bg-primary text-primary-foreground"
                            : "bg-white border border-border shadow-sm"
                        )}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-3 bg-background border-t">
                <form 
                  className="flex w-full items-center gap-2"
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                >
                  <Input 
                    placeholder="Ask about schemes..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="focus-visible:ring-primary"
                  />
                  <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-background" />
          <Sparkles className="h-7 w-7" />
        </motion.button>
      )}
    </>
  );
}
