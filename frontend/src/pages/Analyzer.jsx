import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileUp, Loader2, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import axios from "axios";

const Analyzer = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("⚠️ Please select a PDF file first!");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await axios.post("http://localhost:5000/api/uploadResume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setResult(res.data);
      } else {
        setError("⚠️ Could not analyze resume. Try another file.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("❌ Server error! Check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-300 to-blue-300 p-6 overflow-hidden">
      {/* Glow background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, scale: 1.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-[700px] h-[700px] bg-purple-400/30 rounded-full blur-3xl -z-10"
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[90%] md:w-[70%] lg:w-[60%] bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 flex flex-col items-center"
      >
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-indigo-700 flex items-center gap-2 mb-2">
          <Sparkles className="text-yellow-500" />
          Resume Analyzer
        </h1>
        <p className="text-gray-700 text-lg mb-6 text-center">
          Upload your resume and let <span className="font-semibold text-indigo-600">SkillSense AI</span> analyze it for improvements, ATS score, and keyword matching.
        </p>

        {/* File Upload Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="w-full flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 bg-white/40 backdrop-blur-md rounded-2xl p-8 shadow-inner cursor-pointer"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <input
            id="fileInput"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <FileUp size={48} className="text-indigo-600 mb-3" />
          <p className="text-gray-700 font-medium">
            {file ? file.name : "Click or drag your resume (PDF only)"}
          </p>
        </motion.div>

        {/* Upload Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpload}
          disabled={loading}
          className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 size={20} className="animate-spin" /> Analyzing...
            </div>
          ) : (
            "Analyze Resume"
          )}
        </motion.button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 flex items-center text-red-600 text-sm font-medium gap-2">
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        {/* Analysis Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 w-full bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/30"
          >
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="text-green-500" size={24} />
              <h2 className="text-2xl font-bold text-indigo-700">Analysis Summary</h2>
            </div>
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
              {result.summary || "✅ Resume successfully analyzed."}
            </p>

            {/* Example of ATS and Score Section */}
            {result.score && (
              <div className="mt-4">
                <p className="text-indigo-700 font-semibold">ATS Compatibility Score:</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full"
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-700 mt-1">{result.score}% match</p>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Analyzer;
