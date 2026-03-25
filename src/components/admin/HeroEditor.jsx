"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroEditor({ data }) {
  const [form, setForm] = useState({
    name: data?.name || "Muslim Uddin MK",
    titles: (data?.titles || ["Full Stack Developer", "Mk-777"]).join(", "),
    bio: data?.bio || "",
    avatarUrl: data?.avatarUrl || "",
    resumeUrl: data?.resumeUrl || "",
    availableForWork: data?.availableForWork !== false,
    github: data?.socialLinks?.github || "",
    linkedin: data?.socialLinks?.linkedin || "",
    twitter: data?.socialLinks?.twitter || "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name,
      titles: form.titles.split(",").map((t) => t.trim()).filter(Boolean),
      bio: form.bio,
      avatarUrl: form.avatarUrl,
      resumeUrl: form.resumeUrl,
      availableForWork: form.availableForWork,
      socialLinks: {
        github: form.github,
        linkedin: form.linkedin,
        twitter: form.twitter,
      },
    };
    await fetch("/api/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    router.refresh();
  };

  const field = (key, label, type = "text", hint = "") => (
    <div key={key}>
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 block mb-2">
        {label}
        {hint && <span className="text-gray-700 normal-case tracking-normal ml-2 font-normal">{hint}</span>}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full bg-accent-dark border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  );

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {field("name", "Full Name")}
      {field("titles", "Titles", "text", "(comma-separated)")}
      <div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 block mb-2">Bio</label>
        <textarea
          rows={4}
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          className="w-full bg-accent-dark border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary transition-colors resize-none"
        />
      </div>
      {field("avatarUrl", "Avatar Image URL")}
      {field("resumeUrl", "Resume PDF URL")}
      {field("github", "GitHub URL")}
      {field("linkedin", "LinkedIn URL")}
      {field("twitter", "Twitter Handle")}

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="available"
          checked={form.availableForWork}
          onChange={(e) => setForm({ ...form, availableForWork: e.target.checked })}
          className="w-4 h-4 accent-primary"
        />
        <label htmlFor="available" className="text-sm text-gray-400 font-medium">
          Available for work
        </label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-primary text-white font-black text-sm uppercase tracking-widest py-4 rounded-full hover:bg-red-600 transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
      >
        {saving ? "Saving..." : saved ? "Saved ✓" : "Save Hero Section"}
      </button>
    </form>
  );
}
