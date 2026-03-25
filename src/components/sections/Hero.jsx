"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Typewriter({ words }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let t;
    if (!deleting && displayed.length < word.length)
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 75);
    else if (!deleting && displayed.length === word.length)
      t = setTimeout(() => setDeleting(true), 2000);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    else { setDeleting(false); setIndex((i) => i + 1); }
    return () => clearTimeout(t);
  }, [displayed, deleting, index, words]);

  return (
    <span className="relative">
      <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">{displayed}</span>
      <span className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle animate-blink rounded-sm" />
    </span>
  );
}

/* Animated grid background */
function GridBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00D4FF" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Radial fade over grid */}
      <div className="absolute inset-0 bg-radial-fade" />
    </div>
  );
}

export default function Hero({ data }) {
  const hero = data || {};
  const name = hero.name || "Muslim Uddin MK";
  const titles = hero.titles || ["Full Stack Developer", "UI/UX Designer", "Creative Coder", "MK-777"];
  const bio = hero.bio || "Crafting high-performance digital experiences that rank, convert, and inspire.";
  const stats = hero.stats || [
    { label: "Projects", value: "50+" },
    { label: "Years Exp.", value: "3+" },
    { label: "Dedication", value: "100%" },
  ];
  const available = hero.availableForWork !== false;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const firstName = name.split(" ")[0];
  const restName = name.split(" ").slice(1).join(" ");

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#0B0B0C]"
    >
      <GridBg />

      {/* Mouse glow */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          x: glowX, y: glowY,
          left: "50%", top: "50%",
          translateX: "-50%", translateY: "-50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Corner glows */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-blue-700/8 blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-12 xl:gap-20 items-center">

          {/* ── LEFT ── */}
          <div className="space-y-7 max-w-2xl">

            {/* Status badge */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
              <span className="inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.25em] text-gray-400 uppercase bg-white/[0.04] border border-white/[0.08] px-5 py-2.5 rounded-full backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                {available ? "Available for work" : "Currently busy"}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
              <p className="text-gray-500 text-sm font-medium tracking-[0.4em] uppercase mb-3">Hello, I&apos;m</p>
              <h1 className="font-display font-black leading-[0.95] tracking-tight">
                <span className="block text-white text-5xl md:text-6xl xl:text-7xl">{firstName}</span>
                <span className="block text-white text-5xl md:text-6xl xl:text-7xl">{restName}</span>
                <span className="block mt-3 text-3xl md:text-4xl xl:text-5xl min-h-[1.2em]">
                  <Typewriter words={titles} />
                </span>
              </h1>
            </motion.div>

            {/* Bio */}
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
              className="text-gray-400 text-lg leading-relaxed max-w-lg font-light border-l-2 border-primary/40 pl-4"
            >
              {bio}
            </motion.p>

            {/* CTA buttons */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-4">
              <MagneticButton
                className="group inline-flex items-center gap-3 bg-primary text-black font-black text-[11px] uppercase tracking-widest py-4 px-8 rounded-full shadow-[0_0_30px_rgba(0,212,255,0.35)] hover:shadow-[0_0_50px_rgba(0,212,255,0.55)] hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View My Work
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </MagneticButton>
              <Link
                href="#contact"
                className="group inline-flex items-center gap-3 border border-white/10 text-white font-bold text-[11px] uppercase tracking-widest py-4 px-8 rounded-full hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-300"
              >
                Let&apos;s Talk
                <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show"
              className="flex gap-8 pt-2"
            >
              {stats.map((s, i) => (
                <div key={s.label} className="relative">
                  {i > 0 && <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10" />}
                  <div className="text-3xl font-display font-black text-primary drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">{s.value}</div>
                  <div className="text-[10px] text-gray-600 uppercase tracking-[0.2em] mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Outer decorative rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-primary/10 animate-spin-slow pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-dashed border-primary/15 animate-[spin-slow_30s_linear_infinite_reverse] pointer-events-none" />

            {/* Corner dots */}
            {["-top-2 -left-2", "-top-2 -right-2", "-bottom-2 -left-2", "-bottom-2 -right-2"].map((pos) => (
              <div key={pos} className={`absolute ${pos} w-3 h-3 rounded-full bg-primary/60 blur-[2px]`} />
            ))}

            <div className="relative w-[280px] h-[380px] lg:w-[320px] lg:h-[440px]">
              {/* Glow behind image */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/20 via-blue-500/10 to-transparent blur-3xl scale-110" />

              {/* Image frame */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden ring-1 ring-white/10 bg-[#0F1117]">
                {/* Scanline overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none"
                  style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)" }}
                />
                {hero.avatarUrl ? (
                  <Image
                    src={hero.avatarUrl}
                    alt={`${name} - Full Stack Web Developer`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#0F1117] to-[#161B26]">
                    <span className="text-7xl font-display font-black text-primary/20 select-none">MK</span>
                    <span className="text-xs text-gray-700 uppercase tracking-widest">No photo yet</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/60 via-transparent to-transparent" />
              </div>

              {/* Badge: Open to work */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-6 bg-[#0F1117] border border-white/10 rounded-2xl px-4 py-3 shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                  </div>
                  <span className="text-xs font-bold text-white">Open to work</span>
                </div>
              </motion.div>

              {/* Badge: Tech */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-6 bg-primary rounded-2xl px-4 py-3 shadow-[0_0_20px_rgba(0,212,255,0.4)]"
              >
                <span className="text-black font-display font-black text-sm">Next.js 15</span>
              </motion.div>

              {/* Side label */}
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2">
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-700 rotate-90 whitespace-nowrap">Portfolio 2025</span>
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom: Social links + scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex items-center justify-between mt-16 pt-8 border-t border-white/[0.05]"
        >
          <div className="flex items-center gap-6">
            {[
              { label: "GitHub", href: "https://github.com" },
              { label: "LinkedIn", href: "https://linkedin.com" },
              { label: "Twitter", href: "https://twitter.com" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-primary transition-colors duration-300"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-[9px] text-gray-700 uppercase tracking-[0.3em]">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
