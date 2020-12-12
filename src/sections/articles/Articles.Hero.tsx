import React from 'react';
import styled from '@emotion/styled';
import Section from '../../components/Section';
import mediaqueries from '../../styles/media';
import { IAuthor } from '../../types';
import heroImg from '../../assets/hero.svg';

import { Regions } from '../../components/Regions';

const ArticlesHero: React.FC<{ authors: IAuthor[] }> = ({ authors }) => {
  return (
    <>
      <HeroImg />
      <Section id="Articles__Hero">
        <RegionsContainer>
          <SectionHeader>Регионы</SectionHeader>
          <Regions authors={authors} />
        </RegionsContainer>
      </Section>
    </>
  );
};

export default ArticlesHero;

const HeroImg = styled.section`
  width: 100%;
  background: url(${heroImg});
  margin-top: 20px;
  height: 400px;
  background-size: cover;

  ${mediaqueries.phablet`
    height: 200px;
    margin: 20px 0;
    background-position-x: 70%;
  `};
`;

const RegionsContainer = styled.div`
  margin: 70px 0;

  ${mediaqueries.tablet`
    margin: 35px 0 30px;
  `}
`;

export const SectionHeader = styled.h2`
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
