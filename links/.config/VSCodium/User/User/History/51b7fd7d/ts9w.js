function parse(fileContents) {
  const jsDocRegex = /\/\*\*([\s\S]*?)\*\//g;
  const matches = fileContents.match(jsDocRegex);

  // Step 2: Parse each JSDoc comment block
  const jsDocParser = (jsDocComment) => {
    const lines = jsDocComment.split('\n').map((line) => line.trim());
    const parsed = {};

    lines.forEach((line) => {
      // Extracting the description
      if (
        !line.startsWith('* @') &&
        !line.startsWith('/**') &&
        !line.startsWith('*/')
      ) {
        parsed.description =
          (parsed.description || '') + ' ' + line.replace('*', '').trim();
      }

      // Extracting annotations like @param, @return, etc.
      const paramMatch = line.match(
        /\*\s*@param\s*{([^}]+)}\s*([\w\d]+)\s*-\s*(.*)/
      );
      if (paramMatch) {
        parsed.params = parsed.params || [];
        parsed.params.push({
          type: paramMatch[1],
          name: paramMatch[2],
          description: paramMatch[3]
        });
      }

      const returnMatch = line.match(/\*\s*@returns\s*{([^}]+)}\s*(.*)/);
      if (returnMatch) {
        parsed.returns = {
          type: returnMatch[1],
          description: returnMatch[2]
        };
      }
    });

    return parsed;
  };

  return matches.map(jsDocParser);
}
export const parseJSDoc = async(filename) => {
  console.log(filename, filename instanceof String);


  if (!(filename) {
    return [
      parse(
        await import(/* @vite-ignore */ `/src/lib/components/${filename}?raw`)
      ).default
    ];
  } else {
    return (
      await Promise.all(
        filename.map(
          async (file) =>
            (await import(/* @vite-ignore */ `/src/lib/components/${file}?raw`))
              .default
        )
      )
    ).map((file) => parse(file));
  }
};
