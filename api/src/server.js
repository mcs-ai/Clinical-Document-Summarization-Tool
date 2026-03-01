import "dotenv/config";
import Fastify from "fastify";
import { getConfig } from "./config.js";
import { healthRoutes } from "./routes/health.js";
import { summariesRoutes } from "./routes/summaries.js";
import { authPlugin } from "./middleware/auth.js";

async function buildServer(config) {
  const app = Fastify({ logger: true });

  await app.register(authPlugin, { tenantKeys: config.tenantKeys }); // register auth plugin with tenant keys from config so no need to get config from env again in the plugin
  await app.register(healthRoutes);
  await app.register(summariesRoutes);

  return app;
}

async function start() {
  const config = getConfig();
  const app = await buildServer(config);

  try {
    await app.listen({ port: config.port, host: config.host });
    app.log.info(`Server listening on http://${config.host}:${config.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();