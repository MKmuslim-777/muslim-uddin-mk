import { connectDB } from "@/lib/mongodb";
import { serialize } from "@/lib/utils";
import Hero from "@/models/Hero";
import Project from "@/models/Project";
import Experience from "@/models/Experience";
import Seo from "@/models/Seo";
import HeroSection from "@/components/sections/Hero";
import AboutSection from "@/components/sections/About";
import ProjectsSection from "@/components/sections/Projects";
import ExperienceSection from "@/components/sections/ExperienceTimeline";
import ContactSection from "@/components/sections/Contact";

export const revalidate = 60;

export async function generateMetadata() {
  try {
    await connectDB();
    const seo = await Seo.findOne().lean();
    if (!seo) return {};
    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
    };
  } catch {
    return {};
  }
}

async function getData() {
  try {
    await connectDB();
    const [hero, projects, experiences] = await Promise.all([
      Hero.findOne().lean(),
      Project.find().sort({ featured: -1, order: 1 }).lean(),
      Experience.find().sort({ order: 1 }).lean(),
    ]);
    return {
      hero: serialize(hero),
      projects: serialize(projects),
      experiences: serialize(experiences),
    };
  } catch (err) {
    console.error("DB error:", err);
    return { hero: null, projects: [], experiences: [] };
  }
}

export default async function HomePage() {
  const { hero, projects, experiences } = await getData();

  return (
    <>
      <HeroSection data={hero} />
      <AboutSection data={hero} />
      <ProjectsSection projects={projects} />
      <ExperienceSection items={experiences} />
      <ContactSection />
    </>
  );
}
