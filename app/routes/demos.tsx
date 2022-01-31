import { Outlet } from 'remix';
import { ToolbarHeader } from '~/components/ToolbarHeader';
import type { CustomCSSProperties } from '~/utils/styles';

export default function DemosRoute() {
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
      <Outlet />
    </div>
  );
}
