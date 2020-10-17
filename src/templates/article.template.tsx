import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import throttle from 'lodash/throttle';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/Layout';
import MDXRenderer from '../components/MDX';
import Progress from '../components/Progress';
import Section from '../components/Section';

import mediaqueries from '../styles/media';
import { debounce } from '../utils';

import ArticleAside from '../sections/article/Article.Aside';
import ArticleHero from '../sections/article/Article.Hero';
import ArticleControls from '../sections/article/Article.Controls';
import ArticlesNext from '../sections/article/Article.Next';
import ArticleSEO from '../sections/article/Article.SEO';

import { ArticleTemplate } from '../types';

const Article: ArticleTemplate = ({ pageContext, location }) => {
  const contentSectionRef = useRef<HTMLElement>(null);

  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const { article, authors, next } = pageContext;

  useEffect(() => {
    const calculateBodySize = throttle(() => {
      const contentSection = contentSectionRef.current;

      if (!contentSection) return;

      /**
       * If we haven't checked the content's height before,
       * we want to add listeners to the content area's
       * imagery to recheck when it's loaded
       */
      if (!hasCalculated) {
        const debouncedCalculation = debounce(calculateBodySize);
        const $imgs = contentSection.querySelectorAll('img');

        $imgs.forEach($img => {
          // If the image hasn't finished loading then add a listener
          if (!$img.complete) $img.onload = debouncedCalculation;
        });

        // Prevent rerun of the listener attachment
        setHasCalculated(true);
      }

      // Set the height and offset of the content area
      setContentHeight(contentSection.getBoundingClientRect().height);
    }, 20);

    calculateBodySize();
    window.addEventListener('resize', calculateBodySize);

    return () => window.removeEventListener('resize', calculateBodySize);
  }, []);

  const authorName = authors[0]?.name ? authors[0].name + 'а' : '';

  return (
    <Layout>
      <ArticleSEO article={article} authors={authors} location={location} />
      <ArticleHero article={article} authors={authors} />
      <ArticleAside contentHeight={contentHeight}>
        <Progress contentHeight={contentHeight} />
      </ArticleAside>
      <MobileControls>
        <ArticleControls />
      </MobileControls>
      <ArticleBody ref={contentSectionRef}>
        <MDXRenderer content={article.body} />
      </ArticleBody>
      {next.length > 0 && (
        <NextArticle narrow>
          <FooterNext>
            <span>Другие достопримечательности {authorName}</span>
          </FooterNext>
          <ArticlesNext articles={next} />
          <FooterSpacer />
        </NextArticle>
      )}
    </Layout>
  );
};

export default Article;

const MobileControls = styled.div`
  position: relative;
  padding-top: 60px;
  transition: background 0.2s linear;
  text-align: center;

  ${mediaqueries.tablet_up`
    display: none;
  `}
`;

const ArticleBody = styled.article`
  position: relative;
  padding: 160px 0 35px;
  padding-left: 68px;
  transition: background 0.2s linear;

  ${mediaqueries.desktop`
    padding-left: 53px;
  `}
  
  ${mediaqueries.tablet`
    padding: 70px 0 80px;
  `}

  ${mediaqueries.phablet`
    padding: 60px 0;
  `}
`;

const NextArticle = styled(Section)`
  display: block;
`;

const FooterNext = styled.div`
  opacity: 0.25;
  margin-bottom: 100px;
  font-weight: 400;
  color: ${p => p.theme.colors.primary};
  display: flex;

  & > span {
    flex-shrink: 0;
  }

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  &::after {
    content: '';
    background: ${p => p.theme.colors.grey};
    flex: 1;
    margin-top: 11px;
    height: 1px;
    display: block;
    margin-left: 20px;
  }
`;

const FooterSpacer = styled.div`
  margin-bottom: 65px;
`;
