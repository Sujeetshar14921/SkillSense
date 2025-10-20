import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { saveAs } from "file-saver";

const ATSResult = ({ result }) => {
  const [improved, setImproved] = useState(null);

  useEffect(() => {
    if (result?.improvedResume) {
      setImproved(result.improvedResume);
    }
  }, [result]);

  const score = result?.score || 0;

  const downloadImproved = () => {
    if (!improved) return;
    const blob = new Blob([improved], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "Improved_Resume.txt");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* 🎯 Circular ATS Score */}
        <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar
            value={score}
            text={`${score}%`}
            styles={buildStyles({
              textColor: "#111827",
              pathColor: score >= 80 ? "#16a34a" : "#f97316",
              trailColor: "#e5e7eb",
              textSize: "18px",
            })}
          />
        </div>

        {/* 📊 Resume Summary */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            ATS Resume Score
          </h2>
          <p className="text-gray-600 mb-3">
            Your resume scored <b>{score}%</b> on the ATS analysis.
          </p>

          {score < 80 ? (
            <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded">
              <p className="text-orange-700 text-sm">
                Your resume could perform better in ATS scans. An improved version has been generated for you.
              </p>
              {improved && (
                <button
                  onClick={downloadImproved}
                  className="mt-3 px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Download Improved Resume
                </button>
              )}
            </div>
          ) : (
            <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
              <p className="text-green-700 text-sm">
                Excellent! Your resume is already optimized for ATS systems.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 📋 Extra Analysis Details */}
      {result?.details && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {Object.entries(result.details).map(([key, value]) => (
            <div key={key} className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold capitalize text-gray-700">
                {key.replace(/([A-Z])/g, " $1")}
              </h4>
              <p className="text-sm text-gray-600 mt-1">{value || "—"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ATSResult;
