/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["malik-brand.com"],
  },
};

module.exports = nextConfig;
