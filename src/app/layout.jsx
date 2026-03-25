import { Inter, Saira } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import { connectDB } from "@/lib/mongodb";
import Seo from "@/models/Seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const saira = Saira({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-saira",
});

// Fetch live SEO from DB
async function getSeoData() {
  try {
    await connectDB();
    const seo = await Seo.findOne().lean();
    return seo || {};
  } catch {
    return {};
  }
}

export async function generateMetadata() {
  const seo = await getSeoData();
  const title = seo.title || "Muslim Uddin MK | Mk-777 | Full Stack Web Developer";
  const description =
    seo.description ||
    "Muslim Uddin Kaisan (MK-777 / mk) — Full Stack Web Developer & UI/UX Designer.";
  const keywords = seo.keywords || ["Muslim Uddin MK", "Mk-777", "mk", "Web Developer Portfolio"];
  const ogImage = seo.ogImage || "/og-image.png";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://muslim-uddin-mk.vercel.app"),
    title: { default: title, template: `%s | Muslim Uddin MK` },
    description,
    keywords,
    authors: [{ name: "Muslim Uddin MK" }],
    creator: "Muslim Uddin MK",
    openGraph: {
      type: "website",
      title,
      description,
      siteName: "Muslim Uddin MK",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Muslim Uddin MK" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: seo.twitterHandle || "@Mk_777",
    },
    robots: { index: true, follow: true },
  };
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muslim Uddin MK",
  alternateName: ["Muslim Uddin Kaisan", "Mk-777", "mk"],
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://muslim-uddin-mk.vercel.app",
  jobTitle: "Full Stack Web Developer",
  sameAs: ["https://github.com/Mk-777"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${saira.variable} font-sans bg-bg-dark text-white antialiased overflow-x-hidden noise`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
