const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// Url used for local file storage pointing location
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:9000";

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

// Stripe variables needed for online payments to work

const STRIPE_API_KEY = process.env.STRIPE_API_KEY ?? undefined;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? undefined;

// Redis environment variables

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
      backend_url: BACKEND_URL,
    },
  },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
  {
    fromEmail: process.env.EMAIL_SENDER_ADDRESS,
    // this object is input directly into nodemailer.createtransport(), so anything that works there should work here
    // see: https://nodemailer.com/smtp/#1-single-connection and https://nodemailer.com/transports/
    transport: {
      host: process.env.EMAIL_HOST,
      port: 587,
      secureConnection: false,
      auth: {
        user: process.env.EMAIL_SENDER_ADDRESS,
        pass: process.env.EMAIL_SENDER_PASSWORD,
      },
      tls: {
        ciphers: "SSLv3",
      },
      requireTLS: true,
    },
    // this is the path where your email templates are stored
    emailTemplatePath: "data/emailTemplates",
    // this maps the folder/template name to a medusajs event to use the right template
    // only the events that are registered here are subscribed to
    templateMap: {
      // "eventname": "templatename",
      "order.placed": "orderplaced",
    },
  },
  {
    resolve: `medusa-plugin-meilisearch`,
    options: {
      config: {
        host: process.env.MEILISEARCH_HOST,
        apiKey: process.env.MEILISEARCH_API_KEY,
      },
      settings: {
        // index name
        products: {
          indexSettings: {
            searchableAttributes: ["title", "description", "variant_sku"],
            displayedAttributes: [
              "id",
              "title",
              "description",
              "variant_sku",
              "thumbnail",
              "handle",
            ],
          },
          primaryKey: "id",
          transform: (product) => ({
            id: product.id,
          }),
        },
      },
    },
  },
  {
    resolve: `@rsc-labs/medusa-store-analytics`,
    options: {
      enableUI: true,
    },
  },
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: STRIPE_API_KEY,
      webhook_secret: STRIPE_WEBHOOK_SECRET,
    },
  },
];

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL,
    },
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL,
    },
  },
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  // Uncomment the following lines to enable REDIS
  redis_url: REDIS_URL,
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};
