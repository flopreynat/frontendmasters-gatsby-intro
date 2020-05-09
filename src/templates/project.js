import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { css } from '@emotion/core';
import Layout from '../components/layout';
import ReadLink from '../components/read-link';

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
      }
      body
    }
  }
`;

const ProjectTemplate = ({ data: { mdx: project } }) => (
  <Layout>
    <h1>{project.frontmatter.title}</h1>
    <p
      css={css`
        font-size: 0.75rem;
      `}
    >
      Posted by {project.frontmatter.author}
    </p>
    <MDXRenderer>{project.body}</MDXRenderer>
    <ReadLink to="/">&larr; back to all projects</ReadLink>
  </Layout>
);

export default ProjectTemplate;
