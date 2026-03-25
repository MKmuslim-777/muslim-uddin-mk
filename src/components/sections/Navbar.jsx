"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["home", "about", "projects", "experience", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-[#0B0B0C]/85 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-0.5 select-none">
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-1"
            >
              <span className="font-display font-black text-2xl tracking-tight">
                <span className="text-primary drop-shadow-[0_0_12px_rgba(0,212,255,0.7)]">MK</span>
                <span className="text-white/20 mx-0.5">—</span>
                <span className="text-white">777</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav — pill container */}
          <nav className="hidden lg:flex items-center bg-white/[0.04] border border-white/[0.08] rounded-full px-2 py-1.5 gap-1 backdrop-blur-sm">
            {links.map((l) => {
              const id = l.href.replace("#", "");
              const isActive = active === id;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setActive(id)}
                  className="relative px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-primary" : "text-gray-400 hover:text-white"}`}>
                    {l.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2 relative overflow-hidden group bg-primary text-black text-[11px] font-black uppercase tracking-widest py-2.5 px-6 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:scale-105"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
              <span className="relative">Hire Me</span>
              <span className="relative text-base leading-none">↗</span>
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors"
              aria-label="Toggle menu"
            >
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} className="block w-5 h-[1.5px] bg-white origin-center transition-all" />
              <motion.span animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }} className="block w-5 h-[1.5px] bg-white" />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} className="block w-5 h-[1.5px] bg-white origin-center transition-all" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#0F1117]/95 backdrop-blur-2xl border-b border-white/[0.06]"
          >
            <div className="container mx-auto px-6 py-5 flex flex-col gap-1">
              {links.map((l, i) => {
                const id = l.href.replace("#", "");
                const isActive = active === id;
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => { setOpen(false); setActive(id); }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                        isActive
                          ? "text-primary bg-primary/10 border border-primary/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pt-3 border-t border-white/5 mt-2">
                <Link
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 bg-primary text-black font-black text-sm uppercase tracking-widest py-3 rounded-xl w-full"
                >
                  Hire Me ↗
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
