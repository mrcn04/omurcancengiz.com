import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Dev only: let phones on the local network load the dev server's scripts.
  allowedDevOrigins: ['192.168.*.*', '10.*.*.*'],
}

export default nextConfig
