import { Calendar, CheckSquare, Puzzle, Share2 } from "lucide-react";

interface ChatInterfaceQuickActionButtonsProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
}

export default function ChatInterfaceQuickActionButtons({
  dict,
}: ChatInterfaceQuickActionButtonsProps) {
  return (
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
  );
}
