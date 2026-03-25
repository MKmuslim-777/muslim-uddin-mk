import { connectDB } from "@/lib/mongodb";
import Seo from "@/models/Seo";
import { serialize } from "@/lib/utils";
import AdminSidebar from "@/components/admin/AdminSidebar";
import SeoEditor from "@/components/admin/SeoEditor";

export default async function AdminSeo() {
  await connectDB();
  const seo = await Seo.findOne().lean();

  return (
    <div className="flex min-h-screen bg-bg-dark">
      <AdminSidebar />
      <main className="flex-1 p-10 max-w-3xl">
        <h1 className="text-3xl font-display font-black text-white mb-2">SEO & Meta Tags</h1>
        <p className="text-gray-600 text-sm mb-10">
          Update meta title, description, and keywords — no redeployment needed
        </p>
        <SeoEditor data={serialize(seo)} />
      </main>
    </div>
  );
}
