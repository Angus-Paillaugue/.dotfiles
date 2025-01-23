function parse(fileContents) {
  const jsDocRegex = /\/\*\*([\s\S]*?)\*\//g;
  const functionNameRegex =
    /function\s+([\w\d_]+)\s*\(|([\w\d_]+)\s*=\s*\(?\s*function/; // Handles function declarations and assignments
  const matches = fileContents.match(jsDocRegex);

  const jsDocParser = (jsDocComment, remainingFile) => {
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

      // Extracting annotations like @param, @returns, etc.
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

      // Extracting the function name (if @name tag is used in the JSDoc)
      const nameMatch = line.match(/\*\s*@name\s*([\w\d]+)/);
      if (nameMatch) {
        parsed.name = nameMatch[1];
      }
    });

    // If @name is not provided, try to extract the function name from the code
    if (!parsed.name) {
      const remainingLines = remainingFile
        .split('\n')
        .map((line) => line.trim());
      for (const line of remainingLines) {
        const functionNameMatch = line.match(functionNameRegex);
        if (functionNameMatch) {
          parsed.name = functionNameMatch[1] || functionNameMatch[2];
          break;
        }
      }
    }

    return parsed;
  };

  // To associate JSDoc blocks with the correct function names, process the whole file after the JSDoc block
  let remainingFile = fileContents;
  return matches.map((jsDocComment) => {
    const parsedJsDoc = jsDocParser(jsDocComment, remainingFile);
    remainingFile = remainingFile.replace(jsDocComment, ''); // Remove the parsed JSDoc from the remaining code
    console.log(remainingFile);

    return parsedJsDoc;
  });
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
