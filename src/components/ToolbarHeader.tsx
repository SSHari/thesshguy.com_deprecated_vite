import * as React from 'react';
import { Link } from 'gatsby';
import { css } from '../utils';

export default function ToolbarHeader({ className }: { className?: string }) {
  return (
    <div
      className={css(
        'bg-gray-/80 backdrop-filter backdrop-blur-sm text-gray-100 h-14 px-8 pt-6 flex items-center sticky -top-6',
        className,
      )}
    >
      <Link className="mr-auto" to="/">
        theSSHGuy
      </Link>
      <Link to="/demos">Demos</Link>
    </div>
  );
}
