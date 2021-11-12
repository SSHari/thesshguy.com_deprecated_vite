import type { PrismTheme } from 'prism-react-renderer';

const theme: PrismTheme = {
  plain: {
    color: '#343b59',
    backgroundColor: '#d5d6db',
  },
  styles: [
    {
      types: ['comment'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['keyword', 'operator'],
      style: {
        color: 'rgb(76, 80, 94)',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: 'rgb(150, 153, 163)',
      },
    },
    {
      types: ['builtin', 'number'],
      style: {
        color: 'rgb(150, 80, 39)',
      },
    },
    {
      types: ['string', 'symbol', 'constant', 'attr-name'],
      style: {
        color: 'rgb(72, 94, 48)',
      },
    },
    {
      types: ['function'],
      style: {
        color: 'rgb(22, 103, 117)',
      },
    },
    {
      types: ['tag'],
      style: {
        color: 'rgb(140, 67, 81)',
      },
    },
    {
      types: ['variable'],
      style: {
        color: 'rgb(143, 94, 21)',
      },
    },
    {
      types: ['char'],
      style: {
        color: 'rgb(90, 74, 120)',
      },
    },
    {
      types: ['property'],
      style: {
        color: 'rgb(72, 76, 97)',
      },
    },
    {
      types: ['inserted'],
      style: {
        color: 'rgb(68, 157, 171)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(145, 76, 84)',
      },
    },
    {
      types: ['changed'],
      style: {
        color: 'rgb(52, 84, 138)',
      },
    },
  ],
};

export default theme;
