import React, { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FileText, Save, Sparkles, Loader2 } from "lucide-react";
import html2pdf from "html2pdf.js";

const ResumeMaker = () => {
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const resumeRef = useRef();

  // ✨ Generate resume using backend AI
  const handleGenerateResume = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: `
        Create a professional resume for a computer science student.
        Include: Contact, Summary, Technical Skills, Education, Projects, and Certifications.
        Keep it ATS-friendly and well structured.`,
      });
      setResumeText(res.data.reply || "");
    } catch (err) {
      console.error("AI Resume Generation Error:", err);
      alert("❌ Failed to generate resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 💾 Download as PDF
  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    if (!element) return alert("Resume not found to download!");

    const opt = {
      margin: 10,
      filename: "SkillSense_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  // ✏️ Simple toolbar formatting commands
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center py-10 px-6">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold text-indigo-700 mb-3"
      >
        🧠 SkillSense Resume Maker
      </motion.h1>

      <p className="text-gray-600 mb-8 text-center max-w-xl">
        Create and edit your resume with AI + Google Docs–style formatting tools.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6"
      >
        {/* Header Controls */}
        <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
          <h2 className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
            <FileText className="w-5 h-5" /> Resume Editor
          </h2>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleGenerateResume}
              disabled={loading}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              Generate with AI
            </button>

            <button
              onClick={() => setEditing(!editing)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition ${
                editing
                  ? "bg-gray-600 hover:bg-gray-700"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {editing ? "Close Editor" : "Edit Resume"}
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <Save className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>

        {/* Toolbar (visible only in Edit mode) */}
        {editing && (
          <div className="flex flex-wrap gap-2 border-b border-gray-300 pb-3 mb-4 bg-gray-50 rounded-md px-3 py-2 shadow-sm">
            <button
              onClick={() => execCommand("bold")}
              className="px-2 py-1 rounded hover:bg-indigo-100 font-semibold"
            >
              <b>B</b>
            </button>
            <button
              onClick={() => execCommand("italic")}
              className="px-2 py-1 rounded hover:bg-indigo-100 italic"
            >
              I
            </button>
            <button
              onClick={() => execCommand("underline")}
              className="px-2 py-1 rounded hover:bg-indigo-100 underline"
            >
              U
            </button>
            <button
              onClick={() => execCommand("insertUnorderedList")}
              className="px-2 py-1 rounded hover:bg-indigo-100"
            >
              • Bullets
            </button>
            <button
              onClick={() => execCommand("insertOrderedList")}
              className="px-2 py-1 rounded hover:bg-indigo-100"
            >
              1. List
            </button>
            <button
              onClick={() => execCommand("justifyLeft")}
              className="px-2 py-1 rounded hover:bg-indigo-100"
            >
              ⬅ Left
            </button>
            <button
              onClick={() => execCommand("justifyCenter")}
              className="px-2 py-1 rounded hover:bg-indigo-100"
            >
              ⬌ Center
            </button>
            <button
              onClick={() => execCommand("justifyRight")}
              className="px-2 py-1 rounded hover:bg-indigo-100"
            >
              ➡ Right
            </button>
            <button
              onClick={() => execCommand("removeFormat")}
              className="px-2 py-1 rounded hover:bg-red-100 text-red-600"
            >
              ✖ Clear
            </button>
          </div>
        )}

        {/* Editor or Viewer */}
        {editing ? (
          <div
            className="border rounded-lg p-4 min-h-[400px] focus:outline-none"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setResumeText(e.currentTarget.innerHTML)}
            dangerouslySetInnerHTML={{
              __html:
                resumeText || "<p>Start typing or use AI to generate content...</p>",
            }}
          />
        ) : (
          <div
            ref={resumeRef}
            className="border rounded-lg p-6 shadow-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: resumeText || "<p>Your resume will appear here...</p>",
            }}
          />
        )}
      </motion.div>

      <footer className="mt-8 text-gray-400 text-sm">
        Made with 💙 by SkillSense AI
      </footer>
    </div>
  );
};

export default ResumeMaker;
