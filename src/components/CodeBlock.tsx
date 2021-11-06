import * as React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/palenight';

type CodeBlockProps = { code: string; lang: Language };

export default function CodeBlock({ code, lang }: CodeBlockProps) {
  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={lang}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} px-8 rounded-md my-8 relative overflow-x-auto`}
          style={style}
        >
          <span className="absolute right-4 top-0 font-bold">{lang}</span>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
