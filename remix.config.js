/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  devServerPort: 8002,
  ignoredRouteFiles: ['.*', '.*/**'],
  serverDependenciesToBundle: [
    'rehype-postcss',
    'unist-util-visit-parents',
    'unist-util-is',
  ],
  routes: async (defineRoutes) => {
    return defineRoutes((route) => {
      /*
       * Dev only routes for WIP posts (i.e. blogs and demos)
       */
      if (process.env.NODE_ENV === 'development') {
        route('/dev-mdx/:slug', 'routes/.dev/mdx.tsx');
      }
    });
  },
};
