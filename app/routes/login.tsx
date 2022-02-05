import { Form, Outlet, json, useActionData } from 'remix';
import type { ActionFunction } from 'remix';
import { z } from 'zod';
import { ToolbarHeader } from '~/components/ToolbarHeader';
import type { CustomCSSProperties } from '~/utils/styles';
import { login } from '~/utils/session.server';

type ActionData = {
  formError?: string;
  fields?: {
    email: string;
  };
  magicLinkSent?: boolean;
};

const emailValidator = z.string().email();

const badRequest = (data: ActionData, status = 400) => json(data, { status });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');

  if (typeof email !== 'string') {
    return badRequest({
      fields: { email: '' },
      formError: 'Please enter a valid email',
    });
  }

  const { success } = await emailValidator.safeParseAsync(email);
  if (!success) {
    return badRequest({
      fields: { email },
      formError: 'Please enter a valid email',
    });
  }

  const { error } = await login(email);
  if (error) {
    return badRequest({ formError: error.message }, error.status);
  }

  return json({ magicLinkSent: true }, 201);
};

export default function LoginRoute() {
  const actionData = useActionData<ActionData>();

  let body: React.ReactNode;
  if (actionData?.magicLinkSent) {
    body = <h1 className="pt-4 text-center font-bold">Magic link sent...</h1>;
  } else {
    body = (
      <Form method="post" className="mt-4 flex flex-col">
        <label className="flex flex-col">
          <span>Email:</span>
          <input
            className="rounded border border-gray-900 py-1 px-2"
            defaultValue={actionData?.fields?.email ?? ''}
            name="email"
            placeholder="test@test.com"
          />
        </label>
        <button
          type="submit"
          className="mt-4 self-end rounded border border-gray-900 bg-primary py-2 px-4 text-white hover:bg-gray-500 focus:bg-gray-500 active:bg-gray-700 disabled:bg-gray-300"
        >
          Log In
        </button>
        {actionData?.formError && (
          <span className="text-center text-secondary">
            {actionData.formError}
          </span>
        )}
      </Form>
    );
  }

  return (
    <div
      style={
        {
          '--min-clamp': '500px',
          '--ideal-clamp': '60%',
          '--max-clamp': '900px',
        } as CustomCSSProperties
      }
      className="clamp-width mx-auto"
    >
      <ToolbarHeader />
      <Outlet />
      {body}
    </div>
  );
}
