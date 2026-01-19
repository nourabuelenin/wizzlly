import { Paperclip, Sparkles, Mic, Send, Loader } from "lucide-react";

interface ChatInterfaceChatInputProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  inputValue: string;
  onInputChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSend: () => void;
  isLoading: boolean;
}

export default function ChatInterfaceChatInput({
  dict,
  inputValue,
  onInputChange,
  onKeyPress,
  onSend,
  isLoading,
}: ChatInterfaceChatInputProps) {
  return (
    <div className="px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm px-4 py-3 mb-3 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={dict.chat.interface.inputPlaceholder}
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyPress={onKeyPress}
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
                onClick={onSend}
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
  );
}
