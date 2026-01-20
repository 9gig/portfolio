/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com'],
  },
  eslint: {
    dirs: ['src'],
  },
}

module.exports = nextConfig