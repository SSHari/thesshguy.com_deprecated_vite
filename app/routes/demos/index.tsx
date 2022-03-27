import { useLoaderData, Link } from 'remix';
import type { LoaderFunction } from 'remix';
import type { definitions } from '~/types/supabase';
import { githubUrl } from '~/utils/constants';
import { supabase } from '~/utils/supabase.server';

type DemoItem = Pick<
  definitions['Demos'],
  'demo_id' | 'title' | 'updated_at' | 'demo_slug' | 'til_link'
>;
type LoaderData = DemoItem[];

export const loader: LoaderFunction = async () => {
  const { data, error } = await supabase
    .from<LoaderData>('Demos')
    .select('demo_id, title, updated_at, demo_slug, til_link');

  if (error) {
    throw new Response(error.message, { status: 404 });
  }

  return data;
};

function DemoWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="my-4 p-4">
      <h1 className="mb-4 text-4xl font-medium">Today I Learned</h1>
      <p className="my-4 text-xl">
        A series of demos related to things that I'm learning.
      </p>
      <p className="mt-4 mb-8">
        Check out a more complete list of my{' '}
        <a className="font-bold text-secondary" href={`${githubUrl}/til`}>
          TILs
        </a>
        .
      </p>
      {children}
    </main>
  );
}

export default function DemosIndex() {
  const data = useLoaderData<LoaderData>();

  return (
    <DemoWrapper>
      <table className="flex table-auto flex-col text-left">
        <thead className="mb-4 border-b-2 border-gray-600 uppercase text-gray-500">
          <tr className="flex">
            <th className="flex-1 py-2 pl-3">Name</th>
            <th className="flex-1 py-2 pl-3">TIL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((demo) => (
            <tr
              key={demo.demo_id}
              className="flex rounded-md border-l-4 border-solid border-transparent hover:border-primary hover:bg-gray-300"
            >
              <td className="flex-1 px-2 pt-4 pb-3">
                <Link className="hover:text-gray-700" to={demo.demo_slug}>
                  {demo.title}
                </Link>
              </td>
              <td className="flex-1 px-2 pt-4 pb-3">
                {demo.til_link && (
                  <a
                    className="hover:text-gray-700"
                    href={`${githubUrl}/til/blob/master${demo.til_link}`}
                  >
                    Learn more about {demo.title}
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DemoWrapper>
  );
}

// TODO: Handle this better
export function CatchBoundary() {
  return (
    <h1 className="mt-8 text-center text-2xl">
      There was an issue loading the list of demos.
    </h1>
  );
}
