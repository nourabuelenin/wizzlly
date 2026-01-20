import { Zap } from "lucide-react";

interface ToolCall {
  tool_name: string;
  tool_input: Record<string, unknown>;
  tool_output: unknown;
}

interface ChatInterfaceThinkingBoxProps {
  toolCalls?: ToolCall[];
  processingTimeMs?: number;
}

export default function ChatInterfaceThinkingBox({
  toolCalls = [],
  processingTimeMs,
}: ChatInterfaceThinkingBoxProps) {
  if (toolCalls.length === 0) {
    return (
      <div className="flex justify-start">
        <div className="bg-gray-100 text-gray-900 rounded-lg rounded-bl-none border border-gray-300 px-4 py-3 flex items-center gap-2 opacity-60">
          <Zap className="w-4 h-4 animate-pulse" />
          <span className="text-sm">Thinking...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-2xl bg-gray-100 text-gray-900 rounded-lg rounded-bl-none border border-gray-300 px-4 py-3 opacity-60">
        <div className="space-y-2">
          {toolCalls.map((tool, idx) => {
            const toolInput = tool.tool_input as Record<string, unknown> | null;
            const hasQuery =
              toolInput &&
              typeof toolInput === "object" &&
              "query" in toolInput;

            return (
              <div key={idx} className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-amber-600" />
                  <span className="font-medium text-gray-700">
                    {tool.tool_name}
                  </span>
                </div>
                {hasQuery && toolInput && (
                  <div className="ml-5 text-xs text-gray-600">
                    <p>Query: &quot;{String(toolInput.query)}&quot;</p>
                  </div>
                )}
              </div>
            );
          })}
          {processingTimeMs && (
            <div className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-300">
              Processing time: {(processingTimeMs / 1000).toFixed(2)}s
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
