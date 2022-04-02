import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { ErrorBoundary } from 'react-error-boundary';
import type { FallbackProps } from 'react-error-boundary';
import { CodeBlock } from './CodeBlock';

/* Styled Components */

const h1 = (props: any) => (
  <h1 className="my-8 text-5xl font-medium" {...props} />
);

const h2 = (props: any) => (
  <h2 className="my-6 text-4xl font-medium" {...props} />
);

const h3 = (props: any) => (
  <h3 className="my-4 text-3xl font-medium" {...props} />
);

const a = (props: any) => (
  <a className="font-medium text-primary hover:text-gray-600" {...props} />
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
  <code className="rounded bg-gray-200 p-1 pb-0.5 text-secondary" {...props} />
);

/* Shortcodes */

// Text that is important for the topic being discussed
const TopicText = (props: any) => (
  <span {...props} className="font-medium text-secondary" />
);

const components = { h1, h2, h3, a, code, inlineCode, TopicText };

const MDXErrorBoundaryFallback = (props: FallbackProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-2xl font-bold">Oh no!</span>
      <span className="text-xl">There was an issue rendering the MDX</span>
      <span className="text-sm">Blame Sai...</span>
      <div className="mt-2 flex w-full flex-col gap-2">
        <span className="font-bold">Error:</span>
        <pre className="overflow-auto">{props.error.message}</pre>
      </div>
    </div>
  );
};

export const MDXLayout = ({ mdx }: { mdx: string }) => {
  const Component = useMemo(() => getMDXComponent(mdx), [mdx]);
  return (
    <div className="isolate">
      <ErrorBoundary
        FallbackComponent={MDXErrorBoundaryFallback}
        resetKeys={[Component]}
      >
        <Component components={components} />
      </ErrorBoundary>
    </div>
  );
};
