import { Paperclip, Sparkles, Mic, Send, Loader } from "lucide-react";

interface ChatInterfaceChatInputProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export default function ChatInterfaceChatInput({
  dict,
  inputValue,
  onInputChange,
  onSend,
  isLoading,
}: ChatInterfaceChatInputProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSend();
  };

  return (
    <div className="px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm px-4 py-3 mb-3 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={dict.chat.interface.inputPlaceholder}
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400 disabled:opacity-50"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="px-3 py-1.5 text-sm shadow-lg border font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              <span>{dict.chat.interface.selectSource}</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="p-2 text-gray-600 shadow-lg border cursor-pointer hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <Paperclip className="w-5 h-5" />
                <span className="text-sm">{dict.chat.interface.attach}</span>
              </button>
              <button
                type="button"
                className="p-2 text-gray-600 shadow-lg border cursor-pointer hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <Mic className="w-5 h-5" />
                <span className="text-sm">{dict.chat.interface.voice}</span>
              </button>
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="p-2 bg-gray-900 shadow-lg border cursor-pointer text-white rounded-full hover:bg-gray-800 transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
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
        </form>

        <p className="text-xs text-gray-500 text-center">
          {dict.chat.interface.disclaimer}
        </p>
      </div>
    </div>
  );
}
