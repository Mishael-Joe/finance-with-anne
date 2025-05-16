import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://kziugcof2r.ufs.sh/**"),
      new URL("https://img.youtube.com/**"),
    ],
  },
  /* config options here */
};

export default nextConfig;
