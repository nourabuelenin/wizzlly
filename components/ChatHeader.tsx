import { Settings, Share2, Plus, Sparkles } from "lucide-react";

export default function ChatHeader() {
  return (
    <header className="py-5 shrink-0 px-4 flex items-center justify-between border-b">
      {/* Left */}
      <div className="flex items-center gap-2">
        <p className="font-medium">Wizlly GPT</p>
        <span className="text-xs font-semibold text-gray-700 border px-2 py-0.5 rounded-full">
          Plus
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border hover:bg-gray-100 cursor-pointer">
          <Settings className="w-4 h-4" />
          Configuration
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border hover:bg-gray-100 cursor-pointer">
          <Share2 className="w-4 h-4" />
          Share
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full bg-black text-white hover:opacity-90 cursor-pointer">
          <Sparkles className="w-4 h-4" />
          New Chat
        </button>
      </div>
    </header>
  );
}
