import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { MDXLayout } from '~/components/MDXLayout';
import { ToolbarHeader } from '~/components/ToolbarHeader';
import type { CustomCSSProperties } from '~/utils/styles';
import { bundleMDX } from '~/utils/mdx-handler.server';
import { searchLocalMDX } from '~/utils/search-local-mdx.server';

type LoaderData = { content: string };

export const loader: LoaderFunction = async ({ params }) => {
  const rawContent = await searchLocalMDX(params.slug);

  if (!rawContent) {
    throw new Response(`There's no MDX file with the slug ${params.slug}`, {
      status: 404,
    });
  }

  const { code } = await bundleMDX(rawContent?.toString() ?? '');

  return { content: code };
};

export default function DevPage() {
  const { content } = useLoaderData<LoaderData>();

  return (
    <div
      style={
        {
          '--min-clamp': '500px',
          '--ideal-clamp': '60%',
          '--max-clamp': '900px',
        } as CustomCSSProperties
      }
      className="clamp-width mx-auto"
    >
      <ToolbarHeader />
      <MDXLayout mdx={content} />
    </div>
  );
}
