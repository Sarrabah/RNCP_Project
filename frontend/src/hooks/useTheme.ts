import { useState, useEffect } from "react";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useTheme = (): ThemeState => {
  const [isDark, setIsDark] = useState<boolean>(false); // Start with light theme

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return;

    try {
      // Check localStorage for saved theme preference
      const savedTheme = localStorage.getItem("art-crea-theme");
      if (savedTheme) {
        const isDarkSaved = savedTheme === "dark";
        setIsDark(isDarkSaved);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        setIsDark(prefersDark);
      }
    } catch (error) {
      console.warn("Could not load theme preference:", error);
    }
  }, []);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return;

    try {
      // Save theme preference to localStorage
      localStorage.setItem("art-crea-theme", isDark ? "dark" : "light");

      // Update document classes with higher specificity
      const root = document.documentElement;
      const body = document.body;

      // Remove all theme classes first
      root.classList.remove("dark-theme", "light-theme");
      body.classList.remove("dark-theme", "light-theme");

      if (isDark) {
        root.classList.add("dark-theme");
        body.classList.add("dark-theme");
        // Force styles directly
        root.style.background =
          "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)";
        body.style.background =
          "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)";
        body.style.color = "#ffffff";
      } else {
        root.classList.add("light-theme");
        body.classList.add("light-theme");
        // Force styles directly
        root.style.background =
          "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)";
        body.style.background =
          "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)";
        body.style.color = "#0f172a";
      }

      console.log("Theme changed to:", isDark ? "dark" : "light"); // Debug log
    } catch (error) {
      console.warn("Could not save theme preference:", error);
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return {
    isDark,
    toggleTheme,
  };
};
