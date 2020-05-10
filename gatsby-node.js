exports.createPages = async ({ actions, graphql, reporter }) => {
  const resultPost = await graphql(`
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

  if (resultPost.errors) {
    reporter.panic('failed to create posts', resultPost.errors);
  }

  const posts = resultPost.data.allFile.nodes;

  posts.forEach(post => {
    actions.createPage({
      path: post.childMdx.frontmatter.slug,
      component: require.resolve('./src/templates/post.js'),
      context: {
        slug: post.childMdx.frontmatter.slug,
      },
    });
  });

  const resultProject = await graphql(`
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

  if (resultProject.errors) {
    reporter.panic('failed to create projects', resultProject.errors);
  }

  const projects = resultProject.data.allFile.nodes;

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
