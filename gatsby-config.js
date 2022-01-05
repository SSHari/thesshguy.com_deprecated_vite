/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'demos',
        path: `${__dirname}/src/pages/demos`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'writing',
        path: `${__dirname}/src/pages/writing`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: ['gatsby-remark-mermaid'],
        defaultLayouts: {
          demos: require.resolve('./src/components/DemosLayout.tsx'),
          writing: require.resolve('./src/components/DemosLayout.tsx'),
        },
      },
    },
  ],
};
