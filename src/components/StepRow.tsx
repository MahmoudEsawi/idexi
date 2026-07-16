"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

interface StepRowProps {
  number: string;
  title: string;
  description: string;
}

export default function StepRow({ number, title, description }: StepRowProps) {
  return (
    <>
      <style>{stepRowCSS}</style>
      <div className="step-row">
        <div className="step-row-number">{number}</div>
        <div className="step-row-content">
          <h4 className="step-row-title">{title}</h4>
          <p className="step-row-desc">{description}</p>
        </div>
        <div className="step-row-action">
          <ChevronRight size={18} className="step-row-chevron" />
        </div>
      </div>
    </>
  );
}

const stepRowCSS = `
  .step-row {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    padding: 1.8rem 1rem;
    border-bottom: 1px solid rgba(49, 196, 243, 0.12);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .step-row::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(49, 196, 243, 0.03), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }

  .step-row:hover::before {
    opacity: 1;
  }

  .step-row:hover {
    border-bottom-color: rgba(49, 196, 243, 0.35);
    padding-left: 1.5rem;
    padding-right: 0.5rem;
  }

  .step-row-number {
    font-family: var(--font-headings);
    font-size: 2.2rem;
    font-weight: 800;
    color: var(--accent-cyan);
    opacity: 0.8;
    line-height: 1;
    min-width: 3.5rem;
    position: relative;
    z-index: 1;
  }

  .step-row-content {
    display: flex;
    flex-grow: 1;
    gap: 3rem;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .step-row-title {
    font-family: var(--font-headings);
    font-size: 1.15rem;
    font-weight: 700;
    color: #ffffff;
    min-width: 220px;
    margin: 0;
  }

  .step-row-desc {
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.6;
    flex-grow: 1;
  }

  .step-row-action {
    display: flex;
    align-items: center;
    color: var(--text-muted);
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
  }

  .step-row:hover .step-row-action {
    color: var(--accent-cyan);
    transform: translateX(4px);
  }

  .step-row-chevron {
    transition: transform 0.3s ease;
  }

  @media (max-width: 991px) {
    .step-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.5rem 0.5rem;
    }
    
    .step-row:hover {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }

    .step-row-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      width: 100%;
    }

    .step-row-title {
      min-width: unset;
    }

    .step-row-action {
      align-self: flex-end;
      margin-top: -1.5rem;
    }
  }
`;
