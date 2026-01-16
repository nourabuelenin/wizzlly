import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatInterface from "@/components/ChatInterface";

export default function Chat() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        <ChatHeader />
        <ChatInterface />
      </div>
    </div>
  );
}
