import {
  useActionData,
  useLoaderData,
  useTransition,
  redirect,
  json,
} from 'remix';
import type { ActionFunction, LoaderFunction } from 'remix';
import { DemoEditor } from '~/components/DemoEditor';
import { createAuthClient } from '~/utils/supabase.server';
import type { definitions } from '~/types/supabase';
import { getAuthToken } from '~/utils/session.server';

type Demo = definitions['Demos'];
type DemoInfo = Pick<
  Demo,
  'demo_id' | 'title' | 'demo_slug' | 'content' | 'til_link' | 'is_published'
>;
type LoaderData = { demo: DemoInfo };

export const loader: LoaderFunction = async ({ params, request }) => {
  if (!params.demo_slug) return redirect('/admin');

  const jwt = await getAuthToken(request);
  const authSupabase = createAuthClient(jwt);

  const { data: demo, error } = await authSupabase
    .from<Demo>('Demos')
    .select('demo_id, title, demo_slug, content, til_link, is_published')
    .eq('demo_slug', params.demo_slug)
    .single();

  if (error) {
    throw new Response(error.message, { status: 404 });
  }

  return { demo };
};

type ActionData = { formError?: string; formData?: DemoInfo };

const badRequest = (data: ActionData, status = 400) => json(data, { status });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const demo_id = form.get('demo_id');
  const title = form.get('title');
  const demo_slug = form.get('demo_slug');
  const til_link = form.get('til_link');
  const is_published = !!form.get('is_published');
  const content = form.get('content');

  if (
    typeof demo_id !== 'string' ||
    typeof title !== 'string' ||
    typeof demo_slug !== 'string' ||
    typeof til_link !== 'string' ||
    typeof content !== 'string'
  ) {
    return badRequest({ formError: 'There was an error with the form' });
  }

  const jwt = await getAuthToken(request);
  const authSupabase = createAuthClient(jwt);

  const { error } = await authSupabase
    .from<Demo>('Demos')
    .update(
      { title, demo_slug, til_link, is_published, content },
      { returning: 'minimal' },
    )
    .eq('demo_id', demo_id);

  if (!error && is_published) return redirect(`/demos/${demo_slug}`);
  else if (!error) return redirect('/admin');

  return badRequest({
    formData: {
      demo_id: Number(demo_id),
      title,
      demo_slug,
      til_link,
      is_published,
      content,
    },
    formError: 'There was an error updating the demo.',
  });
};

export default function EditDemo() {
  const loaderData = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const transition = useTransition();
  const formData = { ...loaderData.demo, ...actionData?.formData };

  return (
    <DemoEditor
      {...formData}
      formError={actionData?.formError}
      isIdle={transition.state === 'idle'}
    />
  );
}
