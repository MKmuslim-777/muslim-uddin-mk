import AdminProvider from "@/components/admin/AdminProvider";

export default function AdminLayout({ children }) {
  return <AdminProvider>{children}</AdminProvider>;
}
