import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-10 mt-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <Link href="/" className="font-display font-black text-xl">
            <span className="text-primary">MK</span>
            <span className="text-white/30">-</span>
            <span className="text-white">777</span>
          </Link>
          <p className="text-gray-700 text-xs mt-1 uppercase tracking-widest">Muslim Uddin MK · mk</p>
        </div>
        <p className="text-gray-700 text-xs">© {year} Muslim Uddin MK. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-gray-600 uppercase tracking-widest">
          <Link href="/#projects" className="hover:text-primary transition-colors">Projects</Link>
          <Link href="/#contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
