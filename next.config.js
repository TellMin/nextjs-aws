/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  // This is a workaround for the issue: https://github.com/aws-amplify/amplify-js/issues/11030
  webpack: (config, { webpack, isServer, nextRuntime }) => {
    if (isServer && nextRuntime === "nodejs") {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^(aws-crt|@aws-sdk\/signature-v4-crt)$/,
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
