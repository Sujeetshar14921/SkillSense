import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Analyzer from "./pages/Analyzer";
import ChatPage from "./pages/ChatPage";
import Generated from "./pages/Generated";
import ResumeMaker from "./pages/ResumeMaker";
import Loader from "./components/Loader";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6 max-w-6xl mx-auto">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/generated" element={<Generated />} />
            <Route path="/resume-maker" element={<ResumeMaker />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
