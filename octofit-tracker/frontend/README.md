# OctoFit Tracker Frontend (React 19 + Vite)

## Environment variable for Codespaces

Define `VITE_CODESPACE_NAME` in `.env.local`.

Example:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When set, API requests use:

`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

When `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

`http://localhost:8000/api/[component]/`

This prevents invalid URLs such as `https://undefined-8000.app.github.dev`.

## Run

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
