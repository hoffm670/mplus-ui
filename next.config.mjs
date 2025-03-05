/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/us',
            permanent: true,
          },
          {
            source: '/:region',
            destination: 'https://mplus-title-tracker.vercel.app/:region',
            permanent: true,
          },
        ]
      },
      async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://mplus-title-tracker.vercel.app" },
                    { key: "Access-Control-Allow-Origin", value: "https://mplus-title-tracker.vercel.dev.app" },
                    { key: "Access-Control-Allow-Methods", value: "GET" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                    { key: "Cache-Control", value: 'no-store'}
                ]
            }
        ]
    }
};

export default nextConfig;
