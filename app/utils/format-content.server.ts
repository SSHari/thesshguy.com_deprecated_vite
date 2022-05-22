import prettier from 'prettier';

type FormattedResponse = { value: string; error: string };

export const formatContent = (content: string): FormattedResponse => {
  try {
    const value = prettier.format(content, { parser: 'mdx' });
    return { value, error: '' };
  } catch (error) {
    return { value: '', error: (error as Error).message ?? '' };
  }
};
