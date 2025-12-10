'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, MessageSquare, Send, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { learningTopics } from '@/lib/data';
import { aiChatbotAssistance, AIChatbotAssistanceInput } from '@/ai/flows/ai-chatbot-assistance';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Combine all learning materials into a single string for context
const learningMaterial = learningTopics.map(topic => `Topic: ${topic.title}\nContent:\n${topic.content}`).join('\n\n---\n\n');

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI assistant. Ask me anything about machine learning or deep learning.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const aiInput: AIChatbotAssistanceInput = {
            question: input,
            learningMaterial: learningMaterial,
        }
        const response = await aiChatbotAssistance(aiInput);
        const assistantMessage: Message = { role: 'assistant', content: response.answer };
        setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
        console.error('Error getting AI response:', error);
        const errorMessage: Message = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-primary shadow-lg hover:bg-primary/90 focus-visible:ring-primary"
        aria-label="Open Chatbot"
      >
        <MessageSquare className="h-8 w-8 text-primary-foreground" />
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col">
          <SheetHeader className="px-4 pt-4">
            <SheetTitle className="font-headline flex items-center gap-2">
              <Bot /> AI Assistant
            </SheetTitle>
            <SheetDescription>
              Your personal guide to ML and DL concepts.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="flex-1 px-4">
            <div className="flex flex-col gap-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 border border-primary/50">
                      <AvatarFallback className="bg-primary/20 text-primary">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-xs rounded-lg p-3 text-sm md:max-w-sm',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                   {message.role === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className='border-border'>
                        U
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-3 justify-start">
                    <Avatar className="h-8 w-8 border border-primary/50">
                      <AvatarFallback className="bg-primary/20 text-primary">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-card border border-border rounded-lg p-3 flex items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <SheetFooter className="px-4 pb-4">
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a question..."
                disabled={isLoading}
                autoComplete="off"
              />
              <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
