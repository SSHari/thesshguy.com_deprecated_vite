import {
  useActionData,
  useLoaderData,
  useTransition,
  redirect,
  json,
} from 'remix';
import type { ActionFunction, LoaderFunction } from 'remix';
import { BlogEditor } from '~/components/BlogEditor';
// TODO: Rename to a server only file
import { createAuthClient } from '~/utils/supabase';
import type { definitions } from '~/types/supabase';
import { getAuthToken } from '~/utils/session.server';

type Blog = definitions['Blogs'];
type BlogInfo = Pick<
  Blog,
  'blog_id' | 'title' | 'blog_slug' | 'content' | 'is_published'
>;
type LoaderData = { blog: BlogInfo };

export const loader: LoaderFunction = async ({ params, request }) => {
  if (!params.blog_slug) return redirect('/admin');

  const jwt = await getAuthToken(request);
  const authSupabase = createAuthClient(jwt);

  const { data: blog, error } = await authSupabase
    .from<Blog>('Blogs')
    .select('blog_id, title, blog_slug, content, is_published')
    .eq('blog_slug', params.blog_slug)
    .single();

  if (error) {
    throw new Response(error.message, { status: 404 });
  }

  return { blog };
};

type ActionData = { formError?: string; formData?: BlogInfo };

const badRequest = (data: ActionData, status = 400) => json(data, { status });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const blog_id = form.get('blog_id');
  const title = form.get('title');
  const blog_slug = form.get('blog_slug');
  const is_published = !!form.get('is_published');
  const content = form.get('content');

  if (
    typeof blog_id !== 'string' ||
    typeof title !== 'string' ||
    typeof blog_slug !== 'string' ||
    typeof content !== 'string'
  ) {
    return badRequest({ formError: 'There was an error with the form' });
  }

  const jwt = await getAuthToken(request);
  const authSupabase = createAuthClient(jwt);

  const { error } = await authSupabase
    .from<Blog>('Blogs')
    .update(
      { title, blog_slug, is_published, content },
      { returning: 'minimal' },
    )
    .eq('blog_id', blog_id);

  if (!error && is_published) return redirect(`/writing/${blog_slug}`);
  else if (!error) return redirect('/admin');

  return badRequest({
    formData: {
      blog_id: Number(blog_id),
      title,
      blog_slug,
      is_published,
      content,
    },
    formError: 'There was an error updating the blog.',
  });
};

export default function EditBlog() {
  const loaderData = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const transition = useTransition();
  const formData = { ...loaderData.blog, ...actionData?.formData };

  return (
    <BlogEditor
      {...formData}
      formError={actionData?.formError}
      isIdle={transition.state === 'idle'}
    />
  );
}
