import type { PrismTheme } from 'prism-react-renderer';

const theme: PrismTheme = {
  plain: {
    color: '#ebdbb2',
    backgroundColor: '#32302f',
  },
  styles: [
    {
      types: ['prolog'],
      style: {
        color: 'rgb(69, 133, 136)',
      },
    },
    {
      types: ['comment', 'punctuation'],
      style: {
        color: 'rgb(146, 131, 116)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['constant', 'variable'],
      style: {
        color: 'rgb(211, 134, 155)',
      },
    },
    {
      types: ['attr-name', 'class-name', 'function'],
      style: {
        color: 'rgb(250, 189, 47)',
      },
    },
    {
      types: ['tag', 'selector', 'operator'],
      style: {
        color: 'rgb(142, 192, 124)',
      },
    },
    {
      types: ['string', 'namespace', 'inserted'],
      style: {
        color: 'rgb(184, 187, 38)',
      },
    },
    {
      types: ['builtin'],
      style: {
        color: 'rgb(104, 157, 106)',
      },
    },
    {
      types: ['keyword'],
      style: {
        color: 'rgb(251, 73, 52)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(214, 93, 14)',
      },
    },
    {
      types: ['changed'],
      style: {
        color: 'rgb(254, 128, 25)',
      },
    },
  ],
};

export default theme;
