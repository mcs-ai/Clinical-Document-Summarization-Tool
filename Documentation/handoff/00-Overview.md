# MCS AI Summarizer API — Overview

## What this is
A stateless HTTP API that summarizes clinical transcripts/notes into:
- Clinician-facing SOAP output (structured JSON)
- Optional plain-language patient summary (toggle)

## What it is not
- Not a diagnostic tool
- Not a treatment recommender
- Does not invent vitals/exams/labs or other facts not present in the input

## Endpoints
- POST /v1/summaries
- GET /health
- GET /ready

## Hosting
Azure App Service (Web App): mcsai-summarizer-api