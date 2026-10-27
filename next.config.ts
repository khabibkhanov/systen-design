import type { NextConfig } from "next";
import { COURSE_ID as COURSE } from "./src/lib/course";

// Served as one zone of the "courses" hub (Next.js multi-zones): /system-design or /cs50,
// chosen per Vercel project by NEXT_PUBLIC_COURSE (see src/lib/course.ts).
const BASE_PATH = `/${COURSE}`;

const nextConfig: NextConfig = {
  /* config options here */
  basePath: BASE_PATH,
  // Keep links to the old root URLs working after the move under basePath.
  async redirects() {
    if (COURSE !== "system-design") return [];
    return [
      { source: "/", destination: BASE_PATH, basePath: false, permanent: true },
      { source: "/dars/:n", destination: `${BASE_PATH}/dars/:n`, basePath: false, permanent: true },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
