"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const EMPTY = {
  title: "", description: "", longDesc: "", tags: "",
  category: "web", imageUrl: "", liveUrl: "", githubUrl: "", featured: false, order: 0,
};

export default function ProjectsManager({ initialProjects }) {
  const [projects, setProjects] = useState(initialProjects);
  const [editing, setEditing] = useState(null); // null | "new" | project object
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((p) => p.filter((x) => x._id !== id));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.target);
    const payload = {
      title: fd.get("title"),
      description: fd.get("description"),
      longDesc: fd.get("longDesc"),
      tags: fd.get("tags").split(",").map((t) => t.trim()).filter(Boolean),
      category: fd.get("category"),
      imageUrl: fd.get("imageUrl"),
      liveUrl: fd.get("liveUrl"),
      githubUrl: fd.get("githubUrl"),
      featured: fd.get("featured") === "on",
      order: parseInt(fd.get("order") || "0"),
    };

    if (editing === "new") {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const created = await res.json();
      setProjects((p) => [created, ...p]);
    } else {
      const res = await fetch(`/api/projects/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const updated = await res.json();
      setProjects((p) => p.map((x) => (x._id === updated._id ? updated : x)));
    }

    setSaving(false);
    setEditing(null);
    router.refresh();
  };

  const inputClass =
    "w-full bg-bg-dark border border-white/8 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors";

  return (
    <div>
      <button
        onClick={() => setEditing("new")}
        className="mb-8 bg-primary text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-red-600 transition-colors shadow-lg shadow-primary/20"
      >
        + Add Project
      </button>

      {/* Project list */}
      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-card-dark border border-white/5 rounded-xl px-5 py-4 flex items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-display font-bold text-white text-sm">{p.title}</h3>
              <div className="flex gap-2 mt-1">
                <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">
                  {p.category}
                </span>
                {p.featured && (
                  <span className="text-[10px] text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">
                    Featured
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(p)}
                className="text-xs font-bold text-gray-400 hover:text-white bg-accent-dark px-4 py-2 rounded-full transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="text-xs font-bold text-red-400 hover:text-white hover:bg-red-600 bg-accent-dark px-4 py-2 rounded-full transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-gray-700 text-sm text-center py-12 uppercase tracking-widest">
            No projects yet.
          </p>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={(e) => e.target === e.currentTarget && setEditing(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card-dark border border-white/10 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="font-display font-black text-white text-xl mb-6">
                {editing === "new" ? "Add Project" : "Edit Project"}
              </h2>
              <form onSubmit={handleSave} className="space-y-4">
                {[
                  ["title", "Title", "text", true],
                  ["description", "Short Description", "text", true],
                  ["imageUrl", "Image URL", "url", false],
                  ["liveUrl", "Live URL", "url", false],
                  ["githubUrl", "GitHub URL", "url", false],
                  ["tags", "Tags (comma-separated)", "text", false],
                ].map(([name, label, type, required]) => (
                  <div key={name}>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 block mb-1.5">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      required={required}
                      defaultValue={editing !== "new" ? (name === "tags" ? editing.tags?.join(", ") : editing[name]) : ""}
                      className={inputClass}
                    />
                  </div>
                ))}

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 block mb-1.5">
                    Long Description
                  </label>
                  <textarea
                    name="longDesc"
                    rows={3}
                    defaultValue={editing !== "new" ? editing.longDesc : ""}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 block mb-1.5">
                      Category
                    </label>
                    <select
                      name="category"
                      defaultValue={editing !== "new" ? editing.category : "web"}
                      className={inputClass}
                    >
                      {["web", "fullstack", "mobile", "design"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 block mb-1.5">
                      Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      defaultValue={editing !== "new" ? editing.order : 0}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="featured"
                    id="featured"
                    defaultChecked={editing !== "new" ? editing.featured : false}
                    className="w-4 h-4 accent-primary"
                  />
                  <label htmlFor="featured" className="text-sm text-gray-400 font-medium">
                    Featured project
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-primary text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Project"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="px-6 bg-accent-dark text-gray-400 font-bold text-xs uppercase tracking-widest py-3.5 rounded-full hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
