import { mkdirSync } from "fs";
import { coverDir, incompleteDir } from "./songs";

mkdirSync(incompleteDir, { recursive: true });
mkdirSync(coverDir, { recursive: true });
