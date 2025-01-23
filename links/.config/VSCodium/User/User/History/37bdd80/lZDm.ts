import { mkdirSync } from "fs";
import { incompleteDir } from "./songs";

mkdirSync(incompleteDir, { recursive: true });
mkdirSync(coverDir, { recursive: true });
