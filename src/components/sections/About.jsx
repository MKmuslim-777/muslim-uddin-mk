"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const skillGroups = [
  { cat: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { cat: "Backend", items: ["Node.js", "Express", "MongoDB", "Mongoose"] },
  { cat: "Tools", items: ["Git", "Figma", "Firebase", "Vercel"] },
];

export default function About({ data }) {
  const name = data?.name || "Muslim Uddin MK";
  const bio = data?.bio || "Full Stack Developer crafting premium digital experiences.";
  const avatarUrl = data?.avatarUrl || "";

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="h-px w-12 bg-primary" />
          <span className="text-primary font-black tracking-[0.2em] uppercase text-xs">About Me</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-blue-600 rounded-3xl opacity-10 blur-2xl group-hover:opacity-20 transition duration-700" />
            <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 aspect-[4/5] max-w-sm">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent-dark to-card-dark flex items-center justify-center">
                  <span className="text-8xl font-display font-black text-stroke opacity-20">MK</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                <p className="text-white text-sm font-medium italic">&ldquo;Code is poetry written in logic.&rdquo;</p>
                <p className="text-primary text-xs mt-1 font-black">— Muslim Uddin MK</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-display font-black leading-tight">
              Crafting Digital{" "}
              <span className="gradient-text">Masterpieces</span>
            </h2>

            <div className="space-y-4 text-gray-400 text-base leading-relaxed">
              <p>
                I&apos;m <strong className="text-white font-semibold">{name}</strong> — also known as{" "}
                <span className="text-primary font-bold">Mk-777</span> &amp;{" "}
                <span className="text-primary font-bold">mk</span>. I turn complex problems into
                elegant, high-performance web solutions.
              </p>
              <p>{bio}</p>
            </div>

            {/* Skills */}
            <div className="space-y-5">
              {skillGroups.map((group) => (
                <div key={group.cat}>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 block mb-2">
                    {group.cat}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05, borderColor: "rgba(245,0,87,0.5)" }}
                        className="px-3 py-1.5 text-xs font-bold bg-accent-dark border border-white/5 rounded-full text-gray-300 hover:text-white transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 bg-accent-dark hover:bg-white hover:text-black text-white px-7 py-3.5 rounded-full transition-all duration-300 font-bold text-sm border border-white/10 uppercase tracking-widest"
            >
              Download CV ↓
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
