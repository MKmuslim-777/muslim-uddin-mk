"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { ...creds, redirect: false });
    if (res?.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials. Access denied.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="font-display font-black text-5xl mb-2">
            <span className="text-primary">MK</span>
            <span className="text-white/20">-</span>
            <span className="text-white">777</span>
          </div>
          <p className="text-gray-600 text-xs uppercase tracking-[0.3em]">Admin Access</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card-dark border border-white/5 rounded-3xl p-8 space-y-6 shadow-2xl"
        >
          {[
            { key: "username", label: "Username", type: "text" },
            { key: "password", label: "Password", type: "password" },
          ].map(({ key, label, type }) => (
            <div key={key}>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 block mb-2">
                {label}
              </label>
              <input
                type={type}
                value={creds[key]}
                onChange={(e) => setCreds({ ...creds, [key]: e.target.value })}
                className="w-full bg-accent-dark border border-white/8 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
          ))}

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs text-center font-bold uppercase tracking-widest"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-black text-sm uppercase tracking-widest py-4 rounded-full hover:bg-red-600 transition-all disabled:opacity-50 shadow-lg shadow-primary/30"
          >
            {loading ? "Authenticating..." : "Enter Admin Panel →"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
