export function getLogs(limit = 100) {
  return fetch(`/api/logs?limit=${limit}`).then(res => res.json());
}
