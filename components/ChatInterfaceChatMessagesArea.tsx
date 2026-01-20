import ReactMarkdown from "react-markdown";
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
          <div key={message.id} className="space-y-2">
            {/* Main message container */}
            {message.content && (
              <div className="relative">
                {/* Show floating blinking tools ONLY during active streaming (and NOT when content has started) */}
                {message.isStreaming &&
                  !message.hasContentStarted &&
                  message.intermediateTools &&
                  message.intermediateTools.length > 0 && (
                    <div className="flex justify-start mb-3 animate-in fade-in duration-200">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 w-fit to-orange-50 border border-amber-200 text-amber-900 rounded-full px-4 py-2 shadow-sm">
                        <div className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-fit rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                        </div>
                        <span className="text-xs font-medium">
                          {
                            message.intermediateTools[
                              message.intermediateTools.length - 1
                            ]?.tool
                          }
                        </span>
                      </div>
                    </div>
                  )}

                {/* Main message bubble */}
                <div
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
              </div>
            )}

            {/* Collapsible tools dropdown AFTER message (only when done or has content) */}
            {message.role === "assistant" &&
              message.hasContentStarted &&
              ((message.toolCalls?.length ?? 0) > 0 ||
                (message.intermediateTools?.length ?? 0) > 0) && (
                <details className="group ml-12">
                  <summary className="cursor-pointer list-none flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 transition-colors py-2">
                    <svg
                      className="w-4 h-4 transition-transform group-open:rotate-90"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <div className="flex items-center gap-2">
                      <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                      </div>
                      <span className="font-medium">
                        {(message.toolCalls?.length ?? 0) +
                          (message.intermediateTools?.length ?? 0)}{" "}
                        tool
                        {(message.toolCalls?.length ?? 0) +
                          (message.intermediateTools?.length ?? 0) >
                        1
                          ? "s"
                          : ""}{" "}
                        used
                      </span>
                    </div>
                    {message.processingTimeMs && (
                      <span className="text-gray-500">
                        · {(message.processingTimeMs / 1000).toFixed(2)}s
                      </span>
                    )}
                  </summary>
                  <div className="mt-2 ml-6 space-y-2 pb-2 w-fit">
                    {/* Show intermediate tools first */}
                    {message.intermediateTools?.map((tool, idx) => (
                      <div
                        key={`intermediate-${idx}`}
                        className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span className="text-xs font-medium text-amber-900">
                            {tool.tool}
                          </span>
                        </div>
                        {tool.input &&
                          typeof tool.input === "object" &&
                          "query" in tool.input && (
                            <div className="text-xs text-amber-700 ml-3.5">
                              &quot;{String(tool.input.query)}&quot;
                            </div>
                          )}
                      </div>
                    ))}
                    {/* Show final tool calls */}
                    {message.toolCalls?.map((tool, idx) => {
                      const toolInput = tool.tool_input as Record<
                        string,
                        unknown
                      > | null;
                      const hasQuery =
                        toolInput &&
                        typeof toolInput === "object" &&
                        "query" in toolInput;

                      return (
                        <div
                          key={idx}
                          className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span className="text-xs font-medium text-gray-700">
                              {tool.tool_name}
                            </span>
                          </div>
                          {hasQuery && toolInput && (
                            <div className="text-xs text-gray-600 ml-3.5">
                              &quot;{String(toolInput.query)}&quot;
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </details>
              )}
          </div>
        ))}
        {isLoading && !messages.some((m) => m.hasContentStarted) && (
          <ChatInterfaceThinkingBox />
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
