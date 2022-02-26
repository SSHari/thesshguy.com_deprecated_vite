import { useLoaderData, Link } from 'remix';
import type { LoaderFunction } from 'remix';
import { createAuthClient } from '~/utils/supabase';
import type { definitions } from '~/types/supabase';
import { getAuthToken } from '~/utils/session.server';

type Demo = definitions['Demos'];
type DemoInfo = Pick<Demo, 'demo_id' | 'title' | 'demo_slug'>;

type Blog = definitions['Blogs'];
type BlogInfo = Pick<Blog, 'blog_id' | 'title' | 'blog_slug'>;

type Info = { id: string; title: string; slug: string };

type LoaderData = {
  demos: Info[];
  demoCount: number;
  blogs: Info[];
  blogCount: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  const jwt = await getAuthToken(request);
  const authSupabase = createAuthClient(jwt);

  const [
    { data: demos, count: demoCount, error: demoError },
    { data: blogs, count: blogCount, error: blogError },
  ] = await Promise.all([
    authSupabase
      .from<DemoInfo>('Demos')
      .select('demo_id, title, demo_slug', { count: 'exact' }),
    authSupabase
      .from<BlogInfo>('Blogs')
      .select('blog_id, title, blog_slug', { count: 'exact' }),
  ]);

  if (demoError) throw new Response(demoError.message, { status: 404 });
  if (blogError) throw new Response(blogError.message, { status: 404 });

  return {
    demos: demos?.map(({ demo_id, title, demo_slug }) => ({
      id: demo_id,
      slug: demo_slug,
      title,
    })),
    demoCount,
    blogs: blogs?.map(({ blog_id, title, blog_slug }) => ({
      id: blog_id,
      slug: blog_slug,
      title,
    })),
    blogCount,
  };
};

type InfoProps = {
  title: string;
  count: number;
  type: 'demos' | 'writing';
  items: Info[];
};

function Info(props: InfoProps) {
  return (
    <div className="flex flex-1 flex-col rounded border border-gray-900 p-4">
      <h2 className="text-center text-xl font-bold">{props.title} List</h2>
      <span className="text-center">Total Items: {props.count}</span>
      <ul className="h-48 overflow-y-auto border border-gray-900 p-4">
        {props.items.map((item) => {
          return (
            <li key={item.id} className="flex border-b border-gray-200">
              <Link
                className="flex-1 rounded py-1 px-2 hover:bg-gray-200 hover:text-gray-800"
                to={`${props.type}/${item.slug}`}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link className="btn-primary self-center" to={`${props.type}/new`}>
        New {props.title}
      </Link>
    </div>
  );
}

export default function AdminIndex() {
  const data = useLoaderData<LoaderData>();

  return (
    <main className="mt-4 flex flex-col gap-8 xl:flex-row">
      <Info
        title="Demo"
        count={data.demoCount}
        type="demos"
        items={data.demos}
      />
      <Info
        title="Writing"
        count={data.blogCount}
        type="writing"
        items={data.blogs}
      />
    </main>
  );
}
