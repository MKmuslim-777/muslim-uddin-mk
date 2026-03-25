"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SeoEditor({ data }) {
  const [form, setForm] = useState({
    title: data?.title || "Muslim Uddin MK | Mk-777 | Full Stack Web Developer",
    description: data?.description || "",
    keywords: (data?.keywords || ["Muslim Uddin MK", "Mk-777", "mk"]).join(", "),
    ogImage: data?.ogImage || "/og-image.png",
    twitterHandle: data?.twitterHandle || "@Mk_777",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      keywords: form.keywords.split(",").map((k) => k.trim()).filter(Boolean),
    };
    await fetch("/api/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    router.refresh();
  };

  const inputClass =
    "w-full bg-accent-dark border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary transition-colors";

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-sm text-gray-400">
        <strong className="text-primary font-bold">Live SEO</strong> — changes here update your meta tags
        instantly on the next page load. No redeployment required.
      </div>

      {[
        ["title", "Meta Title"],
        ["ogImage", "OG Image URL"],
        ["twitterHandle", "Twitter Handle"],
      ].map(([key, label]) => (
        <div key={key}>
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 block mb-2">
            {label}
          </label>
          <input
            type="text"
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className={inputClass}
          />
        </div>
      ))}

      <div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 block mb-2">
          Meta Description
        </label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 block mb-2">
          Keywords <span className="text-gray-700 normal-case tracking-normal font-normal">(comma-separated)</span>
        </label>
        <textarea
          rows={4}
          value={form.keywords}
          onChange={(e) => setForm({ ...form, keywords: e.target.value })}
          className={`${inputClass} resize-none`}
          placeholder="Muslim Uddin MK, Mk-777, mk, Web Developer Portfolio..."
        />
        <p className="text-gray-700 text-xs mt-2">
          Current: {form.keywords.split(",").filter(Boolean).length} keywords
        </p>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-primary text-white font-black text-sm uppercase tracking-widest py-4 rounded-full hover:bg-red-600 transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
      >
        {saving ? "Saving..." : saved ? "Saved ✓" : "Save SEO Settings"}
      </button>
    </form>
  );
}
