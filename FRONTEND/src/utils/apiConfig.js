const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:3000/api/v1";

const withProtocol =
  rawBaseUrl.startsWith("http://") || rawBaseUrl.startsWith("https://")
    ? rawBaseUrl
    : rawBaseUrl.startsWith("localhost") || rawBaseUrl.startsWith("127.0.0.1")
      ? `http://${rawBaseUrl}`
      : `https://${rawBaseUrl}`;

export const API_BASE_URL = withProtocol.replace(/\/+$/, "");

export const apiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

