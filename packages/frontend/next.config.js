/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  images: {
    // Image optimization does not work with capacitor
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assetsnffrgf-a.akamaihd.net",
        port: "",
        pathname: "/assets/m/2023562/univ/art/2023562_univ_lsr_lg.jpg",
      },
    ],
  },
};

module.exports = nextConfig;
