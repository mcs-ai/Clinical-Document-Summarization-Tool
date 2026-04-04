# API

## Base URL
Configured per environment. Current deployment uses Azure App Service.

## POST /v1/summaries
### Headers
- Authorization: Bearer <apiKey>
- Content-Type: application/json

### Request
Body (raw → JSON)
{
  "tenantId": "clinic-main",
  "note": {
    "raw": "put body of note here."
  },
  "options": {
    "soap": true,
    "plainLanguage": true,
    "temperature": 0.2
  }
}

Key fields:
- tenantId (optional; enforced if present)
- noteText or transcript text field
- options:
  - soap: boolean
  - plainLanguage: boolean
  - temperature: accepted but server-capped (max 0.2)

### Response
Returns structured JSON including:
- soapSummary (JSON)
- plainLanguageSummary (string, optional)
- metadata such as latencyMs and token usage

{
  "requestId": "ae514c4d-161e-4edc-ba81-4438af867e30",
  "tenantId": "clinic-main",
  "outputs": {
    "soapClinicalSummary": {
      "subjective": "text containing subjective summary",
      "objective": "text containing objective summary",
      "assessment": "text containing assessment summary",
      "plan": ["action 1","action 2","action 3"]
    },
    "plainLanguageSummary": "text containing plain language summary"
  },
  "metadata": {
    "model": "azure",
    "latencyMs": 6381,
    "usage": {
      "soap": { "prompt_tokens": 389, "completion_tokens": 94, "total_tokens": 483 },
      "plain": { "prompt_tokens": 109, "completion_tokens": 78, "total_tokens": 187 }
    }
  }
}


### Error codes
- 400 invalid input
- 401 missing/invalid Bearer token
- 403 tenant mismatch
- 413 input too large
- 5xx upstream/model issues