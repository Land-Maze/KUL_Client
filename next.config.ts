import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
        ],
      },
      {
        source: "/auth",
        headers: [
          {
            "key": "Cache-Control",
            "value": "no-store, no-cache, must-revalidate",
          }
        ]
      }
    ]
  },
};

export default nextConfig;
