"use client";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-px w-12 bg-primary" />
          <span className="text-primary font-black tracking-[0.2em] uppercase text-xs">Get In Touch</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">
              Let&apos;s <span className="text-stroke">Talk</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Have a project in mind? Want to collaborate? Or just want to say hi?
              I&apos;m always open to new opportunities.
            </p>
            <div className="space-y-4">
              {[
                { label: "Email", value: "hello@mk777.dev" },
                { label: "Location", value: "Bangladesh" },
                { label: "Availability", value: "Open to work" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 w-24">
                    {item.label}
                  </span>
                  <span className="text-white text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
