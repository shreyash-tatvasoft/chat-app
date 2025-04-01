// components/ThemeToggle.tsx
import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for user's preference from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  // Handle the toggle change
  const handleToggle = () => {
    setIsDarkMode((prev) => !prev);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
      <button
        onClick={handleToggle}
        className="relative w-20 h-10 bg-blue-500 rounded-full transition-all cursor-pointer"
      >
        <div
          className={`absolute top-1 w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-md transform transition-transform ${
            isDarkMode ? "translate-x-7 right-8" : "left-1"
          }`}
        >
          {isDarkMode ? (
            <SunIcon className="text-white m-0.5" />
          ) : (
            <MoonIcon className="text-black m-0.5" />
          )}
        </div>
      </button>
  );
};

export default ThemeToggle;
