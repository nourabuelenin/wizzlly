import ChatHeader from "@/components/ChatHeader";
import ChatInterface from "@/components/ChatInterface";
import Sidebar from "@/components/Sidebar";

export default function Chat() {
  return (
    <section>
      <Sidebar />
      <ChatHeader />
      <ChatInterface />
    </section>
  );
}
