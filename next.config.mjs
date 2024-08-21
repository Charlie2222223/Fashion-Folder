/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.API_URL,
      credentials: true // 追加
    },
  },
  reactStrictMode: true,
};


export default nextConfig;
