import * as React from 'react';
// @ts-ignore
import { MDXProvider } from '@mdx-js/react';
import * as asideComponents from './Aside';
import CodeBlock from './CodeBlock';
import ToolbarHeader from './ToolbarHeader';
import { CustomCSSProperties } from '../utils';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <MDXProvider components={components}>
      <div
        style={
          {
            '--min-clamp': '500px',
            '--ideal-clamp': '60%',
            '--max-clamp': '900px',
          } as CustomCSSProperties
        }
        className="isolate clamp-width mx-auto"
      >
        <ToolbarHeader className="z-10" />
        <main className="p-4">{children}</main>
        {/* Temporary spacer component until we get a Footer */}
        <div className="h-8" />
      </div>
    </MDXProvider>
  );
}

/* Styled Components */
// TODO: Move some of this into the overall styles
const h1 = (props: any) => (
  <h1 className="text-5xl my-8 font-medium" {...props} />
);

const h2 = (props: any) => (
  <h2 className="text-4xl my-6 font-medium" {...props} />
);

const h3 = (props: any) => (
  <h3 className="text-3xl my-4 font-medium" {...props} />
);

const a = (props: any) => (
  <a className="text-primary hover:text-gray-600 font-medium" {...props} />
);

const code = ({ children = '', className = '' }: any) => {
  const [_, lang] = className.split('-');
  return (
    // Offset the padding added by the parent to allow for
    // code blocks to extend to the edges on smaller screens.
    <div className="-m-4">
      <CodeBlock code={children.trim()} lang={lang} />
    </div>
  );
};

const inlineCode = (props: any) => (
  <code className="bg-gray-200 text-secondary p-1 pb-0.5 rounded" {...props} />
);

/* Shortcodes */

// Text that is important for the topic being discussed
const TopicText = (props: any) => (
  <span {...props} className="text-secondary font-medium" />
);

const components = {
  h1,
  h2,
  h3,
  a,
  code,
  inlineCode,
  TopicText,
  ...asideComponents,
};
