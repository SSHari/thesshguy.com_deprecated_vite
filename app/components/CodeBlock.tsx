import Highlight, { defaultProps } from 'prism-react-renderer';
import type { Language } from 'prism-react-renderer';
import theme from '../utils/prism-react-renderer/themes/tokyo-night-storm';

type CodeBlockProps = { code: string; lang: Language };

export const CodeBlock = ({ code, lang }: CodeBlockProps) => {
  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={lang}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="relative">
          <span
            className="absolute right-4 top-0 py-1 px-2 rounded-b-md bg-gray-300 text-gray-900 font-bold"
            style={{
              backgroundColor: style.color as string,
              color: style.backgroundColor as string,
            }}
          >
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
};
