const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: process.env.NODE_ENV === "development",
    workboxOptions: {
        disableDevLogs: true,
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/upload/**',
            },
            {
                protocol: 'http',
                hostname: process.env.HOST_URL,
                port: process.env.PORT,
                pathname: '/upload/**',
            },
        ],
    },
    output: "standalone"
}

module.exports = withPWA(nextConfig);
