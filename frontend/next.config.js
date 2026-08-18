/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://backend:8000/api/:path*",
            },
            {
                source: "/docs",
                destination: "http://backend:8000/docs",
            },
            {
                source: "/openapi.json",
                destination: "http://backend:8000/openapi.json",
            },
        ];
    },
};

module.exports = nextConfig;