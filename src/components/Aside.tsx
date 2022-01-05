import * as React from 'react';
import { css } from '../utils';

// Sections to show additional information
type AsideProps = {
  label: string;
  className: string;
  [key: string]: any;
};

export const Aside = ({ label, className, children, ...props }: AsideProps) => {
  return (
    <div
      {...props}
      className={css(
        'bg-gray-200 text-gray-800 py-2 px-4 rounded-md flex flex-col',
        className,
      )}
    >
      <span className="font-medium mb-2 italic">{label}</span>
      <span>{children}</span>
    </div>
  );
};

export const TLDR = (props: any) => <Aside {...props} label="TL;DR" />;
export const Note = (props: any) => <Aside {...props} label="Note" />;
