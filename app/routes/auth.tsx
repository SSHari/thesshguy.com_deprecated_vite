import { redirect } from 'remix';
import type { ActionFunction, LoaderFunction } from 'remix';
import { createUserSession } from '~/utils/session.server';

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const accessToken = form.get('access_token');
  const expiresIn = form.get('expires_in');

  if (typeof accessToken !== 'string' || typeof expiresIn !== 'string') {
    return redirect('/');
  }

  return await createUserSession(accessToken, expiresIn);
};

export const loader: LoaderFunction = () => redirect('/');
