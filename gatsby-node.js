exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "posts" } }) {
        nodes {
          childMdx {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('failed to create posts', result.errors);
  }

  const posts = result.data.allFile.nodes;

  posts.forEach(post => {
    actions.createPage({
      path: post.childMdx.frontmatter.slug,
      component: require.resolve('./src/templates/post.js'),
      context: {
        slug: post.childMdx.frontmatter.slug,
      },
    });
  });

  const result2 = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "projects" } }) {
        nodes {
          childMdx {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  if (result2.errors) {
    reporter.panic('failed to create projects', result2.errors);
  }

  const projects = result2.data.allFile.nodes;

  projects.forEach(project => {
    actions.createPage({
      path: project.childMdx.frontmatter.slug,
      component: require.resolve('./src/templates/project.js'),
      context: {
        slug: project.childMdx.frontmatter.slug,
      },
    });
  });
};
