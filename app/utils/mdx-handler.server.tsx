import { bundleMDX as bundleMDXBase } from 'mdx-bundler';
import rehypePostcss from 'rehype-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import tailwind from 'tailwindcss';
import type { Message } from 'esbuild';

const input = String.raw`
@tailwind components;
@tailwind utilities;
`;

export const bundleMDX = async (content: string) => {
  try {
    return await bundleMDXBase({
      source: content.trim(),
      mdxOptions: (options) => {
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          function prependTailwindStyleTag() {
            return (tree: any) => {
              tree.children.unshift({
                type: 'element',
                tagName: 'style',
                children: [{ type: 'text', value: input }],
              });
            };
          },
          [
            rehypePostcss,
            {
              plugins: [
                tailwind({
                  // @ts-ignore
                  content: [{ raw: content.trim(), extension: 'mdx' }],
                  corePlugins: { preflight: false },
                }),
                autoprefixer(),
                cssnano(),
              ],
            },
          ],
        ];

        return options;
      },
    });
  } catch (error: any) {
    return { code: '', frontMatter: {}, errors: error.errors as Message[] };
  }
};
