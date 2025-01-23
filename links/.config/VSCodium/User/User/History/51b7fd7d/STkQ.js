function parse(fileContents) {
  const jsDocRegex = /\/\*\*([\s\S]*?)\*\//g;
  const functionNameRegex =
    /function\s+([\w\d_]+)\s*\(|([\w\d_]+)\s*=\s*\(?\s*function|([\w\d_]+)\s*:\s*\(?\s*function/; // Handles function declarations, assignments, and object method assignments
  let matches;
  const parsedDocs = [];

  while ((matches = jsDocRegex.exec(fileContents)) !== null) {
    const jsDocComment = matches[0];
    const jsDocEndIndex = matches.index + jsDocComment.length;
    const remainingFile = fileContents.slice(jsDocEndIndex);

    const parsed = jsDocParser(jsDocComment);

    const functionNameMatch = remainingFile.match(functionNameRegex);
    if (functionNameMatch) {
      parsed.name =
        functionNameMatch[1] || functionNameMatch[2] || functionNameMatch[3];
    }

    parsedDocs.push(parsed);
  }

  return parsedDocs;
}

const jsDocParser = (jsDocComment) => {
  const lines = jsDocComment.split('\n').map((line) => line.trim());
  const parsed = {};

  lines.forEach((line) => {
    if (
      !line.startsWith('* @') &&
      !line.startsWith('/**') &&
      !line.startsWith('*/')
    ) {
      parsed.description =
        (parsed.description || '') + ' ' + line.replace('*', '').trim();
    }

    const paramMatch = line.match(
      /\*\s*@param\s*{([^}]+)}\s*(\[[^\]]+\]|[\w\d.]+)\s*-\s*(.*)/
    );
    if (paramMatch) {
      const param = {
        type: paramMatch[1],
        name: paramMatch[2].replace(/[\[\]]/g, ''),
        description: paramMatch[3]
      };

      const optionalParamMatch = paramMatch[2].match(
        /\[([\w.]+)\s*=\s*(['"]?[^'"\]]+['"]?)\]/
      );
      if (optionalParamMatch) {
        param.name = optionalParamMatch[1];
        param.default = optionalParamMatch[2];
      }

      parsed.params = parsed.params || [];
      parsed.params.push(param);
    }

    const returnMatch = line.match(/\*\s*@returns\s*{([^}]+)}\s*(.*)/);
    if (returnMatch) {
      parsed.returns = {
        type: returnMatch[1],
        description: returnMatch[2]
      };
    }

    const nameMatch = line.match(/\*\s*@name\s*([\w\d]+)/);
    if (nameMatch) {
      parsed.name = nameMatch[1];
    }

    const exampleMatch = line.match(/\*\s*@example\s*(.*)/);
    if (exampleMatch) {
      parsed.example = parsed.example || [];
      parsed.example.push(exampleMatch[1].trim());
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
