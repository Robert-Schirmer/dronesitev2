let config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.googleapis.com'],
  },
};

if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  config = withBundleAnalyzer(config);
}

module.exports = config;
