import * as React from 'react';
import { Link } from 'gatsby';
import ToolbarHeader from '../../components/ToolbarHeader';
import { githubUrl } from '../../constants';
import { CustomCSSProperties } from '../../utils';

const demos = [
  {
    id: 'clamp',
    name: 'CSS Clamp',
    link: '/demos/clamp',
    tilLink: '/css/clamp.md',
  },
];

function DemosTable() {
  return (
    <table className="table-auto text-left flex flex-col">
      <thead className="border-b-2 border-gray-600 mb-4 text-gray-500 uppercase">
        <tr className="flex">
          <th className="flex-1 py-2 pl-3">Name</th>
          <th className="flex-1 py-2 pl-3">TIL</th>
        </tr>
      </thead>
      <tbody>
        {demos.map((demo) => (
          <tr
            key={demo.id}
            className="flex hover:bg-gray-300 border-solid border-l-4 border-transparent hover:border-primary rounded-md"
          >
            <td className="flex-1 px-2 pt-4 pb-3">
              <Link className="hover:text-gray-700" to={demo.link}>
                {demo.name}
              </Link>
            </td>
            <td className="flex-1 px-2 pt-4 pb-3">
              <a
                className="hover:text-gray-700"
                href={`${githubUrl}/til/blob/master${demo.tilLink}`}
              >
                Learn more about {demo.name}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Demos() {
  return (
    <>
      <ToolbarHeader />
      <main
        style={
          {
            '--min-clamp': '500px',
            '--ideal-clamp': '60%',
            '--max-clamp': '800px',
          } as CustomCSSProperties
        }
        className="clamp-width mx-auto my-8 p-4"
      >
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
        <DemosTable />
      </main>
    </>
  );
}
