"use client";

import React, { useEffect, useState, useCallback } from "react";
import { X, Sparkles, Terminal, Code2, ExternalLink, ShieldCheck } from "lucide-react";

export default function ArchitectEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  // 1. Console Greeting
  useEffect(() => {
    const consoleStylesTitle = [
      "color: #00f0ff",
      "background: #0d1117",
      "font-size: 16px",
      "font-weight: bold",
      "padding: 8px 14px",
      "border-radius: 6px 0 0 6px",
      "border-left: 4px solid #00f0ff",
    ].join(";");

    const consoleStylesSub = [
      "color: #a855f7",
      "background: #0d1117",
      "font-size: 13px",
      "font-weight: 600",
      "padding: 8px 14px",
      "border-radius: 0 6px 6px 0",
    ].join(";");

    console.log(
      "%cidexi%c⚡ Engineered with precision by Mahmoud Al-Esawi (@MahmoudEsawi)",
      consoleStylesTitle,
      consoleStylesSub
    );
    console.log(
      "%c✨ Architectural Stack: Next.js 15 App Router • React 19 • Framer Motion • Stitch Design System",
      "color: #38bdf8; font-size: 11px; padding: 4px;"
    );
    console.log(
      "%c💡 Tip: Type 'idexi' or 'esawi' on your keyboard to reveal the architect HUD.",
      "color: #94a3b8; font-style: italic; font-size: 11px; padding: 2px;"
    );
  }, []);

  // 2. Secret Keystroke Listener ("idexi", "esawi", "mahmoud")
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ignore keystrokes in input or textarea
    const target = e.target as HTMLElement;
    if (
      target &&
      (target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable)
    ) {
      return;
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      return;
    }

    const char = e.key.toLowerCase();
    if (/^[a-z]$/.test(char)) {
      setKeySequence((prev) => {
        const next = [...prev, char].slice(-10);
        const str = next.join("");
        if (
          str.includes("idexi") ||
          str.includes("esawi") ||
          str.includes("mahmoud")
        ) {
          setIsOpen(true);
          return [];
        }
        return next;
      });
    }
  }, []);

  // 3. Custom Event Listener for click triggers (e.g., from footer or badge)
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    const handleCustomTrigger = () => setIsOpen(true);
    window.addEventListener("idexi:architect-easter-egg", handleCustomTrigger);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("idexi:architect-easter-egg", handleCustomTrigger);
    };
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="architect-egg-backdrop"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Architect Secret Overlay"
    >
      <style>{easterEggCSS}</style>
      <div
        className="architect-egg-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow & Scanlines */}
        <div className="architect-glow-orb" />
        <div className="architect-grid-overlay" />

        {/* Top Header */}
        <div className="architect-header">
          <div className="architect-badge">
            <Terminal size={14} className="architect-icon-pulse" />
            <span>SECRET PROTOCOL UNLOCKED</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="architect-close-btn"
            aria-label="Close easter egg"
          >
            <X size={18} />
          </button>
        </div>

        {/* Avatar & Title */}
        <div className="architect-profile-row">
          <div className="architect-avatar-wrap">
            <div className="architect-avatar-ring" />
            <div className="architect-avatar-inner">
              <Code2 size={32} color="#00f0ff" />
            </div>
          </div>
          <div className="architect-info">
            <div className="architect-role-tag">
              <Sparkles size={13} color="#a855f7" />
              <span>Lead Frontend Architect & UI/UX Designer</span>
            </div>
            <h2 className="architect-name">Mahmoud Al-Esawi</h2>
            <p className="architect-handle">@MahmoudEsawi</p>
          </div>
        </div>

        {/* Description Body */}
        <div className="architect-body">
          <p className="architect-text">
            Designed and engineered with high-velocity aesthetics, fluid micro-interactions, and next-generation performance architecture for live event intelligence.
          </p>

          <div className="architect-metrics-grid">
            <div className="architect-metric-pill">
              <span className="metric-label">Stack</span>
              <span className="metric-val">Next.js 15 & React 19</span>
            </div>
            <div className="architect-metric-pill">
              <span className="metric-label">Engine</span>
              <span className="metric-val">Framer Motion & CSS Tokens</span>
            </div>
            <div className="architect-metric-pill">
              <span className="metric-label">Aesthetics</span>
              <span className="metric-val">Stitch Dual-Theme Design</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="architect-actions">
          <a
            href="https://github.com/MahmoudEsawi"
            target="_blank"
            rel="noopener noreferrer"
            className="architect-btn architect-btn-primary"
          >
            <span>GitHub Profile</span>
            <ExternalLink size={15} />
          </a>
          <a
            href="https://github.com/MahmoudEsawi/idexi"
            target="_blank"
            rel="noopener noreferrer"
            className="architect-btn architect-btn-secondary"
          >
            <ShieldCheck size={15} />
            <span>Repository</span>
          </a>
        </div>
      </div>
    </div>
  );
}

