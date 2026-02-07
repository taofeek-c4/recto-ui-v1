import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { cleanResponse } from "../pages/Workspace";

// Define the shape of a single message
export interface Message {
  role: "user" | "assistant";
  content: string;
}

// Define the props for the component
interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const parseMessage = (content: string) => {
    try {
      return JSON.parse(cleanResponse(content));
    } catch {
      return null;
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-0 overflow-y-auto max-h-100">
      {messages.map((msg, index) => {
        const parsed = parseMessage(msg.content);

        return (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200"
              }`}
            >
              {parsed?.ai_message ? (
                <ReactMarkdown>{parsed.ai_message}</ReactMarkdown>
              ) : (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
