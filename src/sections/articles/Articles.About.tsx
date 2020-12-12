import React from 'react';
import styled from '@emotion/styled';
import Section from '../../components/Section';
import { SectionHeader } from './Articles.Hero';
import { graphql, useStaticQuery } from 'gatsby';

const aboutQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            about
          }
        }
      }
    }
  }
`;

export const ArticlesAbout: React.FC = () => {
  const results = useStaticQuery(aboutQuery);
  const about = results.site.edges[0].node.siteMetadata.about;

  return (
    <AboutSection id="Articles__About">
      <SectionHeader>О проекте</SectionHeader>
      <AboutText>{about}</AboutText>
    </AboutSection>
  );
};

const AboutSection = styled(Section)`
  margin: 100px auto 50px;
`;

const AboutText = styled.div`
  margin-top: 30px;
  white-space: pre-wrap;
`;