const easterEggCSS = `
  .architect-egg-backdrop {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background: rgba(5, 7, 18, 0.82);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    animation: eggFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes eggFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .architect-egg-card {
    position: relative;
    width: 100%;
    max-width: 520px;
    background: linear-gradient(135deg, rgba(13, 17, 34, 0.95), rgba(7, 10, 22, 0.98));
    border: 1px solid rgba(0, 240, 255, 0.3);
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 240, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    border-radius: 1.5rem;
    padding: 2rem;
    overflow: hidden;
    color: #f1f5f9;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    animation: eggCardScale 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes eggCardScale {
    from { transform: scale(0.92) translateY(12px); opacity: 0; }
    to { transform: scale(1) translateY(0); opacity: 1; }
  }

  .architect-glow-orb {
    position: absolute;
    top: -100px;
    right: -100px;
    width: 260px;
    height: 260px;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(0, 240, 255, 0.15) 50%, transparent 70%);
    pointer-events: none;
    filter: blur(35px);
  }

  .architect-grid-overlay {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(0, 240, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.04) 1px, transparent 1px);
    background-size: 24px 24px;
    pointer-events: none;
  }

  .architect-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 2;
  }

  .architect-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.75rem;
    background: rgba(0, 240, 255, 0.1);
    border: 1px solid rgba(0, 240, 255, 0.3);
    border-radius: 9999px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #00f0ff;
    text-transform: uppercase;
  }

  .architect-icon-pulse {
    animation: eggPulse 1.8s infinite ease-in-out;
  }

  @keyframes eggPulse {
    0%, 100% { opacity: 0.5; transform: scale(0.95); }
    50% { opacity: 1; transform: scale(1.1); }
  }

  .architect-close-btn {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #94a3b8;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .architect-close-btn:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.4);
    color: #f87171;
  }

  .architect-profile-row {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 1.25rem;
    position: relative;
    z-index: 2;
  }

  .architect-avatar-wrap {
    position: relative;
    width: 64px;
    height: 64px;
    flex-shrink: 0;
  }

  .architect-avatar-ring {
    position: absolute;
    inset: -3px;
    border-radius: 1rem;
    background: linear-gradient(135deg, #00f0ff, #a855f7);
    animation: eggSpin 6s linear infinite;
  }

  @keyframes eggSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .architect-avatar-inner {
    position: absolute;
    inset: 1px;
    background: #0b0e1b;
    border-radius: calc(1rem - 4px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .architect-role-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: #c084fc;
    margin-bottom: 0.25rem;
  }

  .architect-name {
    font-family: 'Outfit', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    letter-spacing: -0.02em;
  }

  .architect-handle {
    font-size: 0.85rem;
    color: #64748b;
    margin: 0;
  }

  .architect-body {
    position: relative;
    z-index: 2;
    margin-bottom: 1.5rem;
  }

  .architect-text {
    font-size: 0.92rem;
    line-height: 1.55;
    color: #cbd5e1;
    margin-bottom: 1rem;
  }

  .architect-metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.65rem;
  }

  .architect-metric-pill {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 0.75rem;
    padding: 0.65rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .metric-label {
    font-size: 0.68rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #64748b;
  }

  .metric-val {
    font-size: 0.78rem;
    font-weight: 600;
    color: #38bdf8;
  }

  .architect-actions {
    display: flex;
    gap: 0.75rem;
    position: relative;
    z-index: 2;
  }

  .architect-btn {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .architect-btn-primary {
    background: linear-gradient(135deg, #00d2ff, #0066ff);
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(0, 102, 255, 0.35);
  }

  .architect-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 102, 255, 0.55);
  }

  .architect-btn-secondary {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #e2e8f0;
  }

  .architect-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.25);
    color: #ffffff;
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    .architect-metrics-grid {
      grid-template-columns: 1fr;
    }
    .architect-actions {
      flex-direction: column;
    }
  }
`;
