import {
  Plus,
  Star,
  MoreHorizontal,
  ChevronDown,
  MessageSquare,
  Sun,
  BarChart3,
  Sparkles,
} from "lucide-react";
import Logo from "./Logo";

const savedChats = [
  {
    icon: MessageSquare,
    title: "ChatAI",
    bg: "bg-blue-200",
    color: "text-blue-700",
  },
  {
    icon: Sun,
    title: "Image of sun",
    bg: "bg-yellow-200",
    color: "text-yellow-700",
  },
  {
    icon: BarChart3,
    title: "Data Analyst",
    bg: "bg-green-200",
    color: "text-green-700",
  },
];

const todayChats = [
  "How can I improve my time management skills effectively?",
  "What's the best way to learn a new skill from scratch?",
  "How do I start investing in stocks as a beginner?",
];

const yesterdayChats = [
  "What are the benefits of daily exercise to mental health?",
  "What's the difference between a UI designer and UX designer?",
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-64 h-screen bg-white border-r dark:bg-gray-900 dark:border-gray-700">
      {/* Logo */}
      <div className="flex items-center justify-center py-4">
        <Logo />
      </div>

      {/* New Chat */}
      <div className="px-4 pb-4 border-b dark:border-gray-700">
        <button className="flex items-center justify-center w-full gap-2 p-3 text-sm font-medium text-white bg-black rounded-full hover:opacity-90 cursor-pointer">
          <Plus className="w-4 h-4" />
          New chat
          <Sparkles className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Saved */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-gray-500 uppercase">
            <Star className="w-4 h-4" />
            Saved
          </div>

          <div className="space-y-1">
            {savedChats.map(({ icon: Icon, title, bg, color }) => (
              <button
                key={title}
                className="flex items-center justify-between w-full px-2 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${bg}`}
                  >
                    <Icon className={`w-4 h-4 ${color}`} />
                  </span>
                  <span className="truncate">{title}</span>
                </div>
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Chat Groups */}
        <ChatGroup title="Today" chats={todayChats} />
        <ChatGroup title="Yesterday" chats={yesterdayChats} />
      </div>

      {/* Upgrade */}
      <div className="p-4 border-t dark:border-gray-700 mt-auto">
        <button className="flex items-center justify-center w-full gap-2 px-3 py-2 text-sm font-semibold text-purple-700 bg-purple-100 rounded-lg hover:bg-purple-200 cursor-pointer">
          <Sparkles className="w-4 h-4" />
          Upgrade to Pro
        </button>
      </div>
    </aside>
  );
}

/* -------------------- */
/* Chat Group Component */
/* -------------------- */

function ChatGroup({ title, chats }: { title: string; chats: string[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-500 uppercase">
          {title}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400 cursor-pointer" />
      </div>

      <div className="space-y-1">
        {chats.map((chat) => (
          <button
            key={chat}
            className="w-full px-2 py-2 text-sm text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <span className="block truncate">{chat}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
