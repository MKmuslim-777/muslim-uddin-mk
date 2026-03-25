export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Experience from "@/models/Experience";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

export default async function Dashboard() {
  await connectDB();
  const [projectCount, expCount] = await Promise.all([
    Project.countDocuments(),
    Experience.countDocuments(),
  ]);

  const cards = [
    { label: "Hero Section", desc: "Edit name, titles, bio", href: "/admin/hero", icon: "✦", color: "from-primary/20 to-primary/5" },
    { label: "Projects", desc: `${projectCount} total`, href: "/admin/projects", icon: "◈", color: "from-purple-500/20 to-purple-500/5" },
    { label: "Experience", desc: `${expCount} entries`, href: "/admin/experience", icon: "◎", color: "from-blue-500/20 to-blue-500/5" },
    { label: "SEO & Meta", desc: "Keywords, meta tags", href: "/admin/seo", icon: "◉", color: "from-green-500/20 to-green-500/5" },
  ];

  return (
    <div className="flex min-h-screen bg-bg-dark">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <div className="mb-10">
          <h1 className="text-3xl font-display font-black text-white">Dashboard</h1>
          <p className="text-gray-600 text-sm mt-1">Manage every section of your portfolio</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className={`bg-gradient-to-br ${card.color} border border-white/5 rounded-2xl p-7 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group`}
            >
              <div className="text-3xl mb-4 text-primary">{card.icon}</div>
              <h3 className="font-display font-black text-white text-xl group-hover:text-primary transition-colors">
                {card.label}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{card.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
