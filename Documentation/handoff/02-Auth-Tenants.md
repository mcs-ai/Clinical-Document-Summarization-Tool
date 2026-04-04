# Auth + Tenants

## API Key auth
Requests require:
Authorization: Bearer <apiKey>

## Tenant enforcement
- Keys map to a tenant via TENANT_KEYS_JSON.
- If tenantId is included in the request body, it must match the key’s tenant.
- Mismatch returns 403.