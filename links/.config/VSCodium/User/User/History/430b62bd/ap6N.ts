import { API_URL } from "../constants";
import { type Log } from "../../app.d";

export async function getLogs(limit: number = 100) : Promise<Log> {
  const res = await fetch(API_URL+`/logs?limit=${limit}`);

  if(!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
