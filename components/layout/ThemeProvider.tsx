"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

let currentTheme: Theme = "dark";
const listeners = new Set<() => void>();

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

export const setTheme = (theme: Theme) => {
  currentTheme = theme;
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }
  emitChange();
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getClientSnapshot = () => currentTheme;
const getServerSnapshot = () => "dark" as Theme;

// Initialize theme on client-side only
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("theme") as Theme | null;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial: Theme = stored ?? (prefersDark ? "dark" : "light");

  if (initial !== currentTheme) {
    currentTheme = initial;
  }

  // Listen for system theme changes — only applies if user has no stored preference
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, setTheme, toggleTheme };
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
