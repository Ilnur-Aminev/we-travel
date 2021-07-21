import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled'
import throttle from 'lodash/throttle';

import Layout from '../components/Layout';
import MDXRenderer from '../components/MDX';
import Progress from '../components/Progress';
import Section from '../components/Section';
import Headings from '../components/Headings';

import mediaqueries from '../styles/media';
import { debounce } from '../utils';

import ArticleAside from '../sections/article/Article.Aside';
import ArticleHero from '../sections/article/Article.Hero';
import ArticlesNext from '../sections/article/Article.Next';
import ArticleSEO from '../sections/article/Article.SEO';

import { ArticleTemplate } from '../types';
import { ArticleMap } from '../sections/article/Article.Map';
import ArticleTitleList from '@components/ArticleTitleList/ArticleTitleList';
import { unescapeUnicode } from '../helpers/helpers'
import Paragraph from '@components/Paragraph';

const Article: ArticleTemplate = ({ pageContext, location }) => {
  const contentSectionRef = useRef<HTMLElement>(null);

  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const { article, next } = pageContext;

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


  const anchors = article.body.match(/mdx\("h2", {\s{1,}"id": ".{1,}"\s{1,}}, ".{1,}\)/gm)?.map((item) => {
    console.log(item)
      return{
        title: decodeURI(unescapeUnicode(item.match(/("\\u.+?")/)?.[0].slice(1, -1).replaceAll(/\\/g, '\u005C') as string)),
        url: item.match(/"id": "(.{1,})"/)?.[1]
    }
  })
  
  // TODO найти или сделать компонент для показа времени и цены
  return (
    <Layout>
      <ArticleSEO article={article} author={article.author} location={location} />
      <ArticleHero article={article} author={article.author} />
      <ArticleAside contentHeight={contentHeight}>
        <Progress contentHeight={contentHeight} />
      </ArticleAside>
      <ArticleBody ref={contentSectionRef}>
        {article.visitTime && (
          <Paragraph>
            <div>Когда можно посетить:</div>
            <strong>{article.visitTime}</strong>
          </Paragraph>
        )}
        {article.price && (
          <Paragraph>
            <div>Цена:</div>
            <strong>{article.price}</strong>
          </Paragraph>
        )}
        {article.ageLimit && (
          <Paragraph>
            <div>Возрастное ограничение:</div>
            <strong>{article.ageLimit}</strong>
          </Paragraph>
        )}
        <ArticleAnchorsTitle>Содержание</ArticleAnchorsTitle>
        <ArticleTitleList items={anchors} />
        <MDXRenderer content={article.body} />
      </ArticleBody>
      <ArticleMap
        geoUri={article.geoUri}
        baloon={{ title: article.title, excerpt: article.excerpt, hero: article.hero.narrow }}
        regionGeoUris={pageContext.regionGeoUris}
      />
      {next.length > 0 && (
        <NextArticle narrow>
          <FooterNext>
            <FooterNextTitle>Другие достопримечательности региона {article.author.name}</FooterNextTitle>
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
    padding: 60px 0 20px;
  `}
`;

const NextArticle = styled(Section)`
  display: block;
`;

const ArticleAnchorsTitle = styled(Headings.h2)`
  max-width: 680px;
  margin: 60px auto 18px;
`;

const FooterNext = styled.div`
  opacity: 0.25;
  margin-bottom: 100px;
  font-weight: 400;
  color: ${p => p.theme.colors.primary};
  display: flex;

  ${mediaqueries.tablet`
    margin-bottom: 24px;
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

const FooterNextTitle = styled.span`
  color: ${p => p.theme.colors.secondary};
  font-weight: 700;
`;

const FooterSpacer = styled.div`
  margin-bottom: 65px;
`;

