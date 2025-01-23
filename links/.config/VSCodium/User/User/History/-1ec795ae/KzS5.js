export const parseJSDoc = async (filename) => {
  if (!Array.isArray(filename)) {
    return [
      (
        await import(
          /* @vite-ignore */ `/src/lib/components/docs/${filename}`
        )
      ).doc
    ];
  } else {
    return (
      await Promise.all(
        filename.map(
          async (file) =>
            (await import(/* @vite-ignore */ `/src/lib/components/docs/${file}`)).doc
        )
      )
    );
  }
};
