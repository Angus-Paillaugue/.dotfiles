import { API_URL } from "../constants";

export async function getLogs(limit = 100) {
  return await fetch(API_URL+`/logs?limit=${limit}`).then((res) => res.json());
}
