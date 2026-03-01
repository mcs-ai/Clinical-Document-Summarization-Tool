
export function authPlugin(app, opts, done) {
  const tenantKeys = opts?.tenantKeys || {};

  const keyToTenant = new Map();
  for (const [tenantId, keys] of Object.entries(tenantKeys)) {
    const list = Array.isArray(keys) ? keys : [keys];
    for (const k of list) keyToTenant.set(String(k), tenantId);
  }

  app.addHook("preHandler", async (req, reply) => {
    if (req.url === "/health" || req.url === "/ready") return;

    const auth = req.headers.authorization || "";
    const match = auth.match(/^Bearer\s+(.+)$/i);
    const apiKey = match ? match[1].trim() : "";

    if (!apiKey) {
      reply.code(401).send({
        error: { code: "UNAUTHORIZED", message: "Missing Authorization: Bearer <apiKey>" }
      });
      return;
    }

    const tenantId = keyToTenant.get(apiKey);
    if (!tenantId) {
      reply.code(401).send({
        error: { code: "UNAUTHORIZED", message: "Invalid API key" }
      });
      return;
    }

    req.tenant = { tenantId };
  });

  done();
}