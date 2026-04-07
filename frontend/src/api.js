const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

function buildUrl(path) {
  return `${API_BASE}${path}`;
}

async function parsePayload(response) {
  const contentType = response.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      return await response.json();
    }

    const text = await response.text();
    return text ? { message: text } : null;
  } catch {
    return null;
  }
}

function getErrorMessage(payload, fallback) {
  if (!payload) {
    return fallback;
  }

  if (payload.fieldErrors) {
    const firstFieldError = Object.values(payload.fieldErrors)[0];
    if (firstFieldError) {
      return firstFieldError;
    }
  }

  return payload.message || payload.error || fallback;
}

export async function apiRequest(path, options = {}) {
  const { token, headers, body, idempotencyKey, ...restOptions } = options;
  const response = await fetch(buildUrl(path), {
    ...restOptions,
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
      ...headers,
    },
    body,
  });

  const payload = await parsePayload(response);

  if (!response.ok) {
    const error = new Error(getErrorMessage(payload, "Request failed"));
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

export function formatDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
