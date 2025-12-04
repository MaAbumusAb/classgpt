/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@classgpt/ui', '@classgpt/sdk'],
};

module.exports = nextConfig;
