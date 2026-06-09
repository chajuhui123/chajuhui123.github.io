import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Tag from "../components/tag";

const DraftPostingPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <div className="draft-posting-header">
        <h1 className="draft-posting-title">Archived Posts</h1>
        <p className="draft-posting-description">
          2023년 이전에 작성된 포스팅들입니다. 추억으로 간직하기 위해
          남겨두었어요. 🌱
        </p>
      </div>

      {posts.length === 0 ? (
        <p>포스팅이 존재하지 않습니다 😢</p>
      ) : (
        <ol style={{ listStyle: `none` }}>
          {posts.map((post) => {
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
      )}
    </Layout>
  );
};

export default DraftPostingPage;

export const Head = () => <Seo title="Archived Posts | JOY DEVLOG" />;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { archived: { eq: true } } }
    ) {
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
          archived
        }
      }
    }
  }
`;
