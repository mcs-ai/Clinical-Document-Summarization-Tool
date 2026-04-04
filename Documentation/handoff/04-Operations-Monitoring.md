# Operations & Monitoring

## Application Insights
Use App Insights to track:
- Request count
- Failed requests (4xx/5xx)
- Server response time
- Availability

## Health checks
- /health and /ready can be used for uptime checks.

## Logging
Avoid logging full note text. Log requestId, tenant, status code, and latency.