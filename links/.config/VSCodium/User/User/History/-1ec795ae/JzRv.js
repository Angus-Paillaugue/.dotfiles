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
  let capturingExample = false;
  let exampleContent = [];

  lines.forEach((line) => {
    // Handle the description part (outside of tags)
    if (
      !line.startsWith('* @') &&
      !line.startsWith('/**') &&
      !line.startsWith('*/') &&
      !capturingExample
    ) {
      parsed.description =
        (parsed.description || '') + ' ' + line.replace('*', '').trim();
    }

    // Handle multi-line @example tag
    if (line.startsWith('* @example')) {
      capturingExample = true;
      exampleContent.push(line.replace('* @example', '').trim());
    } else if (capturingExample) {
      // Stop capturing if another tag starts or if it's the end of the comment block
      if (line.startsWith('* @') || line.startsWith('*/')) {
        capturingExample = false;
        parsed.example = exampleContent.join('\n').trim();
        exampleContent = [];
      } else {
        exampleContent.push(line.replace('*', '').trim());
      }
    }

    // Handle @param tag, including optional values and default values
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

      // Extract accepted values from the description if they are present, e.g., "One of 'error', 'success', 'warning', 'info'."
      const acceptedValuesMatch = paramMatch[3].match(
        /One of\s+(['"][\w\s'",]+['"])/
      );
      // param.name.match(
      //   /One of\s+(['"][\w\s'",]+['"])/
      // )[1];
      console.log(param.description.match(/One of\s+(['"][\w\s'",]+['"])/));

      if (acceptedValuesMatch) {
        param.acceptedValues = acceptedValuesMatch[1]
          .split(',')
          .map((v) => v.trim().replace(/['"]/g, ''));
      }

      parsed.params = parsed.params || [];
      parsed.params.push(param);
    }

    // Handle @returns tag
    const returnMatch = line.match(/\*\s*@returns\s*{([^}]+)}\s*(.*)/);
    if (returnMatch) {
      parsed.returns = {
        type: returnMatch[1],
        description: returnMatch[2]
      };
    }

    // Handle @name tag
    const nameMatch = line.match(/\*\s*@name\s*([\w\d]+)/);
    if (nameMatch) {
      parsed.name = nameMatch[1];
    }
  });

  // Capture any trailing example content after loop
  if (capturingExample) {
    parsed.example = exampleContent.join('\n').trim();
  }

  return parsed;
};

export const parseJSDoc = async (filename) => {
  if (!Array.isArray(filename)) {
    return [
      parse(
        (await import(/* @vite-ignore */ `/src/lib/components/docs/${filename}?raw`))
          .default
      )
    ];
  } else {
    return (
      await Promise.all(
        filename.map(
          async (file) =>
            (await import(/* @vite-ignore */ `/src/lib/components/docs/${file}?raw`))
              .default
        )
      )
    ).map((file) => parse(file));
  }
};
