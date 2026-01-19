"use client";

import { useState, useRef, useEffect } from "react";
import {
  Paperclip,
  Sparkles,
  FileText,
  Calendar,
  CheckSquare,
  Puzzle,
  Share2,
  Mic,
  Send,
  MoreVertical,
  Loader,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ApiEndPoint } from "@/constants/api.constant";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
}

const mockBusinessProfile = {
  company_name: "Mova",
  website: null,
  product: {
    one_liner:
      "Egyptian streetwear brand specializing in anime-inspired hoodies, t-shirts, and apparel for anime fans",
    category: "Fashion & Apparel",
    offering_type: "physical_products",
    key_features: [
      "Anime-themed designs (Attack on Titan, Demon Slayer, Naruto, One Piece)",
      "High-quality cotton for Egyptian climate",
      "Local production with fast delivery",
      "Custom design requests",
    ],
  },
  icp: {
    primary_segment: "Egyptian anime fans aged 16-30",
    company_size: "N/A",
    buyer_roles: ["Anime enthusiasts", "Young adults", "Students"],
    industries: ["Fashion", "Pop culture"],
    pain_points: [
      "Limited anime merchandise availability in Egypt",
      "Poor quality prints that fade",
      "High international shipping costs",
      "Sizing issues with imported products",
    ],
    jobs_to_be_done: [
      "Express love for anime through fashion",
      "Find quality anime apparel locally",
      "Avoid expensive international shipping",
    ],
  },
  regions: {
    target_regions: ["Egypt"],
    languages: ["ar", "en"],
  },
  pricing_tier: {
    model: "direct_sales",
    tier: "Mid-range",
    price: "350-650 EGP per item",
    trial: null,
  },
  differentiators: [
    "Local Egyptian brand understanding local needs",
    "Fast delivery within Egypt",
    "Designs curated for Egyptian anime fans",
    "Affordable vs international imports",
  ],
  constraints: {
    brand_voice: "youthful, passionate, authentic to anime culture",
    compliance: [
      "Respect anime character licensing",
      "Culturally appropriate designs",
    ],
    style: {
      avoid_phrases: ["cheap knock-offs", "bootleg", "fake"],
    },
  },
  known_competitors: ["Otaku Egypt", "Anime Zone Cairo"],
  do_not_compare: ["Luxury fashion brands", "Generic printing shops"],
};

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
            {/* Blue Orb */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg animate-pulse"></div>
                <div className="absolute inset-0 w-20 h-20 rounded-full bg-blue-500 opacity-30 blur-xl"></div>
              </div>
            </div>

            {/* Top Text */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-3">
                <h1 className="text-4xl font-bold text-gray-900">
                  {dict.chat.interface.greeting}
                </h1>
                <Sparkles className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-lg text-gray-600">
                {dict.chat.interface.subtitle}
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ">
              {/* Card 1 - Assistant Card (Dark Mode) */}
              <div className="bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-800 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                    S
                  </div>
                  <div className="flex items-center justify-between gap-2 flex-1">
                    <h3 className="font-semibold text-white">
                      {dict.chat.interface.assistantCardTitle}
                    </h3>
                    <span className="px-2 py-1 bg-blue-500 text-white text-sm rounded-md">
                      {dict.chat.interface.assistantCardBadge}
                    </span>
                  </div>
                </div>
                <p className="text-base text-gray-200">
                  {dict.chat.interface.assistantCardDesc}
                </p>
              </div>

              {/* Card 2 - Tasks Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                    <FileText className="w-4 h-4" />
                    <span>{dict.chat.interface.taskExample1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                    <FileText className="w-4 h-4" />
                    <span>{dict.chat.interface.taskExample2}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                    <FileText className="w-4 h-4" />
                    <span>{dict.chat.interface.taskExample3}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-900">
                    {dict.chat.interface.tasksCard}
                  </span>
                  <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                    {dict.chat.interface.viewAllTasks}
                  </span>
                </div>
              </div>

              {/* Card 3 - Suggested Prompt */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative flex flex-col">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
                <p className="text-sm text-gray-700 mb-4 pr-6">
                  {dict.chat.interface.suggestedPromptText}
                </p>
                <div className="pt-3 border-t border-gray-100 mt-auto">
                  <span className="text-sm font-medium text-gray-900">
                    {dict.chat.interface.suggestedPrompt}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <button className="flex items-center gap-3 bg-white rounded-full p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {dict.chat.interface.connectCalendar}
                </span>
              </button>

              <button className="flex items-center gap-3 bg-white rounded-full p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckSquare className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {dict.chat.interface.demoTask}
                </span>
              </button>

              <button className="flex items-center gap-3 bg-white rounded-full p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Puzzle className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {dict.chat.interface.browseIntegrations}
                </span>
              </button>

              <button className="flex items-center gap-3 bg-white rounded-full p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {dict.chat.interface.sharedInNotes}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages Area - Show when there are messages */}
      {!showWelcomeScreen && (
        <div className="flex-1 overflow-y-auto px-4 py-8">
          <div className="w-full max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-2xl px-4 py-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-white text-gray-900 rounded-bl-none border border-gray-200"
                  }`}
                >
                  <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                    {message.role === "user" ? (
                      <p>{message.content}</p>
                    ) : (
                      <ReactMarkdown
                        components={{
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-base font-bold mt-3 mb-2"
                              {...props}
                            />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3
                              className="text-sm font-semibold mt-2 mb-1"
                              {...props}
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="mb-2" {...props} />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc list-inside mb-2 space-y-1"
                              {...props}
                            />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol
                              className="list-decimal list-inside mb-2 space-y-1"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="text-sm" {...props} />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong className="font-semibold" {...props} />
                          ),
                          em: ({ node, ...props }) => (
                            <em className="italic" {...props} />
                          ),
                          code: ({ node, ...props }) => (
                            <code
                              className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono"
                              {...props}
                            />
                          ),
                          blockquote: ({ node, ...props }) => (
                            <blockquote
                              className="border-l-4 border-gray-300 pl-3 italic my-2"
                              {...props}
                            />
                          ),
                          hr: ({ node, ...props }) => (
                            <hr className="my-3 border-gray-300" {...props} />
                          ),
                          a: ({ node, ...props }) => (
                            <a
                              className="text-blue-600 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-900 rounded-lg rounded-bl-none border border-gray-200 px-4 py-3 flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Chat Input Area */}
      <div className="px-4 pb-8  ">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm px-4 py-3 mb-3 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={dict.chat.interface.inputPlaceholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400 disabled:opacity-50"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="px-3 py-1.5 text-sm shadow-lg border font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <span>{dict.chat.interface.selectSource}</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  className="p-2 text-gray-600 shadow-lg border hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  <Paperclip className="w-5 h-5" />
                  <span className="text-sm">{dict.chat.interface.attach}</span>
                </button>
                <button
                  className="p-2 text-gray-600 shadow-lg border hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  <Mic className="w-5 h-5" />
                  <span className="text-sm">{dict.chat.interface.voice}</span>
                </button>
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="p-2 bg-gray-900 shadow-lg border text-white rounded-full hover:bg-gray-800 transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  <span className="text-sm">{dict.chat.interface.send}</span>
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center">
            {dict.chat.interface.disclaimer}
          </p>
        </div>
      </div>
    </main>
  );
}
