import { CSSProperties } from 'react';

export type CustomCSSProperties = CSSProperties & Record<`--${string}`, any>;

export const css = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ');
