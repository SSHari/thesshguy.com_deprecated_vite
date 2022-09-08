import { SVGProps } from 'react';

type IconLinkProps = {
  Component: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  link: string;
};

export function IconLink({ Component, link }: IconLinkProps) {
  return (
    <a href={link}>
      <Component className="h-6 w-6 fill-gray-400 hover:scale-125 hover:fill-gray-600" />
    </a>
  );
}
