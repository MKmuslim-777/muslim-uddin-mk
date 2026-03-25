export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { serialize } from "@/lib/utils";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProjectsManager from "@/components/admin/ProjectsManager";

export default async function AdminProjects() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="flex min-h-screen bg-bg-dark">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-display font-black text-white mb-2">Projects</h1>
        <p className="text-gray-600 text-sm mb-10">Add, edit, or delete portfolio projects</p>
        <ProjectsManager initialProjects={serialize(projects)} />
      </main>
    </div>
  );
}
