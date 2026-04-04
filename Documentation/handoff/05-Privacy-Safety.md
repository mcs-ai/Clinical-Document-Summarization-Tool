# Privacy & Safety

## Stateless-by-design
The service does not persist note contents to a database.

## Safety behavior
- Preserves safety-critical content if present in input
- Does not invent missing information
- Uses "Not specified" behavior for absent sections

## Developer responsibility
Ensure logs and telemetry do not capture PHI/PII.