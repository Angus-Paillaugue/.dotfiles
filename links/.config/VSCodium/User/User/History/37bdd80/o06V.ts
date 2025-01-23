import { mkdirSync } from "fs";
import { coverDir, incompleteDir } from "./songs";

export async function bootstrap() {
  mkdir(incompleteDir, { recursive: true });
  mkdir(coverDir, { recursive: true });
}
