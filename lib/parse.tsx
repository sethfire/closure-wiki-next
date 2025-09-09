const tagStyles: Record<string, React.CSSProperties> = {
  "ba.kw": { color: "#00B0FF" },
  "ba.talpu": { color: "#0098DC" },
  "ba.vup": { color: "#0098DC" },
  "ba.vdown": { color: "#FF6237" },
  "ba.rem": { color: "#F49800" },
  "eb.key": { color: "#00FFFF" },
  "eb.danger": { color: "#FF0000" },
};

export function parseBlackBoard(str: string, blackboard: any): string {
  try {
    if (!str) return "";

    return str.replace(/{([^}:]+)(?::([^}]+))?}/g, (_, key, format) => {
        // console.log("Parsing key:", key, "with format:", format);

        const entry = blackboard[key];
        if (!entry) return `{${key}}`;
        let val = entry;

        // const entry = blackboard.find((b: any) => b.key === key);
        // if (!entry) return `{${key}}`;
        // let val = entry.value;

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

export function stripTags(str: string): string {
  if (!str) return "";
  return str.replace(/<(?:@|\$)[^>]*>(.*?)<\/>/g, '$1');
}

const OPEN_RE = /^<([@$]?)([\w.]+)>/;
const CLOSE_RE = /^<\/>/;

function cssToInline(styleObj?: React.CSSProperties) {
  if (!styleObj) return "";
  const css = Object.entries(styleObj)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}:${String(v)}`)
    .join(";");
  return css ? ` style="${css}"` : "";
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function parseRichText(raw: string): string {
  const input = raw.replace(/\\n/g, "\n");
  // console.log(input)

  let i = 0;
  let out = "";
  const stack: string[] = [];

  while (i < input.length) {
    const slice = input.slice(i);

    const open = OPEN_RE.exec(slice);
    if (open) {
      const prefix = open[1];
      const tagName = open[2];
      stack.push(tagName);

      const base = tagStyles[tagName] as React.CSSProperties | undefined;

      const style: React.CSSProperties | undefined =
        prefix === "$" ? { ...(base ?? {}), textDecoration: "underline" } : base;

      out += `<span${cssToInline(style)}>`;
      i += open[0].length;
      continue;
    }

    if (CLOSE_RE.test(slice)) {
      if (stack.length) stack.pop();
      out += `</span>`;
      i += 3;
      continue;
    }

    const nextLt = slice.indexOf("<");
    if (nextLt === -1) {
      out += escapeHtml(slice);
      break;
    }
    if (nextLt > 0) {
      out += escapeHtml(slice.slice(0, nextLt));
      i += nextLt;
      continue;
    }

    out += "&lt;";
    i += 1;
  }

  // close any unclosed spans
  while (stack.length) {
    stack.pop();
    out += `</span>`;
  }

  return out.replace(/\n/g, "<br>");
}
