import { bundleMDX as bundleMDXBase } from 'mdx-bundler';

export const bundleMDX = async (content: string) => {
  return await bundleMDXBase({ source: content.trim() });
};
