import { mkdirSync } from "fs";
import { join } from "path";

// Create the directories if it doesn't exist
mkdirSync(join(songsDir, incompleteDirName), { recursive: true });
mkdirSync(join(songsDir, coverDirName), { recursive: true });
