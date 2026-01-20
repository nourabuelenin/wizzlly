"use client";

import { useState, useRef, useEffect } from "react";
import { mockBusinessProfile } from "@/data/mockBusinessProfile";
import ChatInterfaceGreetings from "./ChatInterfaceGreetings";
import ChatInterfaceCardsGrid from "./ChatInterfaceCardsGrid";
import ChatInterfaceQuickActionButtons from "./ChatInterfaceQuickActionButtons";
import ChatInterfaceChatMessagesArea from "./ChatInterfaceChatMessagesArea";
import ChatInterfaceChatInput from "./ChatInterfaceChatInput";
import ChatInterfaceThinkingBox from "./ChatInterfaceThinkingBox";

interface ToolCall {
  tool_name: string;
  tool_input: Record<string, unknown>;
  tool_output: unknown;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolCalls?: ToolCall[];
  processingTimeMs?: number;
  intermediateTools?: Array<{ tool: string; input: Record<string, unknown> }>;
  isStreaming?: boolean;
  hasContentStarted?: boolean;
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
  const isSendingRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isSendingRef.current) return;

    isSendingRef.current = true;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random()}`,
      role: "user",
      content: inputValue,
    };

    const updatedMessages = [...messages, userMessage];

    setInputValue("");
    setMessages(updatedMessages);
    setIsLoading(true);

    // Call API with the new messages array
    await sendToApi(updatedMessages);
  };

  const sendToApi = async (currentMessages: ChatMessage[]) => {
    const messageId = `msg-${Date.now()}-${Math.random()}`;
    let accumulatedContent = "";
    let toolCalls: ToolCall[] = [];
    let processingTimeMs = 0;
    let hasStartedStreaming = false;
    let hasContentStarted = false;
    const intermediateTools: Array<{
      tool: string;
      input: Record<string, unknown>;
    }> = [];

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_id: `mova-${++requestIdCounter.current}`,
          conversation_id: conversationId.current,
          messages: currentMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          business_profile: mockBusinessProfile,
          options: {
            stream: true,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body");
      }

      const decoder = new TextDecoder();
      const assistantMessage: ChatMessage = {
        id: messageId,
        role: "assistant",
        content: "",
        toolCalls: [],
        intermediateTools: [],
        isStreaming: true,
        hasContentStarted: false,
      };

      // Add empty assistant message while streaming
      setMessages((prev) => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);

            if (data === "[DONE]") {
              continue;
            }

            try {
              const event = JSON.parse(data);

              if (event.type === "token") {
                // First token marks start of streaming
                if (!hasStartedStreaming) {
                  hasStartedStreaming = true;
                  hasContentStarted = true;
                }

                // Accumulate text tokens
                accumulatedContent += event.content;
                // Update message with new content
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === messageId
                      ? {
                          ...msg,
                          content: accumulatedContent,
                          isStreaming: true,
                          hasContentStarted: true,
                        }
                      : msg,
                  ),
                );
              } else if (event.type === "tool_start") {
                // Track intermediate tool usage
                intermediateTools.push({
                  tool: event.tool,
                  input: event.input || {},
                });

                // Update message to show intermediate tools
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === messageId
                      ? {
                          ...msg,
                          intermediateTools: [...intermediateTools],
                        }
                      : msg,
                  ),
                );
              } else if (event.type === "tool_result") {
                // Tool completed - just log for now
                console.log("Tool completed:", event.tool);
              } else if (event.type === "final") {
                // Final response with metadata
                accumulatedContent = event.content || accumulatedContent;
                toolCalls = event.tool_calls || [];
                processingTimeMs = event.processing_time_ms || 0;

                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === messageId
                      ? {
                          ...msg,
                          content: accumulatedContent,
                          toolCalls,
                          processingTimeMs,
                          isStreaming: false,
                          intermediateTools: [],
                        }
                      : msg,
                  ),
                );
              } else if (event.type === "error") {
                throw new Error(event.error);
              }
            } catch (e) {
              if (e instanceof SyntaxError) {
                // Not a JSON line, skip
                continue;
              }
              throw e;
            }
          }
        }
      }
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
      isSendingRef.current = false;
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
        onSend={sendMessage}
        isLoading={isLoading}
      />
    </main>
  );
}
