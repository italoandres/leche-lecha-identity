/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  // Remover headers (não funcionam em export estático)
}

module.exports = nextConfig
