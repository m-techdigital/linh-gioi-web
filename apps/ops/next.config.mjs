/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["@lgo-web/ui", "@lgo-web/design-tokens", "@lgo-web/content", "@lgo-web/api-client", "@lgo-web/contracts", "@lgo-web/auth", "@lgo-web/config", "@lgo-web/testing"]
};

export default nextConfig;
