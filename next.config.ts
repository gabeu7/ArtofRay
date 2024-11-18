/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Optimize images from external sources if needed
    remotePatterns: [
      {
        protocol: 'https',
        //hostname: 'your-external-source.com',
        pathname: '/images/**',
      },
    ],
    // Configure image device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Configure image sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

module.exports = nextConfig