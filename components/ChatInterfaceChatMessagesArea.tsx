import { useEffect, useRef } from "react";
import { Loader } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceChatMessagesAreaProps {
  messages: ChatMessage[];
  isLoading: boolean;
  messagesEndRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ChatInterfaceChatMessagesArea({
  messages,
  isLoading,
  messagesEndRef,
}: ChatInterfaceChatMessagesAreaProps) {
  return (
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
  );
}
