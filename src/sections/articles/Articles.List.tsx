import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

import Headings from '../../components/Headings';
import Image, { ImagePlaceholder } from '../../components/Image';

import mediaqueries from '../../styles/media';
import { IArticle } from '../../types';

import { GridLayoutContext } from './Articles.List.Context';
import { AdditionalInfo, SightName } from '../../components/Common/Common';
import { SectionHeader } from './Articles.Hero';
import Icons from '@icons';

/**
 * Tiles
 * [LONG], [SHORT]
 * [SHORT], [LONG]
 * [SHORT], [LONG]
 *
 * or ------------
 *
 * Rows
 * [LONG]
 * [LONG]
 * [LONG]
 */

interface ArticlesListProps {
  articles: IArticle[];
  showAuthorInfo?: boolean;
  alwaysShowAllDetails?: boolean;
  header?: string;
}

interface ArticlesListItemProps {
  article: IArticle;
  showAuthorInfo?: boolean;
  narrow?: boolean;
}

export const ArticlesList: React.FC<ArticlesListProps> = ({
  articles,
  alwaysShowAllDetails,
  showAuthorInfo,
  header
}) => {
  if (!articles) return null;

  const hasOnlyOneArticle = articles.length === 1;
  const { gridLayout = 'tiles', hasSetGridLayout, getGridLayout, setGridLayout } = useContext(GridLayoutContext);

  /**
   * We're taking the flat array of articles [{}, {}, {}...]
   * and turning it into an array of pairs of articles [[{}, {}], [{}, {}], [{}, {}]...]
   * This makes it simpler to create the grid we want
   */
  const articlePairs = articles.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []);

  useEffect(() => getGridLayout(), []);

  const tilesIsActive = hasSetGridLayout && gridLayout === 'tiles';

  return (
    <>
      {header && (
        <HeroGridContainer>
          <SectionHeader>{header}</SectionHeader>
          <GridControlsContainer>
            <GridButton
              onClick={() => setGridLayout('tiles')}
              active={tilesIsActive}
              data-a11y="false"
              title="Show articles in Tile grid"
              aria-label="Show articles in Tile grid"
            >
              <Icons.Tiles />
            </GridButton>
            <GridButton
              onClick={() => setGridLayout('rows')}
              active={!tilesIsActive}
              data-a11y="false"
              title="Show articles in Row grid"
              aria-label="Show articles in Row grid"
            >
              <Icons.Rows />
            </GridButton>
          </GridControlsContainer>
        </HeroGridContainer>
      )}
      <ArticlesListContainer style={{ opacity: hasSetGridLayout ? 1 : 0 }} alwaysShowAllDetails={alwaysShowAllDetails}>
        {articlePairs.map((ap, index) => {
          const isEven = index % 2 !== 0;
          const isOdd = index % 2 !== 1;

          return (
            <List key={index} gridLayout={gridLayout} hasOnlyOneArticle={hasOnlyOneArticle} reverse={isEven}>
              <ListItem article={ap[0]} narrow={isEven} showAuthorInfo={showAuthorInfo} />
              <ListItem article={ap[1]} narrow={isOdd} showAuthorInfo={showAuthorInfo} />
            </List>
          );
        })}
      </ArticlesListContainer>
    </>
  );
};

const ListItem: React.FC<ArticlesListItemProps> = ({ article, narrow, showAuthorInfo }) => {
  if (!article) return null;

  const { gridLayout } = useContext(GridLayoutContext);
  const hasOverflow = narrow && article.title.length > 35;
  const imageSource = narrow ? article.hero.narrow : article.hero.regular;
  const hasHeroImage = imageSource && Object.keys(imageSource).length !== 0 && imageSource.constructor === Object;
  const { name, color, country } = article.author;
  return (
    <ArticleLink to={article.slug} data-a11y="false">
      <Item gridLayout={gridLayout}>
        <ImageContainer narrow={narrow} gridLayout={gridLayout}>
          {hasHeroImage ? <Image src={imageSource} /> : <ImagePlaceholder />}
        </ImageContainer>
        <CardContent>
          <Title dark hasOverflow={hasOverflow} gridLayout={gridLayout}>
            {article.title}
          </Title>
          <Excerpt narrow={narrow} hasOverflow={hasOverflow} gridLayout={gridLayout} title={article.excerpt}>
            {article.excerpt}
          </Excerpt>
          <MetaData>
            {showAuthorInfo && (
              <>
                <SightName color={color}>{name}</SightName>
                <AdditionalInfo>{country}</AdditionalInfo>
              </>
            )}
            <AdditionalInfo>{article.type}</AdditionalInfo>
          </MetaData>
        </CardContent>
      </Item>
    </ArticleLink>
  );
};

const wide = '1fr';
const narrow = '457px';

export const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;

  ${mediaqueries.phablet`
    -webkit-line-clamp: 3;
  `}
`;

const showDetails = css`
  p {
    display: -webkit-box;
  }

  h2 {
    margin-bottom: 10px;
  }
`;

const ArticlesListContainer = styled.div<{ alwaysShowAllDetails?: boolean }>`
  transition: opacity 0.25s;
  ${p => p.alwaysShowAllDetails && showDetails}
