import React from "react";
import { Highlight } from "prism-react-renderer";

type CodeBlockProps = {
  code: string;
  language?: string;
};

const CodeBlock = ({ code, language = "plaintext" }: CodeBlockProps) => (
  <Highlight code={code} language={language}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={"text-sm p-4 rounded-lg overflow-x-auto " + (className ?? "")} style={style}>
        {tokens.map((line, i) => {
          const lineProps = getLineProps({ line });
          return (
            <div key={i} {...lineProps}>
              {line.map((token, key) => {
                const tokenProps = getTokenProps({ token });
                return <span key={key} {...tokenProps} />;
              })}
            </div>
          );
        })}
      </pre>
    )}
  </Highlight>
);

export default CodeBlock;