"use client";

import { useState, useRef, useEffect } from "react";
import { Loader } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ApiEndPoint } from "@/constants/api.constant";
import { mockBusinessProfile } from "@/data/mockBusinessProfile";
import ChatInterfaceGreetings from "./ChatInterfaceGreetings";
import ChatInterfaceCardsGrid from "./ChatInterfaceCardsGrid";
import ChatInterfaceQuickActionButtons from "./ChatInterfaceQuickActionButtons";
import ChatInterfaceChatMessagesArea from "./ChatInterfaceChatMessagesArea";
import ChatInterfaceChatInput from "./ChatInterfaceChatInput";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
}

export default function ChatInterface({ dict }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationId = useRef(`mova-session-${Date.now()}`);
  const requestIdCounter = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random()}`,
      role: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://134.209.30.66:6060"}${ApiEndPoint.chatCompletions}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_id: `mova-${++requestIdCounter.current}`,
          conversation_id: conversationId.current,
          messages: [
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            {
              role: "user",
              content: userMessage.content,
            },
          ],
          business_profile: mockBusinessProfile,
          options: {
            stream: false,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random()}`,
        role: "assistant",
        content: data.response || data.message || "No response received",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat API error:", error);
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random()}`,
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showWelcomeScreen = messages.length === 0;

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 flex flex-col">
      {/* Welcome Screen - Only show when no messages */}
      {showWelcomeScreen && (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-5xl">
            <ChatInterfaceGreetings dict={dict} />
            <ChatInterfaceCardsGrid dict={dict} />
            <ChatInterfaceQuickActionButtons dict={dict} />
          </div>
        </div>
      )}

      {/* Chat Messages Area - Show when there are messages */}
      {!showWelcomeScreen && (
        <ChatInterfaceChatMessagesArea
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />
      )}

      {/* Chat Input Area */}
      <ChatInterfaceChatInput
        dict={dict}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onKeyPress={handleKeyPress}
        onSend={sendMessage}
        isLoading={isLoading}
      />
    </main>
  );
}
