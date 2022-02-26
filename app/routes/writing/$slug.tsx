import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { MDXLayout } from '~/components/MDXLayout';
import { bundleMDX } from '~/utils/mdx-handler.server';
import type { definitions } from '~/types/supabase';
import { supabase } from '~/utils/supabase.server';

type Blog = definitions['Blogs'];
type LoaderData = Required<Pick<Blog, 'title' | 'content'>>;

export const loader: LoaderFunction = async ({ params }) => {
  const { data, error } = await supabase
    .from<Blog>('Blogs')
    .select('blog_id, title, content')
    .eq('blog_slug', params.slug ?? '')
    .single();

  if (error) {
    throw new Response(error.message, { status: 404 });
  }

  const code = await bundleMDX(data?.content ?? '');

  return { title: data?.title, content: code };
};

export default function BlogPage() {
  const { title, content } = useLoaderData<LoaderData>();

  return <MDXLayout mdx={content} />;
}
