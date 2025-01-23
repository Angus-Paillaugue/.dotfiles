function parse(fileContents) {
  const jsDocRegex = /\/\*\*([\s\S]*?)\*\//g;
  const matches = fileContents.match(jsDocRegex);
  console.log(matches);


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

      // Extracting the function name
      const nameMatch = line.match(/\*\s*@name\s*([\w\d]+)/);
      if (nameMatch) {
        parsed.name = nameMatch[1];
      }
    });

    return parsed;
  };

  return matches.map(jsDocParser);
}

export const parseJSDoc = async (filename) => {
  if (!Array.isArray(filename)) {
    return [
      parse(
        (await import(/* @vite-ignore */ `/src/lib/components/${filename}?raw`))
          .default
      )
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
