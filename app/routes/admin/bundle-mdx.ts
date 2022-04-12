import { json } from 'remix';
import type { ActionFunction } from 'remix';
import { bundleMDX } from '~/utils/mdx-handler.server';
import { requireUser } from '~/utils/session.server';

type ActionData = {
  formError?: string;
  mdxErrors?: { description: string; lineText: string }[];
  mdxContent?: string;
};

const badRequest = (data: ActionData, status = 400) => json(data, { status });

export const action: ActionFunction = async ({ request }) => {
  await requireUser(request);

  if (request.method !== 'POST')
    return badRequest({ formError: 'You need to send a POST request.' });

  const form = await request.formData();
  const content = form.get('content');

  if (typeof content !== 'string' || !content)
    return badRequest({ formError: 'No content was provided.' });

  const { code, errors } = await bundleMDX(content ?? '');

  if (errors.length > 0) {
    const mdxErrors = errors.map((error) => {
      const description = error.text;
      const lineText = error.location?.lineText ?? '';
      return { description, lineText };
    });

    return badRequest({ mdxErrors });
  }

  return json({ mdxContent: code }, { status: 200 });
};
