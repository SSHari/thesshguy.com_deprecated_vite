import { json } from 'remix';
import type { ActionFunction } from 'remix';
import { bundleMDX } from '~/utils/mdx-handler.server';
import { requireUser } from '~/utils/session.server';

type ActionData = { mdxError?: string; mdxContent?: string };

const badRequest = (data: ActionData, status = 400) => json(data, { status });

export const action: ActionFunction = async ({ request }) => {
  await requireUser(request);

  if (request.method !== 'POST')
    return badRequest({ mdxError: 'You need to send a POST request.' });

  const form = await request.formData();
  const content = form.get('content');

  if (typeof content !== 'string' || !content)
    return badRequest({ mdxError: 'No content was provided.' });

  const { code, errors } = await bundleMDX(content ?? '');

  if (errors.length > 0) {
    // TODO: Show all errors
    return badRequest({ mdxError: errors[0].text });
  }

  return json({ mdxContent: code }, { status: 200 });
};
