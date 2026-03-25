import { connectDB } from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { serialize } from "@/lib/utils";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ExperienceManager from "@/components/admin/ExperienceManager";

export default async function AdminExperience() {
  await connectDB();
  const items = await Experience.find().sort({ order: 1 }).lean();

  return (
    <div className="flex min-h-screen bg-bg-dark">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-display font-black text-white mb-2">Experience</h1>
        <p className="text-gray-600 text-sm mb-10">Manage your work and education timeline</p>
        <ExperienceManager initialItems={serialize(items)} />
      </main>
    </div>
  );
}
