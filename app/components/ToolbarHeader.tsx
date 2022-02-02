import { Link } from 'remix';

export const ToolbarHeader = () => {
  return (
    <div className="sticky -top-6 z-10 flex h-14 items-center rounded-b-lg bg-gray-/90 px-8 pt-6 text-gray-100 backdrop-blur-sm backdrop-filter">
      <Link className="mr-auto" to="/">
        theSSHGuy
      </Link>
      <Link className="ml-4" to="/demos">
        Demos
      </Link>
      {/* Add this back in once the DB is configured */}
      {/* <Link className="ml-4" to="/writing">Writing</Link> */}
    </div>
  );
};
