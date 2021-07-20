import styled from '@emotion/styled'
import mediaqueries from '@styles/media';

const UnorderedList = styled.ul`
  list-style: none;
  counter-reset: list;
  color: ${p => p.theme.colors.articleText};
  position: relative;
  padding: 15px 0 30px 25px;
  transition: ${p => p.theme.colorModeTransition};
  margin: -30px auto 0;
  font-size: 18px;

  width: 100%;
  max-width: 680px;

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
    padding-left: 0px;
  `};

  ${mediaqueries.phablet`
    padding-left: 20px;
  `};

  li {
    position: relative;
    padding-bottom: 15px;

    ${mediaqueries.tablet`
      padding-left: 30px;
    `};

    ${mediaqueries.phablet`
      padding-left: 30px;
    `};

    p {
      ${mediaqueries.tablet`
        padding: 0;
      `};
    }
  }

  li > :not(ol, ul) {
    display: inline;
  }

  li::before {
    display: inline-block;
    color: ${p => p.theme.colors.articleText};
    content: '';
    position: absolute;
    left: -25px;
    top: 10px;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: ${p => p.theme.colors.articleText};

    ${mediaqueries.tablet`
      left: 0;
    `};
  }
`;

export default UnorderedList;
