import * as React from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import ToolbarHeader from '../../components/ToolbarHeader';
import { CustomCSSProperties } from '../../utils';

type WritingData = {
  id: string;
  name: string;
  slug: string;
  date: string;
};

type DataType = {
  allMdx: {
    nodes: {
      frontmatter: WritingData;
      slug: string;
    }[];
  };
};

function WritingTable({ posts }: { posts: WritingData[] }) {
  return (
    <table className="table-auto text-left flex flex-col">
      <thead className="border-b-2 border-gray-600 mb-4 text-gray-500 uppercase">
        <tr className="flex">
          <th className="flex-1 py-2 pl-3">Post</th>
          <th className="flex-1 py-2 pl-3">Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr
            key={post.id}
            className="flex hover:bg-gray-300 border-solid border-l-4 border-transparent hover:border-primary rounded-md"
          >
            <td className="flex-1 px-2 pt-4 pb-3">
              <Link className="hover:text-gray-700" to={post.slug}>
                {post.name}
              </Link>
            </td>
            <td className="flex-1 px-2 pt-4 pb-3">{post.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Demos(props: PageProps<DataType>) {
  const posts = props.data.allMdx.nodes.map(({ frontmatter, slug }) => ({
    ...frontmatter,
    slug,
  }));

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
      <main className="my-4 p-4">
        <h1 className="text-4xl font-medium mb-4">Writing</h1>
        <p className="text-xl my-4">
          A series of long form writing on various topics.
        </p>
        <WritingTable posts={posts} />
      </main>
    </div>
  );
}

export const query = graphql`
  query {
    allMdx(filter: { fileAbsolutePath: { regex: "/writing/" } }) {
      nodes {
        frontmatter {
          id
          name
          date
        }
        slug
      }
    }
  }
`;
