import * as React from 'react';
// @ts-ignore
import { MDXProvider } from '@mdx-js/react';
import ToolbarHeader from '../components/ToolbarHeader';

/* Shortcodes */
import CodeBlock from '../components/CodeBlock';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <MDXProvider components={components}>
      <div className="isolate">
        <ToolbarHeader className="z-10" />
        <main className="w-4/5 mx-auto my-8 px-4">{children}</main>
        {/* Temporary spacer component until we get a Footer */}
        <div className="h-8" />
      </div>
    </MDXProvider>
  );
}

/* Styled Components */
const h1 = (props: any) => (
  <h1 className="text-5xl my-8 font-medium" {...props} />
);

const h2 = (props: any) => (
  <h2 className="text-4xl my-6 font-medium" {...props} />
);

const h3 = (props: any) => (
  <h3 className="text-3xl my-4 font-medium" {...props} />
);

const inlineCode = (props: any) => (
  <code className="bg-gray-200 text-secondary p-1 pb-0.5 rounded" {...props} />
);

const components = { h1, h2, h3, inlineCode, CodeBlock };
