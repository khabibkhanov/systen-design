import type { NextConfig } from "next";

// Served as the /system-design zone of the "courses" hub (Next.js multi-zones).
const BASE_PATH = "/system-design";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: BASE_PATH,
  // Keep links to the old root URLs working after the move under basePath.
  async redirects() {
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
