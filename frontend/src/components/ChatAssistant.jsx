import React, { useState } from "react";
import api from "../utils/api";

const ChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await api.post("/chat", { message: input });
      const aiReply = res.data.reply || "No response received.";
      setMessages([...newMessages, { role: "ai", text: aiReply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "ai", text: "⚠️ Failed to connect to AI server." },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        💬 SkillSense AI Assistant
      </h2>

      <div className="h-64 overflow-y-auto border rounded-lg p-3 mb-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 p-2 rounded-lg ${
              msg.role === "user"
                ? "bg-indigo-100 text-right"
                : "bg-gray-200 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <p className="text-sm text-gray-500 italic text-center">AI typing...</p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
