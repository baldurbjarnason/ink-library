class HTTPError extends Error {
  constructor(type, response) {
    super(type);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HTTPError);
    }
    if (response) {
      this.statusCode = response.status;
      this.response = response;
    }
  }
}

export async function fetch(...args) {
  const response = await window.fetch(...args);
  if (!response.ok) {
    throw new HTTPError("API Request Error", response);
  }
  return response.json();
}
