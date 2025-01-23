import fs from "node:fs/promises"

async function checkTranslations() {
  const translationFiles = await fs.readdir("messages");
  console.log(translationFiles);
}

checkTranslations();
