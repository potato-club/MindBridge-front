/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {

    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
        console.warn("BACKEND_URL 환경 변수가 설정되지 않아 프록시가 작동하지 않습니다.");
        return [];
    }

    return [
      {
        source: '/api/:path*',

        destination: `${backendUrl}/api/:path*`, 
      },
    ];
  },
};

module.exports = nextConfig;