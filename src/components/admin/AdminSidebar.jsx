"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "⬡" },
  { href: "/admin/hero", label: "Hero Section", icon: "✦" },
  { href: "/admin/projects", label: "Projects", icon: "◈" },
  { href: "/admin/experience", label: "Experience", icon: "◎" },
  { href: "/admin/seo", label: "SEO & Meta", icon: "◉" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-card-dark border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="font-display font-black text-xl">
          <span className="text-primary">MK</span>
          <span className="text-white/20">-</span>
          <span className="text-white">777</span>
        </Link>
        <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-1">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                active
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-gray-500 hover:text-white hover:bg-accent-dark"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-600 hover:text-white hover:bg-accent-dark transition-all"
        >
          ↗ View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-600 hover:text-red-400 hover:bg-accent-dark transition-all"
        >
          ⊗ Sign Out
        </button>
      </div>
    </aside>
  );
}
