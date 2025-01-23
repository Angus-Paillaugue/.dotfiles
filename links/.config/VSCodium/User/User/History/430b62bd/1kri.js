import { API_URL } from "../constants";

export async function getLogs(limit = 100) {
  const res = await fetch(API_URL+`/logs?limit=${limit}`);

  if(!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
