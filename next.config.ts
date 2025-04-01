import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    NEXT_AUTH_SECRET_KEY : process.env.NEXT_AUTH_SECRET_KEY
  },
  experimental: {
    allowedDevOrigins: ["http://localhost:3000"], // Add allowed origins here
  },
};

export default nextConfig;
