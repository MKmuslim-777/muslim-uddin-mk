"use client";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

export default function ExperienceTimeline({ items = [] }) {
  return (
    <section id="experience" className="py-32 relative">
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-px w-12 bg-primary" />
          <span className="text-primary font-black tracking-[0.2em] uppercase text-xs">Journey</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-black mb-16"
        >
          My <span className="text-stroke">Timeline</span>
        </motion.h2>

        <div className="relative max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />

          <div className="space-y-10">
            {items.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative pl-16"
              >
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="absolute left-3 top-2 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50 ring-4 ring-bg-dark"
                />

                <div className="bg-card-dark border border-white/5 rounded-2xl p-6 hover:border-primary/20 transition-colors duration-300 group">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-display font-bold text-white text-lg group-hover:text-primary transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-primary font-bold text-sm">{item.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 bg-accent-dark px-3 py-1.5 rounded-full">
                        {formatDate(item.startDate)} — {formatDate(item.endDate)}
                      </span>
                      {item.location && (
                        <p className="text-xs text-gray-700 mt-1">{item.location}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  <span
                    className={`mt-4 inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      item.type === "work"
                        ? "bg-primary/10 text-primary"
                        : "bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {items.length === 0 && (
            <div className="text-center py-24 text-gray-700 text-sm uppercase tracking-widest pl-16">
              No experience entries yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
