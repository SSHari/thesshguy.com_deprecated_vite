import { Outlet } from 'remix';
import type { LoaderFunction } from 'remix';
import { BaseLayout } from '~/components/BaseLayout';
import { ToolbarHeader } from '~/components/ToolbarHeader';
import { requireUser } from '~/utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  return { user };
};

export default function AdminRoute() {
  return (
    <BaseLayout>
      <ToolbarHeader />
      <Outlet />
    </BaseLayout>
  );
}
