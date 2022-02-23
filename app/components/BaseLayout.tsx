import type { CustomCSSProperties } from '~/utils/styles';

type BaseLayoutProps = { children: React.ReactNode };
export const BaseLayout = ({ children }: BaseLayoutProps) => {
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
      {children}
    </div>
  );
};
