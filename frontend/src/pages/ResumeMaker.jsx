import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Palette,
  FileText,
  Bold,
  Italic,
  Underline,
  Download,
  Sparkles,
  Wand2,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";

const ResumeMaker = () => {
  const [content, setContent] = useState("");
  const [fontSize, setFontSize] = useState(14);
  const [fontColor, setFontColor] = useState("#222");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);
  const resumeRef = useRef();

  // ✅ Generate resume using AI
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/generateResume", {
        prompt: "Generate a professional software developer resume template.",
      });
      setContent(res.data.resume || "⚠️ Unable to generate resume. Try again!");
    } catch (err) {
      console.error(err);
      setContent("❌ Error generating resume. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Download resume as PDF
  const handleDownload = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Generated_Resume.pdf");
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-indigo-300 via-purple-300 to-blue-300">
      {/* Header */}
      <div className="p-4 border-b border-white/30 bg-white/40 backdrop-blur-md flex items-center justify-between shadow-md">
        <h1 className="text-3xl font-extrabold text-indigo-700 flex items-center gap-2">
          <Sparkles className="text-yellow-500" /> Resume Maker / Editor
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow hover:shadow-xl transition"
          >
            <Wand2 size={18} />
            {loading ? "Generating..." : "Generate Resume"}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full shadow hover:shadow-xl transition"
          >
            <Download size={18} /> Download PDF
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* Left Side - Editor */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col flex-1 bg-white/50 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-4"
        >
          <h2 className="text-lg font-semibold text-indigo-700 mb-3 flex items-center gap-2">
            <FileText size={20} /> Resume Editor
          </h2>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-3 bg-white/60 p-2 rounded-xl shadow-inner">
            <button
              onClick={() => document.execCommand("bold")}
              className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200"
              title="Bold"
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => document.execCommand("italic")}
              className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200"
              title="Italic"
            >
              <Italic size={16} />
            </button>
            <button
              onClick={() => document.execCommand("underline")}
              className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200"
              title="Underline"
            >
              <Underline size={16} />
            </button>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700">Font Size:</label>
              <input
                type="number"
                min="10"
                max="30"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <Palette size={16} />
              <input
                type="color"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Background:</span>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>

            <button
              onClick={() => setContent("")}
              className="ml-auto bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600"
            >
              Clear All
            </button>
          </div>

          {/* Text Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write or edit your resume here..."
            className="flex-1 w-full p-3 rounded-xl bg-white/70 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner"
            style={{ fontSize: `${fontSize}px`, color: fontColor }}
          />
        </motion.div>

        {/* Right Side - Live Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col flex-1 bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-6 overflow-y-auto"
        >
          <h2 className="text-lg font-semibold text-indigo-700 mb-3 flex items-center gap-2">
            <Save size={20} /> Live Preview
          </h2>

          <div
            ref={resumeRef}
            className="w-full min-h-[90%] rounded-xl shadow-lg p-6 transition-all"
            style={{
              backgroundColor: bgColor,
              color: fontColor,
              fontSize: `${fontSize}px`,
            }}
          >
            <pre className="whitespace-pre-wrap">{content}</pre>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeMaker;
