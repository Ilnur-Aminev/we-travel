module.exports = {
  siteMetadata: {
    title: `Лучшие достопримечательности | we-travel.today`,
    name: `We-Travel.today`,
    siteUrl: `https://we-travel.today`,
    description: `Лучшие доcтопримечательности`,
    hero: {
      heading: `Лучшие доcтопримечательности`,
      maxWidth: 652
    },
    yandexVerification: 'c232d00659548112'
  },
  pathPrefix: '',
  mapping: {
    'Mdx.frontmatter.author': `AuthorsYaml`
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-cname`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-yandex-metrika`,
      options: {
        trackingId: 67606948,
        webvisor: true,
        trackHash: true,
        afterBody: true,
        defer: false,
        useCDN: true
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.we-travel.today',
        resolveEnv: () => process.env.ROBOTS_ENV,
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }]
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'we-travel',
        short_name: 'we-travel',
        start_url: '/',
        icon: 'src/assets/favicon.png',
        crossOrigin: `use-credentials`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'content/posts',
        name: 'content/posts'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'content/authors',
        name: 'content/authors'
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 10000,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true,
              showCaptions: ['title']
            }
          },
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              providers: {
                include: ['Instagram']
              }
            }
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 680,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: videoId => `https://www.youtube-nocookie.com/embed/${videoId}`
                }
              ] //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
            }
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-numbered-footnotes` },
          { resolve: `gatsby-remark-smartypants` },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noreferrer' // eslint-disable-line unicorn/prevent-abbreviations
            }
          }
        ],
        remarkPlugins: [require(`remark-slug`)] // eslint-disable-line global-require
      }
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        displayName: process.env.NODE_ENV === `development`
      }
    }
  ]
};
