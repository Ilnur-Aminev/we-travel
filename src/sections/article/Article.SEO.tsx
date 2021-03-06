import React from 'react';

import SEO from '../../components/SEO';

import { IArticle, IAuthor, SightType } from '../../types';
import { graphql, useStaticQuery } from 'gatsby';

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            siteUrl
          }
        }
      }
    }
  }
`;

interface ArticleSEOProps {
  article: IArticle;
  author: IAuthor;
  location: Location;
  imagelocation?: string;
}

const ArticleSEO: React.FC<ArticleSEOProps> = ({ article, author: { name, slug, bio }, location, imagelocation }) => {
  const results = useStaticQuery(siteQuery);
  const siteUrl = results.allSite.edges[0].node.siteMetadata.siteUrl;

  // Checks if the source of the image is hosted on Contentful
  if (`${article.hero.seo.src}`.includes('ctfassets')) {
    imagelocation = `https:${article.hero.seo.src}`;
  } else {
    imagelocation = `${siteUrl + article.hero.seo.src}`;
  }

  return (
    <SEO
      authorName={name}
      authorsBio={bio}
      authorsSlug={slug}
      canonicalUrl={article.canonical_url}
      dateforSEO={article.dateForSEO}
      description={article.seoDescription || article.excerpt}
      image={imagelocation}
      isBlogPost={true}
      articlepathName={siteUrl + location.pathname}
      published={article.date}
      timeToRead={article.timeToRead}
      title={article.seoTitle || article.title}
      sightType={article.type as SightType}
    ></SEO>
  );
};

export default ArticleSEO;
