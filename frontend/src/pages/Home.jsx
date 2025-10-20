import React from "react";
import { motion } from "framer-motion";
import { Sparkles, FileText, Brain, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-300 to-blue-300 overflow-hidden">
      {/* Animated Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6, scale: 1.1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-[700px] h-[700px] bg-purple-400/30 rounded-full blur-3xl -z-10"
      ></motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[90%] md:w-[70%] lg:w-[60%] bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-10 text-center flex flex-col items-center justify-center space-y-8"
      >
        {/* Logo + Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl font-extrabold text-indigo-700 flex items-center justify-center gap-2">
            <Sparkles className="text-yellow-500" size={32} />
            SkillSense AI
          </h1>
          <p className="text-gray-700 mt-3 text-lg font-medium">
            Your Smart Career Assistant for Resumes, Jobs, and Interviews 🚀
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <FeatureCard
            icon={<FileText className="text-indigo-600" size={32} />}
            title="Resume Analyzer"
            description="Upload your resume and get detailed feedback with ATS score and improvement tips."
            to="/analyzer"
            gradient="from-indigo-500 to-blue-500"
          />
          <FeatureCard
            icon={<Brain className="text-purple-600" size={32} />}
            title="AI Resume Maker"
            description="Create or edit your resume with AI assistance and beautiful formatting."
            to="/resume-maker"
            gradient="from-purple-500 to-pink-500"
          />
          <FeatureCard
            icon={<MessageSquare className="text-blue-600" size={32} />}
            title="AI Chat Assistant"
            description="Chat with SkillSense AI for career advice, interview help, or resume queries."
            to="/chat"
            gradient="from-blue-500 to-cyan-500"
          />
        </motion.div>

        {/* Footer Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 italic text-sm mt-4"
        >
          ✨ Empowering careers with intelligence and creativity.
        </motion.p>
      </motion.div>
    </div>
  );
};

// Reusable Feature Card
const FeatureCard = ({ icon, title, description, to, gradient }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 250 }}
    className="group"
  >
    <Link
      to={to}
      className={`flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg hover:shadow-xl transition transform`}
    >
      <div className="bg-white/30 rounded-full p-3 mb-3 group-hover:rotate-6 transition">
        {icon}
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-white/90">{description}</p>
    </Link>
  </motion.div>
);

export default Home;
