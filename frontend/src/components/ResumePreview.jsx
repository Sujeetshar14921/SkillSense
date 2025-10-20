import React, { useRef } from "react";

/**
 * ResumePreview.jsx
 * -----------------
 * Displays a nicely formatted preview of the generated resume.
 * Includes options to download or print.
 * You can integrate this later with your AI backend to update live content.
 */

export default function ResumePreview({ resumeData }) {
  const printRef = useRef();

  if (!resumeData || !resumeData.text) {
    return (
      <div className="p-6 bg-gray-100 text-gray-500 text-center rounded-lg">
        ⚠️ No resume content available. Please generate a resume first.
      </div>
    );
  }

  const handleDownload = () => {
    const blob = new Blob([resumeData.text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "AI_Optimized_Resume.txt";
    link.click();
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Resume Preview</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
            h1, h2, h3 { color: #1e3a8a; margin-bottom: 0; }
            hr { border: none; border-top: 1px solid #ddd; margin: 10px 0; }
            section { margin-bottom: 16px; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-600">Resume Preview</h2>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
          >
            Print
          </button>
        </div>
      </div>

      {/* Resume Content */}
      <div
        ref={printRef}
        className="border border-gray-200 rounded-lg p-4 bg-gray-50 whitespace-pre-wrap text-sm"
      >
        {resumeData.text}
      </div>
    </div>
  );
}
