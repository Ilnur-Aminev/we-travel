import React from 'react';
import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby';

import Section from '../Section';
import mediaqueries from '../../styles/media';
import SocialLinks from '../SocialLinks';

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            social {
              url
              name
            }
          }
        }
      }
    }
  }
`;

const Footer: React.FC = () => {
  const results = useStaticQuery(siteQuery);
  const { name, social } = results.allSite.edges[0].node.siteMetadata;

  return (
    <>
      <FooterGradient />
      <Section narrow>
        <HoritzontalRule />
        <FooterContainer>
          <FooterText>© 2020 {name}</FooterText>
          <div>
            <SocialLinks links={social} />
          </div>
        </FooterContainer>
      </Section>
    </>
  );
};

export default Footer;

const FooterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 80px;
  color: ${p => p.theme.colors.grey};

  /* ${mediaqueries.tablet`
    flex-direction: column;
    padding-bottom: 0;
  `}

  ${mediaqueries.phablet`
    align-items: flex-start;
  `} */
`;

const HoritzontalRule = styled.div`
  position: relative;
  margin: 140px auto 50px;
  border-bottom: 1px solid ${p => p.theme.colors.horizontalRule};

  ${mediaqueries.tablet`
    margin: 56px auto 0;
  `}
`;

const FooterText = styled.div`
  ${mediaqueries.tablet`
    margin-bottom: 80px;
  `}

  ${mediaqueries.tablet`
    margin: 24px 0;
  `}
`;

const FooterGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 390px;
  z-index: 0;
  pointer-events: none;
  background: ${p => p.theme.colors.gradient};
  transition: ${p => p.theme.colorModeTransition};
`;
