const tagStyles: Record<string, React.CSSProperties> = {
  "ba.vup": { color: "#0098DC" },
  "ba.vdown": { color: "#FF6237" },
  "ba.rem": { color: "#F49800" },
};

export function parseBlackBoard(str: string, blackboard: any): string {
  try {
    if (!str) return "";

    return str.replace(/{([^}:]+)(?::([^}]+))?}/g, (_, key, format) => {
        // console.log("Parsing key:", key, "with format:", format);

        // const entry = blackboard[key];
        // if (!entry) return `{${key}}`;

        const entry = blackboard.find((b: any) => b.key === key);
        if (!entry) return `{${key}}`;
        let val = entry.value;

        if (format === "0%") return `${Math.round(val * 100)}%`;
        if (format === "0.0") return val.toFixed(1);
        if (format === "0") return val.toFixed(0);

        return val.toString();
      }
    );

  } catch (e) {
    return str;
  }
}

export function parseRichText(str: string): React.ReactNode[] {
  const regex = /<(\$|@)([^>]+)?>(.+?)<\/>/g;
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(str)) !== null) {

    // match[1]: $ or @
    // match[2]: tag name (e.g., ba.vup) or undefined
    // match[3]: inner text
    
    if (match.index > lastIndex) {
      const before = str.slice(lastIndex, match.index);
      result.push(before);
    }

    if (match[1] === '$') {
      result.push(
        <span key={key++} className="underline">{match[3]}</span>
      );
    }
    
    if (match[1] === '@') {
      if (match[2] && tagStyles[match[2]]) {
        result.push(
          <span key={key++} style={tagStyles[match[2]]}>{match[3]}</span>
        );
      } else {
        result.push(
          <span key={key++} className="font-bold">{match[3]}</span>
        );
      }
    }

    lastIndex = regex.lastIndex;
  }
  // Push any remaining text
  if (lastIndex < str.length) {
    const after = str.slice(lastIndex);
    result.push(after);
  }
  return result;
}