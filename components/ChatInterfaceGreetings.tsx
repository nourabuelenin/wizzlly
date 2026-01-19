import { Sparkles } from "lucide-react";

interface ChatInterfaceGreetingsProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
}

export default function ChatInterfaceGreetings({
  dict,
}: ChatInterfaceGreetingsProps) {
  return (
    <div>
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
        <p className="text-lg text-gray-600">{dict.chat.interface.subtitle}</p>
      </div>
    </div>
  );
}
