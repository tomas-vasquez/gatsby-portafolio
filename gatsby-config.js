const config = require("./src/config");

// init. environment variables
const dotenv = require("dotenv");
dotenv.config();

console.log("GITHUB_LOGIN", process.env.GITHUB_LOGIN);

module.exports = {
  siteMetadata: {
    title: "Tomas Vasquez",
    description:
      "Tomas Vasquez is a software engineer specializing in building exceptional websites, applications, and everything in between.",
    siteUrl: "https://tomas-vasquez.vercel.app", // No trailing slash allowed!
    image: "/og.png", // Path to your image you placed in the 'static' folder
    twitterUsername: "@_tomas_vasquez_",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "TomasVasquez",
        short_name: "TomasVasquez",
        start_url: "/",
        background_color: config.colors.darkNavy,
        theme_color: config.colors.navy,
        display: "minimal-ui",
        icon: "src/images/logo.png",
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-external-links
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow noopener noreferrer",
            },
          },
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-images
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 700,
              linkImagesToOriginal: true,
              quality: 90,
              tracedSVG: { color: config.colors.green },
            },
          },
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-code-titles/
            resolve: "gatsby-remark-code-titles",
          }, // IMPORTANT: this must be ahead of other plugins that use code blocks
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-prismjs
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: "language-",
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-45666519-2",
      },
    },
    {
      resolve: `gatsby-source-github-api`,
      options: {
        // token: required by the GitHub API
        token: `${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,

        // GraphQLquery: defaults to a search query
        graphQLQuery: (githubApiQuery = `
        query($github_login: String!) {
          user(login: $github_login) {
            repositories(first: 12, orderBy: {field: STARGAZERS, direction: DESC}) {
               nodes {
                id
                name
                description
                url
                updatedAt
                forkCount
                openGraphImageUrl
                stargazers {
                  totalCount
                }
                readme: object(expression: "master:README.md") {
                  ... on Blob {
                    text
                  }
                }
                licenseInfo {
                  id
                }
                primaryLanguage {
                  name
                }
                languages(first: 10) {
                  nodes {
                    name
                  }
                }
               }
              }
            }
        }
        `),

        // variables: defaults to variables needed for a search query
        variables: {
          github_login: `${process.env.GITHUB_LOGIN}`,
        },
      },
    },
  ],
};
