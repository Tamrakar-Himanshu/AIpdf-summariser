import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-purple-700 to-blue-500 text-white py-8 px-4 mt-16 shadow-2xl pb-16 sm:pb-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-10">
        {/* Brand */}
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#fff" fillOpacity="0.12" />
            <circle cx="20" cy="20" r="13" fill="#fff" fillOpacity="0.22" />
            <text
              x="20"
              y="27"
              textAnchor="middle"
              fontSize="20"
              fill="#fff"
              fontWeight="bold"
            >
              S
            </text>
          </svg>
          <span className="font-extrabold text-2xl tracking-wider drop-shadow-lg">
            Sumareise
          </span>
        </div>
        {/* Socials & Support */}
        <div className="flex flex-col items-start gap-4 w-full md:w-auto">
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-blue-300 transition"
            >
              <svg
                width="26"
                height="26"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 5.924c-.793.352-1.646.59-2.54.697a4.48 4.48 0 0 0 1.965-2.475 8.94 8.94 0 0 1-2.828 1.08A4.48 4.48 0 0 0 11.07 9.03c0 .352.04.695.116 1.022C7.728 9.89 4.1 8.1 1.67 5.149a4.48 4.48 0 0 0-.606 2.254c0 1.555.792 2.927 2.002 3.733a4.47 4.47 0 0 1-2.03-.561v.057a4.48 4.48 0 0 0 3.6 4.393c-.193.052-.397.08-.607.08-.148 0-.292-.014-.432-.04a4.48 4.48 0 0 0 4.184 3.112A8.98 8.98 0 0 1 2 19.13a12.67 12.67 0 0 0 6.86 2.01c8.23 0 12.74-6.82 12.74-12.74 0-.194-.004-.387-.013-.578A9.1 9.1 0 0 0 24 4.59a8.93 8.93 0 0 1-2.57.705z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="hover:text-blue-300 transition"
            >
              <svg
                width="26"
                height="26"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
              </svg>
            </a>
          </div>
          <div className="text-sm text-blue-100 space-y-1">
            <div>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:sumareise.help@gmail.com"
                className="np-underline hover:text-blue-200"
              >
                DevHiXu@gmail.com
              </a>
            </div>
            <div>
              <span className="font-semibold">Support:</span>{" "}
              <a href="#" className="underline hover:text-blue-200">
                Help Center
              </a>
            </div>
            <div>
              <span className="font-semibold">Contact:</span>{" "}
              <a
                href="tel:+1234567890"
                className="underline hover:text-blue-200"
              >
                +1 234 567 890
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-blue-100 tracking-wide">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold">Sumareise</span>. All rights reserved.
      </div>
    </footer>
  );
};
