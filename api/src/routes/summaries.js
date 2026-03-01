
import { SummariesRequestSchema, SoapSummarySchema } from "../schemas/summaries.schema.js";

export async function summariesRoutes(app) {
  app.post("/v1/summaries", async (req, reply) => {
    const parsed = SummariesRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send({
        error: {
          code: "BAD_REQUEST",
          message: "Invalid request body",
          details: parsed.error.issues
        }
      });
    }

    const { tenantId: tenantIdFromBody, requestId, note, options } = parsed.data;

    const tenantId = req.tenant?.tenantId; // derived from API key
    if (!tenantId) {
      // if auth hook failed to stop the request this will catch it.  we
      // expect the plugin to have already returned 401, but 500 was showing
      // up because the handler executed with no tenant attached.
      return reply.code(401).send({
        error: { code: "UNAUTHORIZED", message: "Missing or invalid API key" }
      });
    }

    // Optional: allow tenantId in body for debugging, but enforce match if present
    if (tenantIdFromBody && tenantIdFromBody !== tenantId) {
      return reply.code(403).send({
        error: { code: "FORBIDDEN", message: "tenantId does not match API key" }
      });
    }

    // Hard enforce low temperature server-side
    const temperature = Math.min(options?.temperature ?? 0.2, 0.2);

    // STUB: pretend we summarized it
    const soap = {
      subjective: "Stub subjective (replace with model output).",
      objective: "Stub objective (replace with model output).",
      assessment: "Stub assessment (replace with model output).",
      plan: "Stub plan (replace with model output)."
    };

    // Validate our SOAP structure (helps when model output is wired in)
    const soapValidated = SoapSummarySchema.parse(soap);

    return {
      requestId,
      tenantId,
      outputs: {
        soapClinicalSummary: options?.soap === false ? null : soapValidated,
        plainLanguageSummary:
          options?.plainLanguage === false
            ? null
            : `Stub plain-language summary. Temp capped at ${temperature}.`
      },
      metadata: {
        model: "stub",
        latencyMs: 1,
        usage: {
          inputTokens: null,
          outputTokens: null,
          totalTokens: null
        }
      }
    };
  });
}