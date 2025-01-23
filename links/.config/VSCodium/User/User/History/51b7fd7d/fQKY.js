function parse(fileContents) {
  const jsDocRegex = /\/\*\*([\s\S]*?)\*\//g;
  const functionNameRegex =
    /function\s+([\w\d_]+)\s*\(|([\w\d_]+)\s*=\s*\(?\s*function|([\w\d_]+)\s*:\s*\(?\s*function/; // Handles function declarations, assignments, and object method assignments
  let matches;
  const parsedDocs = [];

  // Loop over all JSDoc matches in the file
  while ((matches = jsDocRegex.exec(fileContents)) !== null) {
    const jsDocComment = matches[0];
    const jsDocEndIndex = matches.index + jsDocComment.length;
    const remainingFile = fileContents.slice(jsDocEndIndex);

    const parsed = jsDocParser(jsDocComment);

    // Now extract the function name from the code immediately following the JSDoc
    const functionNameMatch = remainingFile.match(functionNameRegex);
    if (functionNameMatch) {
      parsed.name =
        functionNameMatch[1] || functionNameMatch[2] || functionNameMatch[3];
    }

    parsedDocs.push(parsed);
  }

  return parsedDocs;
}

// Parse a single JSDoc block
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

    // Extracting @param annotations with optional/default values, nested params, and types
    const paramMatch = line.match(
      /\*\s*@param\s*{([^}]+)}\s*(\[[^\]]+\]|[\w\d.]+)\s*-\s*(.*)/
    );
    if (paramMatch) {
      const param = {
        type: paramMatch[1],
        name: paramMatch[2].replace(/[[\]]/g, ''), // remove brackets from optional params
        description: paramMatch[3]
      };
      console.log(
        paramMatch[2],
        paramMatch[2].match(
          /\[\s*(['"]?[^'"\]]+['"]?)=\s*(['"]?[^'"\]]+['"]?)\]/
        )
      );

      // Extract default value if present (e.g., [e.title='Title'])
      const optionalParamMatch = paramMatch[2].match(
        /\[\s*(['"]?[^'"\]]+['"]?)=\s*(['"]?[^'"\]]+['"]?)\]/
      );
      if (optionalParamMatch) {
        param.name = optionalParamMatch[1]; // Update name to the part before the '='
        param.default = optionalParamMatch[2]; // Capture the default value (with or without quotes)
      }

      parsed.params = parsed.params || [];
      parsed.params.push(param);
    }

    // Extracting return annotations
    const returnMatch = line.match(/\*\s*@returns\s*{([^}]+)}\s*(.*)/);
    if (returnMatch) {
      parsed.returns = {
        type: returnMatch[1],
        description: returnMatch[2]
      };
    }

    // Extracting the function name if @name tag is used
    const nameMatch = line.match(/\*\s*@name\s*([\w\d]+)/);
    if (nameMatch) {
      parsed.name = nameMatch[1];
    }
  });

  return parsed;
};

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
