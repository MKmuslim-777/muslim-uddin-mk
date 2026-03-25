"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    // Replace with your email API (Resend, EmailJS, etc.)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const inputClass =
    "w-full bg-accent-dark border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary transition-all duration-300 focus:bg-card-dark";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 block mb-2">
            Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Muslim Uddin"
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 block mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="hello@mk777.dev"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 block mb-2">
          Subject
        </label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder="Project inquiry"
          className={inputClass}
        />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 block mb-2">
          Message
        </label>
        <textarea
          rows={5}
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell me about your project..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <MagneticButton
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-primary text-black font-black text-sm uppercase tracking-widest py-4 rounded-full shadow-lg shadow-primary/30 hover:bg-cyan-300 transition-all duration-300 disabled:opacity-60 glow-primary"
      >
        {status === "sending" && "Sending..."}
        {status === "sent" && "Message Sent ✓"}
        {status === "error" && "Failed — Try Again"}
        {status === "idle" && "Send Message →"}
      </MagneticButton>
    </motion.form>
  );
}
