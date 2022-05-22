import { json } from 'remix';
import type { ActionFunction } from 'remix';
import { formatContent } from '~/utils/format-content.server';
import { requireUser } from '~/utils/session.server';

type ActionData = { formError?: string; value?: string };

const badRequest = (data: ActionData, status = 400) => json(data, { status });

export const action: ActionFunction = async ({ request }) => {
  await requireUser(request);

  if (request.method !== 'POST')
    return badRequest({ formError: 'You need to send a POST request.' });

  const form = await request.formData();
  const content = form.get('content');

  if (typeof content !== 'string' || !content)
    return badRequest({ formError: 'No content was provided.' });

  const { value, error } = formatContent(content ?? '');

  if (error) return badRequest({ formError: error });

  return json({ value }, { status: 200 });
};
