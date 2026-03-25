/** Merge class names (lightweight clsx) */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Serialize Mongoose docs to plain objects (removes _id quirks) */
export function serialize(doc) {
  return JSON.parse(JSON.stringify(doc));
}

/** Format date string e.g. "2023-01" → "Jan 2023" */
export function formatDate(dateStr) {
  if (!dateStr) return "Present";
  const [year, month] = dateStr.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return month ? `${months[parseInt(month, 10) - 1]} ${year}` : year;
}
