import { useActionData, useTransition, redirect, json } from 'remix';
import type { ActionFunction } from 'remix';
import { BlogEditor } from '~/components/BlogEditor';
import { getRedisClient, redisKeys } from '~/utils/redis.server';
import { createAuthClient } from '~/utils/supabase.server';
import type { definitions } from '~/types/supabase';
import { getAuthToken, getUser } from '~/utils/session.server';

type Blog = definitions['Blogs'];
type BlogInfo = Pick<Blog, 'title' | 'blog_slug' | 'content' | 'is_published'>;

type ActionData = { formError?: string; formData?: BlogInfo };

const badRequest = (data: ActionData, status = 400) => json(data, { status });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const title = form.get('title');
  const blog_slug = form.get('blog_slug');
  const is_published = !!form.get('is_published');
  const content = form.get('content');

  if (
    typeof title !== 'string' ||
    typeof blog_slug !== 'string' ||
    typeof content !== 'string'
  ) {
    return badRequest({ formError: 'There was an error with the form' });
  }

  const user = await getUser(request);
  const jwt = await getAuthToken(request);
  const authSupabase = createAuthClient(jwt);

  const { error } = await authSupabase
    .from<Blog>('Blogs')
    .insert(
      { title, blog_slug, is_published, content, user_id: user?.id },
      { returning: 'minimal' },
    );

  if (error) {
    return badRequest({
      formData: { title, blog_slug, is_published, content },
      formError: 'There was an error creating the blog.',
    });
  }

  // Clear the writing list in the cache
  const redis = await getRedisClient();
  await redis.del(redisKeys.WRITING_LIST);

  if (is_published) return redirect(`/writing/${blog_slug}`);
  return redirect('/admin');
};

export default function NewBlog() {
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  return (
    <BlogEditor
      {...actionData?.formData}
      formError={actionData?.formError}
      isIdle={transition.state === 'idle'}
    />
  );
}
