import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { MDXLayout } from '~/components/MDXLayout';
import { bundleMDX } from '~/utils/mdx-handler.server';
import type { definitions } from '~/types/supabase';
import { getRedisClient, redisKeys } from '~/utils/redis.server';
import { supabase } from '~/utils/supabase.server';

type Blog = definitions['Blogs'];
type LoaderData = Required<Pick<Blog, 'title' | 'content'>>;

export const loader: LoaderFunction = async ({ params }) => {
  const redis = await getRedisClient();

  // Return the cached MDX instead of hitting the DB
  const cachedMDX = await redis.getJson(redisKeys.WRITING_POST(params.slug!));
  if (cachedMDX) return cachedMDX as LoaderData;

  // Rebundle the MDX if it doesn't exist in the cache
  const { data, error } = await supabase
    .from<Blog>('Blogs')
    .select('blog_id, title, content')
    .eq('blog_slug', params.slug ?? '')
    .single();

  if (error) {
    throw new Response(error.message, { status: 404 });
  }

  const { code } = await bundleMDX(data?.content ?? '');
  const loaderData: LoaderData = { title: data?.title, content: code };

  // Cache the MDX
  await redis.setJson(redisKeys.WRITING_POST(params.slug!), loaderData);

  return loaderData;
};

export default function BlogPage() {
  const { title, content } = useLoaderData<LoaderData>();

  return <MDXLayout mdx={content} />;
}