`;

const listTile = p => css`
  position: relative;
  display: grid;
  grid-template-columns: ${p.reverse ? `${narrow} ${wide}` : `${wide} ${narrow}`};
  grid-template-rows: 2;
  column-gap: 30px;

  &:not(:last-child) {
    margin-bottom: 55px;
  }

  ${mediaqueries.desktop_medium`
    grid-template-columns: 1fr 1fr;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    
    &:not(:last-child) {
      margin-bottom: 0;
    }
  `}
`;

const listItemRow = p => css`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 488px;
  grid-column-gap: 96px;
  grid-template-rows: 1;
  align-items: center;
  position: relative;
  margin-bottom: 50px;

  ${mediaqueries.desktop`
    grid-column-gap: 24px;
    grid-template-columns: 1fr 380px;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `}

  @media (max-width: 540px) {
    background: ${p.theme.colors.card};
  }

  ${mediaqueries.phablet`
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  `}
`;

const listItemTile = p => css`
  position: relative;

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  @media (max-width: 540px) {
    background: ${p.theme.colors.card};
  }

  ${mediaqueries.phablet`
    margin-bottom: 40px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  `}
`;

// If only 1 article, dont create 2 rows.
const listRow = p => css`
  display: grid;
  grid-template-rows: ${p.hasOnlyOneArticle ? '1fr' : '1fr 1fr'};
`;

const List = styled.div<{
  reverse: boolean;
  gridLayout: string;
  hasOnlyOneArticle: boolean;
}>`
  ${p => (p.gridLayout === 'tiles' ? listTile : listRow)}
`;

const Item = styled.div<{ gridLayout: string }>`
  ${p => (p.gridLayout === 'rows' ? listItemRow : listItemTile)}
`;

const ImageContainer = styled.div<{ narrow: boolean; gridLayout: string }>`
  position: relative;
  height: ${p => (p.gridLayout === 'tiles' ? '280px' : '220px')};
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, ${p => (p.narrow ? 0.22 : 0.3)}),
    0 18px 36px -18px rgba(0, 0, 0, ${p => (p.narrow ? 0.25 : 0.33)});
  margin-bottom: ${p => (p.gridLayout === 'tiles' ? '30px' : 0)};
  transition: transform 0.3s var(--ease-out-quad), box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
  }

  ${mediaqueries.tablet`
    height: 200px;
    margin-bottom: 35px;
  `}

  ${mediaqueries.phablet`
    overflow: hidden;
    margin-bottom: 0;
    box-shadow: none;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  `}
`;

export const Title = styled(Headings.h3)`
  font-size: 21px;
  font-family: ${p => p.theme.fonts.serif};
  margin-bottom: 10px;
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};

  ${mediaqueries.desktop`
    margin-bottom: 15px;
  `}

  ${mediaqueries.tablet`
    font-size: 24px;  
  `}

  ${mediaqueries.phablet`
    font-size: 22px;  
    padding: 0;
    margin-bottom: 8px;
    -webkit-line-clamp: 3;
  `}
`;

const Excerpt = styled.p<{
  hasOverflow: boolean;
  narrow: boolean;
  gridLayout: string;
}>`
  ${limitToTwoLines};
  font-size: 16px;
  margin-bottom: 10px;
  color: ${p => p.theme.colors.grey};
  display: box;
  -webkit-line-clamp: ${p => (p.hasOverflow && p.gridLayout === 'tiles' ? '1' : '2')};
  max-width: ${p => (p.narrow ? '415px' : '515px')};

  ${mediaqueries.desktop`
    display: -webkit-box;
  `}

  ${mediaqueries.phablet`
    max-width: 100%;
    margin-bottom: 16px;
    padding: 0;
    -webkit-line-clamp: 3;
  `}
`;

const MetaData = styled.div`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  font-weight: 600;
  font-size: 16px;
  color: #000;

  ${mediaqueries.phablet`
    max-width: 100%;
    padding: 0;
  `}
`;

const ArticleLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  z-index: 1;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover ${ImageContainer}, &:focus ${ImageContainer} {
    transform: translateY(-1px);
    box-shadow: 0 50px 80px -20px rgba(0, 0, 0, 0.27), 0 30px 50px -30px rgba(0, 0, 0, 0.3);
  }

  &:hover h3,
  &:focus h3 {
    color: ${p => p.theme.colors.accent};
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -1.5%;
    top: -2%;
    width: 103%;
    height: 104%;
    border: 3px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.phablet`
    &:hover ${ImageContainer} {
      transform: none;
      box-shadow: initial;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`;

const CardContent = styled.div`
  ${mediaqueries.phablet`
    padding: 16px;
  `}
`;

const HeroGridContainer = styled.div`
  display: flex;
  align-items: space-between;
  margin-bottom: 50px;

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `};

  ${mediaqueries.phablet`
    margin-bottom: 30px;
  `};
`;

const GridControlsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  ${mediaqueries.tablet`
    display: none;
  `};
`;

const GridButton = styled.button<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.25s;

  &:not(:last-child) {
    margin-right: 30px;
  }

  &:hover {
    background: ${p => p.theme.colors.hover};
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -10%;
    width: 120%;
    height: 120%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 50%;
  }

  svg {
    opacity: ${p => (p.active ? 1 : 0.25)};
    transition: opacity 0.2s;

    path {
      fill: ${p => p.theme.colors.primary};
    }
  }
`;
