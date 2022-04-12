import { bundleMDX as bundleMDXBase } from 'mdx-bundler';
import remarkMdxPostCSS from 'remark-mdx-postcss';
import type { PostCssPlugins } from 'remark-mdx-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import tailwind from 'tailwindcss';
import type { Message } from 'esbuild';

const plugins: PostCssPlugins = (_tree, file) => [
  tailwind({
    // @ts-ignore
    content: [{ raw: file.value, extension: `mdx` }],
    corePlugins: { preflight: false },
  }),
  autoprefixer(),
  cssnano(),
];

const input = String.raw`
@tailwind components;
@tailwind utilities;
`;

export const bundleMDX = async (content: string) => {
  try {
    return await bundleMDXBase({
      source: content.trim(),
      mdxOptions: (options) => {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          [remarkMdxPostCSS, { plugins, input }],
        ];

        return options;
      },
    });
  } catch (error: any) {
    return { code: '', frontMatter: {}, errors: error.errors as Message[] };
  }
};
