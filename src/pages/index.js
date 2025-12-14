import React, { useMemo, useState } from "react";
import { Link, graphql } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Tag from "../components/tag";
import Category from "../components/category";

const BlogIndex = ({ data, location }) => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;
  const visiblePosts = posts?.filter((post) => {
    if (post.frontmatter?.draft === true) return false;
    if (selectedCategory === "ALL") return true;
    return selectedCategory === post.frontmatter?.category;
  });

  const categories = useMemo(
    () => [...new Set(posts.map((node) => node.frontmatter.category))],
    []
  );

  const handleChangeCategory = (select) => {
    if (!categories.includes(select)) {
      setSelectedCategory("ALL");
      return;
    }
    setSelectedCategory(select);
  };

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>포스팅이 존재하지 않습니다 😢</p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />

      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        handleChangeCategory={handleChangeCategory}
      />

      <ol style={{ listStyle: `none` }}>
        {visiblePosts.map((post) => {
          const title = post.frontmatter.title || post.fields.slug;
          const date = new Date(post.frontmatter.date);
          const formattedDate = `${date.getFullYear()}년 ${
            date.getMonth() + 1
          }월 ${date.getDate()}일`;

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <div style={{ marginBottom: "10px" }}>
                    <Tag category={post.frontmatter.category} />
                  </div>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span className="underline gray" itemProp="headline">
                        {title}
                      </span>
                    </Link>
                  </h2>

                  <small>{formattedDate}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="JOY DEVLOG" />;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          category
          description
          draft
        }
      }
    }
  }
`;
