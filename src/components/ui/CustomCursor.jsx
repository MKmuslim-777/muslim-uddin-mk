"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const springCfg = { stiffness: 120, damping: 18, mass: 0.8 };
  const springX = useSpring(cursorX, springCfg);
  const springY = useSpring(cursorY, springCfg);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };

    const addHover = () => setHovered(true);
    const removeHover = () => setHovered(false);
    const addClick = () => setClicked(true);
    const removeClick = () => setClicked(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", addClick);
    window.addEventListener("mouseup", removeClick);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", addClick);
      window.removeEventListener("mouseup", removeClick);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-primary mix-blend-difference"
        style={{ x: springX, y: springY }}
        animate={{
          width: hovered ? 48 : clicked ? 16 : 40,
          height: hovered ? 48 : clicked ? 16 : 40,
          opacity: 1,
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: clicked ? 0.5 : 1 }}
      />
    </>
  );
}
