import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, User, Bot, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hey there! I'm **SkillSense AI**, your career assistant. Ask me anything about resumes, interviews, or job prep!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.success) {
        const botMessage = {
          role: "assistant",
          content: data.reply || "🤖 Sorry, I couldn’t generate a reply.",
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "⚠️ Something went wrong. Try again!" },
        ]);
      }
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Connection failed. Please check if your backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-indigo-300 via-purple-300 to-blue-300">
      {/* Chat container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col w-full h-full backdrop-blur-lg bg-white/30 border-t border-white/30"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/30 bg-white/40 backdrop-blur-md shadow-md">
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
            <Sparkles className="text-yellow-500" />
            SkillSense AI Chat
          </h1>
          <span className="text-sm text-gray-700 italic">
            “Smart career assistant 🤖”
          </span>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="p-3 rounded-full bg-indigo-100 shadow">
                  <Bot size={22} className="text-indigo-600" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl text-sm max-w-[70%] shadow-md ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                }`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>
              </div>

              {msg.role === "user" && (
                <div className="p-3 rounded-full bg-indigo-100 shadow">
                  <User size={22} className="text-indigo-600" />
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-gray-600 pl-3">
              <Loader2 className="animate-spin" size={20} />
              <span>Thinking...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/30 bg-white/40 backdrop-blur-xl flex items-center gap-3">
          <textarea
            rows="1"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-white/80 rounded-full px-4 py-2 text-gray-800 resize-none focus:outline-none shadow-inner"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition"
          >
            {loading ? (
              <Loader2 size={22} className="animate-spin" />
            ) : (
              <Send size={22} />
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatPage;
