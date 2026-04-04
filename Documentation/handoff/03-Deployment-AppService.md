# Deployment (Azure App Service)

## App Service
Web App name: mcsai-summarizer-api

## Environment variables (App Service Configuration)
Set values in Azure Portal → App Service → Configuration.

Common:
- TENANT_KEYS_JSON
- RATE_LIMIT_MAX
- RATE_LIMIT_WINDOW

LLM provider:
- LLM_PROVIDER=azure_openai

Azure OpenAI / Foundry:
- AZURE_OPENAI_BASE_URL
- AZURE_OPENAI_API_KEY
- AZURE_DEPLOYMENT_NAME

Output limits:
- SOAP_MAX_TOKENS
- PLAIN_MAX_TOKENS
- LLM_TIMEOUT_MS
- LLM_MAX_RETRIES

## CI/CD
GitHub Actions deploy workflow uses publish profile secret:
- AZURE_WEBAPP_PUBLISH_PROFILE