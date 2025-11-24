import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

const FAQ_RESPONSES: Record<string, string> = {
    "hello": "Hello! Welcome to Digital Public Seva. How can I assist you today?",
    "hi": "Hi there! I'm here to help you with your public grievances. What would you like to know?",
    "how to report": "To report an issue:\n1. Go to 'Report Issue' page\n2. Fill in your state and district\n3. Select the sector (Roads, Water, Electricity, etc.)\n4. Choose priority level\n5. Add description and photos\n6. Submit!",
    "report": "To report an issue, click on 'Report Issue' in the navigation menu. You'll need to login first if you haven't already.",
    "track complaint": "You can track your complaints on the Dashboard page. Login to see all your submitted issues and their current status.",
    "track": "Login and go to Dashboard to track all your complaints and see their current status (Pending, In Progress, or Resolved).",
    "status": "To check complaint status, login and visit your Dashboard. You'll see all your complaints with their current status.",
    "admin": "To access admin features, login with your admin password (9346144693) on the login page.",
    "login": "Click on 'Login' in the top navigation bar. If you're an admin, enter your admin password (9346144693) in the admin password field.",
    "register": "Click on 'Login' in the navigation, then switch to the 'Register' tab to create a new account.",
    "schemes": "Visit the Schemes page to see all available government schemes. Currently, we have 12 major schemes listed including PM Kisan, Ayushman Bharat, and more. This feature is coming soon!",
    "contact": "For urgent issues, you can add your phone number and email when reporting a complaint. We'll notify you via SMS or email based on your preferences.",
    "priority": "When reporting an issue, you can set priority as:\n• Critical - Requires immediate attention\n• High - Important issues\n• Medium - Standard issues\n• Low - Minor concerns",
    "sectors": "You can report issues in these sectors:\n• Roads & Infrastructure\n• Water Supply\n• Electricity\n• Sanitation\n• Healthcare\n• Education\n• Public Transport\n• Street Lights\n• Drainage",
    "help": "I can help you with:\n• Reporting issues\n• Tracking complaints\n• Finding government schemes\n• Admin access\n• Login/Register\n• Understanding priority levels\n• Available sectors\n\nJust ask me anything!",
    "default": "I'm here to help! You can ask me about reporting issues, tracking complaints, government schemes, or admin access. Type 'help' to see what I can do.",
};

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! I'm your Digital Public Seva assistant. How can I help you today?\n\nQuick options:\n• How to report an issue\n• Track my complaints\n• Government schemes\n• Login help",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");

    const getBotResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        return FAQ_RESPONSES["default"];
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: messages.length + 1,
            text: input,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages([...messages, userMessage]);
        setInput("");

        // Simulate bot response delay
        setTimeout(() => {
            const botResponse: Message = {
                id: messages.length + 2,
                text: getBotResponse(input),
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    const handleQuickAction = (action: string) => {
        setInput(action);
        setTimeout(() => handleSend(), 100);
    };

    return (
        <>
            {/* Chatbot Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="fixed bottom-6 right-6 z-50"
                    >
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-[#FF9933] via-[#FFFFFF] to-[#138808] hover:shadow-3xl transition-all duration-300"
                            size="icon"
                        >
                            {/* Custom Support Icon */}
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-[#000080] flex items-center justify-center">
                                    <Bot className="h-6 w-6 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            </div>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chatbot Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
                    >
                        <Card className="shadow-2xl border-2" style={{ borderColor: "var(--color-navy)" }}>
                            <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] rounded-t-lg">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#000080] flex items-center justify-center">
                                        <Bot className="h-5 w-5 text-white" />
                                    </div>
                                    <CardTitle className="text-lg font-bold" style={{ color: "var(--color-navy)" }}>AI Assistant</CardTitle>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="h-8 w-8 hover:bg-gray-200/50"
                                    style={{ color: "var(--color-navy)" }}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <ScrollArea className="h-96 p-4">
                                    <div className="space-y-4">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                                                    }`}
                                            >
                                                <div
                                                    className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user"
                                                        ? "bg-[#000080] text-white"
                                                        : "bg-gray-100 text-gray-900"
                                                        }`}
                                                >
                                                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                                                    <p className="text-xs opacity-70 mt-1">
                                                        {message.timestamp.toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>

                                {/* Quick Action Buttons */}
                                <div className="px-4 py-2 border-t bg-gray-50 dark:bg-gray-800">
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleQuickAction("How to report")}
                                            className="text-xs"
                                        >
                                            📝 Report Issue
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleQuickAction("Track")}
                                            className="text-xs"
                                        >
                                            📊 Track Status
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleQuickAction("Help")}
                                            className="text-xs"
                                        >
                                            ❓ Help
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-4 border-t">
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Type your question..."
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            className="flex-1"
                                        />
                                        <Button
                                            onClick={handleSend}
                                            size="icon"
                                            className="bg-[#000080] hover:bg-[#000066] text-white"
                                        >
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
