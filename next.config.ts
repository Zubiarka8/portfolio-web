import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages. A project site is served from
 * /<repository>, so the deploy workflow sets NEXT_PUBLIC_BASE_PATH; it is
 * empty for local development and for user/organization sites.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  // /en/ -> en/index.html: works on any static host without extension rewrites.
  trailingSlash: true,
  basePath,
  // The default image optimizer needs a server. Image sources get the base
  // path from lib/base-path.ts.
  images: { unoptimized: true },
  experimental: {
    // Two root layouts (es / en) need a global 404 for unmatched URLs.
    globalNotFound: true,
  },
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
