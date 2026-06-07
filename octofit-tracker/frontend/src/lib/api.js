const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export function buildApiUrl(resource) {
  return `${apiHost}/api/${resource}/`;
}

export function extractCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const candidates = [
    payload.results,
    payload.items,
    payload.data,
    payload.docs,
    payload.records,
  ];

  for (const value of candidates) {
    if (Array.isArray(value)) {
      return value;
    }
  }

  if (payload.data && typeof payload.data === 'object') {
    const nestedCandidates = [payload.data.results, payload.data.items, payload.data.records];
    for (const value of nestedCandidates) {
      if (Array.isArray(value)) {
        return value;
      }
    }
  }

  return [];
}

export function getApiHost() {
  return apiHost;
}

export function isCodespaceConfigured() {
  return Boolean(codespaceName);
}
