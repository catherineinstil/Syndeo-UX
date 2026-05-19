/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Syndeo-UX',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
