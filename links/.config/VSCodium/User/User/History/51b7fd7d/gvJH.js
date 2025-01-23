function parse(fileContents) {
  const jsDocRegex = /\/\*\*([\s\S]*?)\*\//g;
  const functionRegex = /function\s+([\w\d]+)\s*\(/g;
  const matches = fileContents.match(jsDocRegex);
  const functions = fileContents.match(functionRegex);

  const jsDocParser = (jsDocComment, functionName) => {
    const lines = jsDocComment.split('\n').map((line) => line.trim());
    const parsed = { name: functionName };

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

  const parsedDocs = [];
  if (matches && functions) {
    for (let i = 0; i < matches.length; i++) {
      const functionNameMatch = functions[i].match(/function\s+([\w\d]+)\s*\(/);
      const functionName = functionNameMatch ? functionNameMatch[1] : null;
      parsedDocs.push(jsDocParser(matches[i], functionName));
    }
  }

  return parsedDocs;
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
