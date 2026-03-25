export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/mongodb";
import Hero from "@/models/Hero";
import { serialize } from "@/lib/utils";
import AdminSidebar from "@/components/admin/AdminSidebar";
import HeroEditor from "@/components/admin/HeroEditor";

export default async function AdminHero() {
  await connectDB();
  const hero = await Hero.findOne().lean();

  return (
    <div className="flex min-h-screen bg-bg-dark">
      <AdminSidebar />
      <main className="flex-1 p-10 max-w-3xl">
        <h1 className="text-3xl font-display font-black text-white mb-2">Hero Section</h1>
        <p className="text-gray-600 text-sm mb-10">Edit your name, titles, bio, and availability status</p>
        <HeroEditor data={serialize(hero)} />
      </main>
    </div>
  );
}
