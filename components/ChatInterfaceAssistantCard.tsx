interface ChatInterfaceAssistantCardProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
}

export default function ChatInterfaceAssistantCard({
  dict,
}: ChatInterfaceAssistantCardProps) {
  return (
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
  );
}
