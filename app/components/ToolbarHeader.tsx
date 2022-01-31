import { Link } from 'remix';

export const ToolbarHeader = () => {
  return (
    <div className="bg-gray-/90 backdrop-filter backdrop-blur-sm text-gray-100 h-14 px-8 pt-6 flex items-center sticky -top-6 rounded-b-lg z-10">
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
