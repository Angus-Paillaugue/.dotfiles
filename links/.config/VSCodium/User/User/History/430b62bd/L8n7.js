import { API_URL } from "../constants";

export function getLogs(limit = 100) {
  return fetch(API_URL+`/logs?limit=${limit}`).then((res) => res.json());
}
