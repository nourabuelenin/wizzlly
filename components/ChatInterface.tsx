import {
  Paperclip,
  Sparkles,
  FileText,
  Calendar,
  CheckSquare,
  Puzzle,
  Share2,
  Mic,
  Send,
  MoreVertical,
} from "lucide-react";

interface ChatInterfaceProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
}

export default function ChatInterface({ dict }: ChatInterfaceProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl">
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
            <p className="text-lg text-gray-600">
              {dict.chat.interface.subtitle}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ">
            {/* Card 1 - Assistant Card (Dark Mode) */}
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

          {/* Quick Action Buttons */}
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
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm px-4 py-3 mb-3">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={dict.chat.interface.inputPlaceholder}
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <button className="px-3 py-1.5 text-sm shadow-lg border font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1">
                <span>{dict.chat.interface.selectSource}</span>
              </button>

              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-600 shadow-lg border hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1">
                  <Paperclip className="w-5 h-5" />
                  <span className="text-sm">{dict.chat.interface.attach}</span>
                </button>
                <button className="p-2 text-gray-600 shadow-lg border hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1">
                  <Mic className="w-5 h-5" />
                  <span className="text-sm">{dict.chat.interface.voice}</span>
                </button>
                <button className="p-2 bg-gray-900 shadow-lg border text-white rounded-full hover:bg-gray-800 transition-colors flex items-center gap-1">
                  <Send className="w-5 h-5" />
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
    </main>
  );
}
