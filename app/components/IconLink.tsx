import { SVGProps } from 'react';

type IconLinkProps = {
  Component: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  link: string;
};

export function IconLink({ Component, link }: IconLinkProps) {
  return (
    <a className="group flex h-7 w-7 items-center justify-center" href={link}>
      <Component className="h-6 w-6 fill-gray-400 group-hover:h-7 group-hover:w-7 group-hover:fill-gray-900" />
    </a>
  );
}
