import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { MDXLayout } from '~/components/MDXLayout';
import { bundleMDX } from '~/utils/mdx-handler.server';
import type { definitions } from '~/types/supabase';
import { supabase } from '~/utils/supabase';

type Demo = definitions['Demos'];
type LoaderData = Required<Pick<Demo, 'title' | 'content'>>;

export const loader: LoaderFunction = async ({ params }) => {
  const { data, error } = await supabase
    .from<Demo>('Demos')
    .select('demo_id, title, content')
    .eq('demo_slug', params.slug ?? '')
    .single();

  if (error) {
    throw new Response(error.message, { status: 404 });
  }

  const code = await bundleMDX(data?.content ?? '');

  return { title: data?.title, content: code };
};

export default function DemoPage() {
  const { title, content } = useLoaderData<LoaderData>();

  return <MDXLayout mdx={content} />;
}
