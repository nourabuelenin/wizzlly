import { FileText, MoreVertical } from "lucide-react";
import ChatInterfaceAssistantCard from "./ChatInterfaceAssistantCard";

interface ChatInterfaceCardsGridProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
}

export default function ChatInterfaceCardsGrid({
  dict,
}: ChatInterfaceCardsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Card 1 - Assistant Card */}
      <ChatInterfaceAssistantCard dict={dict} />

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
  );
}
