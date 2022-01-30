import { Link } from 'remix';
import type { LinksFunction } from 'remix';
import toolbarHeaderStyles from '~/styles/components/toolbarHeader.css';

export const toolbarHeaderLinks: LinksFunction = () => [
  { rel: 'stylesheet', href: toolbarHeaderStyles },
];

export const ToolbarHeader = () => {
  return (
    <div id="toolbar-header">
      <Link className="home-link" to="/">
        theSSHGuy
      </Link>
      <Link to="/demos">Demos</Link>
      {/* Add this back in once the DB is configured */}
      {/* <Link to="/writing">Writing</Link> */}
    </div>
  );
};
