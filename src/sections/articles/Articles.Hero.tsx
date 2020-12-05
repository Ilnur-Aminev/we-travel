import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import Section from '../../components/Section';
import Icons from '../../icons/index';
import mediaqueries from '../../styles/media';
import { IAuthor } from '../../types';
import heroImg from '../../assets/hero.svg';

import { GridLayoutContext } from './Articles.List.Context';
import { Regions } from '../../components/Regions';

const authorQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              heading
            }
          }
        }
      }
    }
  }
`;

const ArticlesHero: React.FC<{ authors: IAuthor[] }> = ({ authors }) => {
  const { gridLayout = 'tiles', hasSetGridLayout, setGridLayout } = useContext(GridLayoutContext);

  const results = useStaticQuery(authorQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;
  const tilesIsActive = hasSetGridLayout && gridLayout === 'tiles';
  return (
    <>
      <HeroImg />
      <Section id="Articles__Hero">
        <RegionsContainer>
          <SectionHeader>Регионы</SectionHeader>
          <Regions authors={authors} />
        </RegionsContainer>
        <HeroGridContainer>
          <SectionHeader>{hero.heading}</SectionHeader>
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
      </Section>
    </>
  );
};

export default ArticlesHero;

const HeroImg = styled.section`
  width: 100%;
  margin: 60px 0 40px;
  background: url(${heroImg});
  height: 400px;
  background-size: cover;

  ${mediaqueries.phablet`
    height: 200px;
    margin: 20px 0;
    background-position-x: 70%;
  `};
`;

const HeroGridContainer = styled.div`
  display: flex;
  align-items: space-between;
  margin-bottom: 80px;

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

const RegionsContainer = styled.div`
  margin: 100px 0;

  ${mediaqueries.tablet`
    margin: 35px 0 30px;
  `}
`;

const SectionHeader = styled.h2`
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 1.15;
  color: ${p => p.theme.colors.primary};
  font-family: ${p => p.theme.fonts.serif};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 36px;
  `}

  ${mediaqueries.phablet`
    font-size: 24px;
  `}

  ${mediaqueries.phone`
    font-size: 20px;
  `}
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
