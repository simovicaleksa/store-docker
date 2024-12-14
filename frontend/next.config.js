/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
  output: "standalone",
  // uncomment for logging in production
  /*
   compiler: {
     removeConsole: false,
   }, */
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
        hostname: "localhost",
      },
      {
        hostname: "host.docker.internal",
      },
      {
        hostname: "example.com",
        port: "9000",
      },
    ],
  },
}

export default config
