import { getToken } from "./refresh-token";

export async function appendAuthHeader(headers: Headers) {
  const accessToken = await getToken();
  headers.append("Authorization", `Bearer ${accessToken}`);
  return headers;
}
