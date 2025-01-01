/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Remove console logs only in production
    removeConsole: process.env.NODE_ENV === "production"
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        // port: "**",
        // pathname: "**",
      },
    ],
  },
};

export default nextConfig;
