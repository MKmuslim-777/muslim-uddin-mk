import mongoose from "mongoose";

const SeoSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Muslim Uddin MK | Mk-777 | Full Stack Web Developer" },
    description: {
      type: String,
      default:
        "Muslim Uddin Kaisan (MK-777 / mk) — Full Stack Web Developer & UI/UX Designer. Portfolio of projects, skills, and experience.",
    },
    keywords: {
      type: [String],
      default: [
        "Muslim Uddin MK",
        "Muslim Uddin Kaisan",
        "Mk-777",
        "mk",
        "Web Developer Portfolio",
        "Full Stack Developer Bangladesh",
        "Next.js Developer",
      ],
    },
    ogImage: { type: String, default: "/og-image.png" },
    twitterHandle: { type: String, default: "@Mk_777" },
  },
  { timestamps: true }
);

export default mongoose.models.Seo || mongoose.model("Seo", SeoSchema);
