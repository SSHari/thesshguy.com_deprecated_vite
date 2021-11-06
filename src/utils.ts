export const css = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ');
