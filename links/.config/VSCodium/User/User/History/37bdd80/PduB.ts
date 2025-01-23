import { mkdirSync } from "fs";
import { coverDir, incompleteDir } from "./songs";
import { mkdir } from "fs/promises";

export async function bootstrap() {
  mkdir(incompleteDir, { recursive: true });
  mkdir(coverDir, { recursive: true });
}
