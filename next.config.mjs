/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/us',
            permanent: true,
          },
        ]
      },
};

export default nextConfig;
