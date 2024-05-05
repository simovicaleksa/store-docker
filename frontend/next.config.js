/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
  output: "standalone",
  compiler: {
    removeConsole: false,
  },
  images: {
    remotePatterns: [
      {
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      {
        hostname: "host.docker.internal",
      },
    ],
  },
}

export default config
