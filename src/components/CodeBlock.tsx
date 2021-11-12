import * as React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/palenight';

type CodeBlockProps = { code: string; lang: Language };

export default function CodeBlock({ code, lang }: CodeBlockProps) {
  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={lang}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="relative">
          <span className="absolute right-4 top-0 py-1 px-2 rounded-b-md bg-gray-300 text-gray-900 font-bold">
            {lang}
          </span>
          <pre
            className={`${className} p-8 rounded-md my-8 overflow-x-auto`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  );
}
