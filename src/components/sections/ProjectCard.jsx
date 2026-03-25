"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-card-dark rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Image */}
      <div className="relative h-52 bg-accent-dark overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent-dark to-card-dark">
            <span className="text-5xl font-display font-black text-stroke-dim opacity-30">
              {project.title?.[0] || "P"}
            </span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-card-dark via-card-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Links on hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-cyan-300 transition-colors shadow-lg"
            >
              Live →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-dark border border-white/10 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:border-white/30 transition-colors"
            >
              GitHub
            </a>
          )}
        </div>

        {project.featured && (
          <span className="absolute top-3 left-3 bg-primary text-black text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags?.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-base font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{project.description}</p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}
