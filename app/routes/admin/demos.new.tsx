import { useActionData, useTransition, redirect, json } from 'remix';
import type { ActionFunction } from 'remix';
import { DemoEditor } from '~/components/DemoEditor';
import { getRedisClient, redisKeys } from '~/utils/redis.server';
import { createAuthClient } from '~/utils/supabase.server';
import type { definitions } from '~/types/supabase';
import { getAuthToken, getUser } from '~/utils/session.server';

type Demo = definitions['Demos'];
type DemoInfo = Pick<
  Demo,
  'title' | 'demo_slug' | 'content' | 'til_link' | 'is_published'
>;
type ActionData = { formError?: string; formData?: DemoInfo };

const badRequest = (data: ActionData, status = 400) => json(data, { status });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const title = form.get('title');
  const demo_slug = form.get('demo_slug');
  const til_link = form.get('til_link');
  const is_published = !!form.get('is_published');
  const content = form.get('content');

  if (
    typeof title !== 'string' ||
    typeof demo_slug !== 'string' ||
    typeof til_link !== 'string' ||
    typeof content !== 'string'
  ) {
    return badRequest({ formError: 'There was an error with the form.' });
  }

  const user = await getUser(request);
  const jwt = await getAuthToken(request);
  const authSupabase = createAuthClient(jwt);

  const { error } = await authSupabase
    .from<Demo>('Demos')
    .insert(
      { title, demo_slug, til_link, is_published, content, user_id: user?.id },
      { returning: 'minimal' },
    );

  if (error) {
    return badRequest({
      formData: { title, demo_slug, til_link, is_published, content },
      formError: 'There was an error creating the demo.',
    });
  }

  // Clear the demo list in the cache
  const redis = await getRedisClient();
  await redis.del(redisKeys.DEMO_LIST);

  if (is_published) return redirect(`/demos/${demo_slug}`);
  return redirect('/admin');
};

export default function NewDemo() {
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  return (
    <DemoEditor
      {...actionData?.formData}
      formError={actionData?.formError}
      isIdle={transition.state === 'idle'}
    />
  );
}
