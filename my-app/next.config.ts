/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add your image host domains here if using external images
    formats: ['image/avif', 'image/webp'], // Modern image formats
    deviceSizes: [640, 750, 1080, 1200, 1920], // Responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96], // Cache sizes
    minimumCacheTTL: 60, // 60 seconds cache
  },
  // Enable React strict mode (recommended)
  reactStrictMode: true,
  // Add compiler options for styled-components if needed
  compiler: {
    styledComponents: true,
  },
  // Enable SWC minification (faster builds)
  swcMinify: true,
  // Configure production browser source maps
  productionBrowserSourceMaps: false,
  // Enable experimental features if needed
  experimental: {
    optimizeCss: true,
    nextScriptWorkers: true,
  }
}

export default nextConfig