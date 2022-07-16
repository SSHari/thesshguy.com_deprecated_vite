import fs from 'fs/promises';

export const searchLocalMDX = async (slug: string) => {
  if (process.env.NODE_ENV !== 'development') return null;

  const files = await fs.readdir(`${__dirname}/../app/routes/.dev/mdx`);
  const mdxFile = files.find((file) => file === `${slug}.mdx`);

  if (!mdxFile) return null;

  return await fs.readFile(`${__dirname}/../app/routes/.dev/mdx/${mdxFile}`);
};
