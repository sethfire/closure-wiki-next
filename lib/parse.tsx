export function parseRichText(str: string): React.ReactNode[] {
  const regex = /<(\$|@)[^>]+>(.+?)<\/>/g;
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(str)) !== null) {
    // Push text before the match
    if (match.index > lastIndex) {
      const before = str.slice(lastIndex, match.index);
      result.push(before);
    }
    // Apply underline for <$...> and bold for <@...>
    if (match[1] === '$') {
      result.push(
        <span key={key++} className="underline">{match[2]}</span>
      );
    } else if (match[1] === '@') {
      result.push(
        <span key={key++} className="font-bold">{match[2]}</span>
      );
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