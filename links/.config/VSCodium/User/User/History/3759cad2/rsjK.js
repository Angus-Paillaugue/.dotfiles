import fs from "node:fs/promises"

async function checkTranslations() {
  const translationFiles = await fs.readdir("messages")
}
