
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function CodeBlock({ code, language = 'plaintext' }: {code: string, language?: string}) {
  return (
    <div className="text-sm max-h-128 overflow-y-auto rounded-md">
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}