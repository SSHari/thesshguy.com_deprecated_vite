import { useLoaderData, Link } from 'remix';
import type { LoaderFunction } from 'remix';
import type { definitions } from '~/types/supabase';
import { supabase } from '~/utils/supabase';

type BlogItem = Pick<
  definitions['Blogs'],
  'blog_id' | 'title' | 'updated_at' | 'blog_slug'
>;
type LoaderData = BlogItem[];

export const loader: LoaderFunction = async () => {
  const { data, error } = await supabase
    .from<LoaderData>('Blogs')
    .select('blog_id, title, updated_at, blog_slug');

  if (error) {
    throw new Response(error.message, { status: 404 });
  }

  return data;
};

function BlogWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="my-4 p-4">
      <h1 className="mb-4 text-4xl font-medium">Writing</h1>
      <p className="my-4 text-xl">
        A series of long form writing on various topics.
      </p>
      {children}
    </main>
  );
}

export default function BlogsIndex() {
  const data = useLoaderData<LoaderData>();

  return (
    <BlogWrapper>
      <table className="flex table-auto flex-col text-left">
        <thead className="mb-4 border-b-2 border-gray-600 uppercase text-gray-500">
          <tr className="flex">
            <th className="flex-1 py-2 pl-3">Post</th>
            <th className="flex-1 py-2 pl-3">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {data.map((blog) => (
            <tr
              key={blog.blog_id}
              className="flex rounded-md border-l-4 border-solid border-transparent hover:border-primary hover:bg-gray-300"
            >
              <td className="flex-1 px-2 pt-4 pb-3">
                <Link className="hover:text-gray-700" to={blog.blog_slug}>
                  {blog.title}
                </Link>
              </td>
              <td className="flex-1 px-2 pt-4 pb-3">
                {blog.updated_at &&
                  new Date(blog.updated_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </BlogWrapper>
  );
}

// TODO: Handle this better
export function CatchBoundary() {
  return (
    <h1 className="mt-8 text-center text-2xl">
      There was an issue loding the list of blogs.
    </h1>
  );
}
