import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import type { MetaFunction, LinksFunction } from 'remix';
import { ToolbarHeader, toolbarHeaderLinks } from '~/components/ToolbarHeader';
import globalStyles from '~/styles/routes/global.css';

export const meta: MetaFunction = () => ({ title: 'TheSSHGuy' });

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStyles },
  ...toolbarHeaderLinks(),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="___theSSHGuy">
          <ToolbarHeader />
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
