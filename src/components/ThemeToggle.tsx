"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const STORAGE_KEY = "idexi-theme";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    // Deliberately reads the DOM attribute the no-flash inline script (see
    // layout.tsx) already applied, one time, after mount — this syncs React
    // state to match SSR-less client truth and avoids a hydration mismatch,
    // which is the standard pattern for theme toggles.
    const current = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  if (!theme) {
    // Avoid rendering an icon that could mismatch the theme the inline
    // no-flash script already applied before hydration.
    return <button className="theme-toggle" aria-hidden="true" style={{ visibility: "hidden" }} />;
  }

  return (
    <>
      <style>{toggleCSS}</style>
      <button
        type="button"
        className="theme-toggle"
        onClick={toggle}
        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      >
        {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
      </button>
    </>
  );
}

const toggleCSS = `
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: var(--st-radius-full);
    border: 1px solid var(--st-outline-variant);
    background: var(--st-surface-container-high);
    color: var(--st-on-surface);
    cursor: pointer;
    padding: 0;
    transition: var(--transition-smooth);
    flex-shrink: 0;
  }
  .theme-toggle:hover {
    background: var(--st-surface-container-highest);
    border-color: var(--st-outline);
  }
`;
