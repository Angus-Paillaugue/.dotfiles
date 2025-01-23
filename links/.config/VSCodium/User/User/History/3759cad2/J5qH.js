import fs from "node:fs/promises"

async function checkTranslations() {
  const translationFiles = await fs.readdir("messages");
  const filePaths = translationFiles.map((file) => `messages/${file}`);

  const translations = await Promise.all(
    filePaths.map(async (filePath) => {
      const content = await fs.readFile(filePath, "utf-8");
      return JSON.parse(content);
    })
  );

  const allKeys = new Set();
  translations.forEach((translation) => {
    Object.keys(translation).forEach((key) => allKeys.add(key));
  });

  translations.forEach((translation, index) => {
    const missingKeys = [...allKeys].filter((key) => !(key in translation));
    if (missingKeys.length > 0) {
      console.log(`Missing keys in ${translationFiles[index]}:`);
      missingKeys.forEach((key) => console.log(`- ${key}`));
    }
  });

  const areAllFilesOK = translations.every((translation) => allKeys.size === Object.keys(translation).length);

  if (areAllFilesOK) {
    console.log('✓ All translations are OK!');
  } else {
    console.log('✖ Some translations are missing!');
  }
}

checkTranslations();
