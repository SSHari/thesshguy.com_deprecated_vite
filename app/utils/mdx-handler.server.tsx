import { bundleMDX as bundleMDXBase } from 'mdx-bundler';

export const bundleMDX = async (content: string) => {
  const { code } = await bundleMDXBase({ source: content.trim() });
  return code;
};
