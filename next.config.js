/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Enable Docker compatibility
  experimental: {
    outputFileTracingRoot: '/app',
  },
}

module.exports = nextConfig
