const DEFAULT_BASE_URL = "http://localhost:8080/api";

function buildUrl(path: string, baseUrl: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export async function apiFetch<TResponse>(
  path: string,
  options: RequestInit = {},
  baseUrl: string = DEFAULT_BASE_URL
): Promise<TResponse> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = new Headers(options.headers ?? {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (!headers.has("Content-Type") && options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildUrl(path, baseUrl), {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}

export function apiGet<TResponse>(path: string, options: RequestInit = {}, baseUrl?: string) {
  return apiFetch<TResponse>(path, { ...options, method: "GET" }, baseUrl);
}

export function apiPost<TResponse, TBody = unknown>(
  path: string,
  body?: TBody,
  options: RequestInit = {},
  baseUrl?: string
) {
  return apiFetch<TResponse>(
    path,
    {
      ...options,
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    },
    baseUrl
  );
}

export function apiPut<TResponse, TBody = unknown>(
  path: string,
  body?: TBody,
  options: RequestInit = {},
  baseUrl?: string
) {
  return apiFetch<TResponse>(
    path,
    {
      ...options,
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    },
    baseUrl
  );
}

export function apiPatch<TResponse, TBody = unknown>(
  path: string,
  body?: TBody,
  options: RequestInit = {},
  baseUrl?: string
) {
  return apiFetch<TResponse>(
    path,
    {
      ...options,
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    },
    baseUrl
  );
}

export function apiDelete<TResponse>(path: string, options: RequestInit = {}, baseUrl?: string) {
  return apiFetch<TResponse>(path, { ...options, method: "DELETE" }, baseUrl);
}
