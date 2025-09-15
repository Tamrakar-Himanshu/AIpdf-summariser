import React from "react";

const ContentSection = ({
  title,
  points,
}: {
  title: string;
  points: string[];
}) => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-2xl shadow-lg p-8 mb-8 border border-blue-100">
      <ul className="space-y-4">
        {points.map((point, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 bg-white/80 rounded-lg shadow-sm px-4 py-3 hover:bg-blue-50 transition-colors border-l-4 border-blue-300"
          >
            <span className="mt-1 text-blue-500">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" fill="#3B82F6" />
              </svg>
            </span>
            <span className="text-gray-800 text-xs sm:text-base">{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ContentSection;
