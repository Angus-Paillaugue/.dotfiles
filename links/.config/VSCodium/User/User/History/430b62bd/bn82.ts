import { API_URL } from "../constants";
import { Log } from "@types";

export async function getLogs(limit: number = 100) : Promise<Log> {
  const res = await fetch(API_URL+`/logs?limit=${limit}`);

  if(!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
