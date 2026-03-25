import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Muslim Uddin MK" },
    titles: { type: [String], default: ["Full Stack Developer", "UI/UX Designer", "Mk-777", "mk"] },
    bio: { type: String, default: "Crafting high-performance digital experiences." },
    avatarUrl: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    stats: {
      type: [{ label: String, value: String }],
      default: [
        { label: "Projects", value: "50+" },
        { label: "Years Exp.", value: "3+" },
        { label: "Dedication", value: "100%" },
      ],
    },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    availableForWork: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Hero || mongoose.model("Hero", HeroSchema);
