
export function getConfig() {
  const port = Number(process.env.PORT || 3000);
  const host = process.env.HOST || "0.0.0.0";
  const rateLimitMax = Number(process.env.RATE_LIMIT_MAX || 30);
  const rateLimitWindow = process.env.RATE_LIMIT_WINDOW || "1 minute";

  const tenantKeysJson = process.env.TENANT_KEYS_JSON || "{}";
  let tenantKeys = {};

  try {
    tenantKeys = JSON.parse(tenantKeysJson);
  } catch {
    tenantKeys = {};
  }

  return {
    port,
    host,
    tenantKeys,
    rateLimit: { max: rateLimitMax, timeWindow: rateLimitWindow }
  };
}