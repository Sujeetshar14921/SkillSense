import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Brain } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const loc = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🧭 Detect scroll to change navbar background dynamically
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/analyzer", label: "Analyzer" },
    { path: "/chat", label: "AI Chat" },
    { path: "/resume-maker", label: "Resume Maker" },
  ];

  return (
    <>
      <header
        className={`w-full fixed top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg backdrop-blur-md"
            : "bg-gradient-to-r from-indigo-500/80 via-purple-500/80 to-pink-400/80 backdrop-blur-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-white">
          {/* Logo / Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Brain className="text-yellow-300" size={28} />
            <Link to="/" className="text-2xl font-extrabold tracking-wide">
              SkillSense <span className="text-yellow-300">AI</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center font-medium text-sm">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 rounded-md transition-all duration-200 ${
                  loc.pathname === item.path
                    ? "bg-white/20 text-yellow-300 font-semibold shadow-inner"
                    : "hover:text-yellow-200"
                }`}
              >
                {item.label}
                {loc.pathname === item.path && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-300 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white hover:text-yellow-300 transition-all"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/10 backdrop-blur-md text-white flex flex-col items-center gap-4 py-4 font-medium"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 w-40 text-center rounded-md ${
                  loc.pathname === item.path
                    ? "bg-white/20 text-yellow-300 font-semibold"
                    : "hover:text-yellow-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </header>

      {/* 🚀 This padding ensures content doesn't hide behind navbar */}
      <div className="pt-[80px]" />
    </>
  );
};

export default Navbar;
