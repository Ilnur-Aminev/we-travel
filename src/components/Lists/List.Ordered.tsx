import styled from '@emotion/styled';
import mediaqueries from '@styles/media';

const OrderedList = styled.ol`
  list-style: none;
  counter-reset: list;
  color: ${p => p.theme.colors.articleText};
  position: relative;
  padding: 15px 10px 30px 30px;
  margin: 0 auto;
  transition: ${p => p.theme.colorModeTransition};
  font-size: 18px;

  & ol {
    counter-reset: subList;
    padding: 15px 10px 0 35px;
    font-size: 16px;

    & li {
      padding-left: 0;
    }

    & li:before {
      counter-increment: subList;
      content: counter(list) '.' counter(subList) '.';
      top: 0;
      font-size: 16px;
      left: -3.5rem;
    }

    & li:last-child {
      padding-bottom: 0;
    }
  }

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
    counter-increment: list;
    content: counter(list) '.';
    color: #73737d;
    position: absolute;
    left: -3rem;
    top: 0;

    ${mediaqueries.tablet`
      left: 0;
    `};
  }
`;

export default OrderedList;
