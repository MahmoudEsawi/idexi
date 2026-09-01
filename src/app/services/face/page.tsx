"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ServiceComparison from "@/components/ServiceComparison";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const steps = [
  {
    title: "Quick Guest Selfie",
    desc: "Guests take a 3-second selfie and leave their email at registration.",
  },
  {
    title: "AI Photo Matching",
    desc: "As photographers upload event shots, idexi Face indexes every face automatically.",
  },
  {
    title: "Private Inbox Delivery",
    desc: "Each guest receives a private link to their own photos before dessert is served.",
  },
];

const faceAudiences = [
  {
    id: "galas",
    title: "Gala Dinners & Weddings",
    image: "/face-gala-wedding.jpg",
    desc: "Candid emotional moments delivered to couples and table guests before the evening ends.",
  },
  {
    id: "summits",
    title: "Corporate Summits & Keynotes",
    image: "/face-corporate-summit.jpg",
    desc: "Instant high-res stage photos delivered to keynote speakers the moment they finish speaking.",
  },
  {
    id: "sports",
    title: "Concerts, Festivals & Sports",
    image: "/face-music-festival.jpg",
    desc: "Fast facial indexing across dynamic arena crowds, so action shots reach guests while the event is still running.",
  },
];

function FaceCleanVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Browser policy: autoplay requires programmatic muted property
    video.muted = true;
    video.defaultMuted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback retry
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, []);

  return (
    <div className="face-video-wrapper" aria-hidden="true">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="face-hero-video"
        src="/face-demo-video.mp4"
      />
    </div>
  );
}

export default function FaceService() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="service-page-container">
      <style>{faceCSS}</style>
      <div className="container service-page-content">
        <div className="service-breadcrumb">
          <Link href="/" className="service-back-link">
            <ArrowLeft size={16} /> Back to Overview
          </Link>
          <span className="service-breadcrumb-sep" aria-hidden="true">/</span>
          <span className="service-breadcrumb-current">
            <Camera size={14} /> idexi Face
          </span>
        </div>

        {/* Hero */}
        <div className="service-hero-grid face-hero">
          <div className="service-info-col">
            <h1 className="service-title">Your Event Photos, Delivered Instantly</h1>
            <p className="service-description">
              Guests take a quick selfie at registration. Once photographers upload event photos, idexi Face matches
              every face and delivers each guest a private link to their own gallery.
            </p>
            <div className="service-cta-row">
              <Link href="/#contact" className="st-btn st-btn-primary">Book a Demo <ArrowRight size={16} /></Link>
            </div>
          </div>

          <motion.div
            className="service-visual-frame face-video-frame"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <FaceCleanVideo />
          </motion.div>
        </div>

        {/* How it works */}
        <div className="service-section">
          <h2 className="service-subsection-title">How it works</h2>
          <div className="service-process">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                className="service-process-step"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="service-process-number">0{idx + 1}</span>
                <h3 className="service-process-title">{step.title}</h3>
                <p className="service-process-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Proof Bento */}
        <div className="service-bento-section">
          <div className="service-bento">
            <div className="service-bento-feature">
              <span className="service-bento-feature-stat">One selfie. One email.</span>
              <p className="service-bento-feature-desc">
                From registration selfie to private photos landing directly in their inbox.
              </p>
            </div>
            <div className="service-bento-card">
              <ShieldCheck size={22} style={{ color: "var(--st-secondary)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">Privacy by design</h3>
              <p className="service-bento-card-desc">
                Matching runs on dedicated event infrastructure. You stay in full control.
              </p>
            </div>
            <div className="service-bento-card">
              <Workflow size={22} style={{ color: "var(--st-secondary)", marginBottom: "0.75rem" }} />
              <h3 className="service-bento-card-title">Zero app downloads</h3>
              <p className="service-bento-card-desc">
                Delivered via email link. Guests never have to install an app.
              </p>
            </div>
          </div>
        </div>

        {/* Clean, Visual Who Is It For */}
        <ServiceComparison product="face" />

        <div className="service-section">
          <h2 className="service-subsection-title">Who is it for?</h2>
          <div className="face-audience-grid">
            {faceAudiences.map((aud) => (
              <div key={aud.id} className="face-audience-card">
                <div className="face-aud-media">
                  <Image
                    src={aud.image}
                    alt={aud.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="face-aud-img"
                  />
                  <div className="face-aud-scrim" />
                </div>
                <div className="face-aud-content">
                  <h3 className="face-aud-title">{aud.title}</h3>
                  <p className="face-aud-desc">{aud.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const faceCSS = `
  .face-hero {
    align-items: center;
  }

  /* ── CLEAN VIDEO HERO DISPLAY ── */
  .face-video-frame {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    box-shadow: none !important;
  }

  .face-video-wrapper {
    position: relative;
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
    border-radius: 1.5rem;
    overflow: hidden;
    background: transparent;
    box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.5);
  }

  .face-hero-video {
    width: 100%;
    height: auto;
    max-height: 480px;
    display: block;
    object-fit: cover;
    border-radius: 1.5rem;
    background: transparent;
  }

  /* ── CLEAN AUDIENCE CARDS ── */
  .face-audience-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .face-audience-card {
    position: relative;
    border-radius: var(--st-radius-xl);
    overflow: hidden;
    background: var(--st-surface-container-low);
    border: 1px solid var(--st-outline-variant);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, border-color 0.3s ease;
  }

  .face-audience-card:hover {
    transform: translateY(-4px);
    border-color: var(--st-secondary);
  }

  .face-aud-media {
    position: relative;
    width: 100%;
    height: 200px;
  }
  .face-aud-img {
    object-fit: cover;
  }
  .face-aud-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(13, 18, 32, 0.95) 100%);
  }

  .face-aud-content {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .face-aud-title {
    font-family: var(--st-font-display);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--st-on-background);
    margin: 0;
  }
  .face-aud-desc {
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--st-on-surface-variant);
    margin: 0;
  }

  @media (max-width: 991px) {
    .face-audience-grid {
      grid-template-columns: 1fr;
    }
    .face-hero {
      align-items: stretch;
    }
  }
`;
