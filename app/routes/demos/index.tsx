import { useLoaderData, Link } from 'remix';
import type { LoaderFunction } from 'remix';
import type { definitions } from '~/types/supabase';
import { githubUrl } from '~/utils/constants';
import { supabase } from '~/utils/supabase';

type DemoItem = Pick<
  definitions['Demos'],
  'id' | 'title' | 'updated_at' | 'content_slug' | 'til_link'
>;
type LoaderData = DemoItem[];

export const loader: LoaderFunction = async () => {
  const { data, error } = await supabase
    .from<LoaderData>('Demos')
    .select('id, title, updated_at, content_slug, til_link');

  if (error) {
    throw new Response(error.message, { status: 404 });
  }

  return data;
};

function DemoWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="my-4 p-4">
      <h1 className="text-4xl font-medium mb-4">Today I Learned</h1>
      <p className="text-xl my-4">
        A series of demos related to things that I'm learning.
      </p>
      <p className="mt-4 mb-8">
        Check out a more complete list of my{' '}
        <a className="text-secondary font-bold" href={`${githubUrl}/til`}>
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
      <table className="table-auto text-left flex flex-col">
        <thead className="border-b-2 border-gray-600 mb-4 text-gray-500 uppercase">
          <tr className="flex">
            <th className="flex-1 py-2 pl-3">Name</th>
            <th className="flex-1 py-2 pl-3">TIL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((demo) => (
            <tr
              key={demo.id}
              className="flex hover:bg-gray-300 border-solid border-l-4 border-transparent hover:border-primary rounded-md"
            >
              <td className="flex-1 px-2 pt-4 pb-3">
                <Link className="hover:text-gray-700" to={demo.content_slug}>
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
    <h1 className="mt-8 text-2xl text-center">
      There was an issue loding the list of demos.
    </h1>
  );
}
