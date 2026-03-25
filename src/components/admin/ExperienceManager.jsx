"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "@/lib/utils";

const EMPTY = { role: "", company: "", location: "", startDate: "", endDate: "", description: "", type: "work", order: 0 };

export default function ExperienceManager({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleDelete = async (id) => {
    if (!confirm("Delete this entry?")) return;
    await fetch(`/api/experience/${id}`, { method: "DELETE" });
    setItems((i) => i.filter((x) => x._id !== id));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.target);
    const payload = Object.fromEntries(fd.entries());
    payload.order = parseInt(payload.order || "0");

    if (editing === "new") {
      const res = await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const created = await res.json();
      setItems((i) => [...i, created]);
    } else {
      const res = await fetch(`/api/experience/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const updated = await res.json();
      setItems((i) => i.map((x) => (x._id === updated._id ? updated : x)));
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
        + Add Entry
      </button>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-card-dark border border-white/5 rounded-xl px-5 py-4 flex items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-display font-bold text-white text-sm">{item.role}</h3>
              <p className="text-primary text-xs font-bold">{item.company}</p>
              <p className="text-gray-600 text-xs mt-0.5">
                {formatDate(item.startDate)} — {formatDate(item.endDate)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(item)}
                className="text-xs font-bold text-gray-400 hover:text-white bg-accent-dark px-4 py-2 rounded-full transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-xs font-bold text-red-400 hover:text-white hover:bg-red-600 bg-accent-dark px-4 py-2 rounded-full transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-gray-700 text-sm text-center py-12 uppercase tracking-widest">No entries yet.</p>
        )}
      </div>

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
              className="bg-card-dark border border-white/10 rounded-3xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="font-display font-black text-white text-xl mb-6">
                {editing === "new" ? "Add Entry" : "Edit Entry"}
              </h2>
              <form onSubmit={handleSave} className="space-y-4">
                {[
                  ["role", "Role / Title", true],
                  ["company", "Company / School", true],
                  ["location", "Location", false],
                  ["startDate", "Start Date (YYYY-MM)", false],
                  ["endDate", "End Date (leave blank = Present)", false],
                ].map(([name, label, required]) => (
                  <div key={name}>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 block mb-1.5">
                      {label}
                    </label>
                    <input
                      type="text"
                      name={name}
                      required={required}
                      defaultValue={editing !== "new" ? editing[name] : ""}
                      className={inputClass}
                    />
                  </div>
                ))}

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 block mb-1.5">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    required
                    defaultValue={editing !== "new" ? editing.description : ""}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 block mb-1.5">
                      Type
                    </label>
                    <select
                      name="type"
                      defaultValue={editing !== "new" ? editing.type : "work"}
                      className={inputClass}
                    >
                      <option value="work">Work</option>
                      <option value="education">Education</option>
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

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-primary text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Entry"}
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
