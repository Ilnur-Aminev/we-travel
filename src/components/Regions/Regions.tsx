import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React from 'react';
import mediaqueries from '../../styles/media';
import { IAuthor } from '../../types';
import { SightName } from '../Common/Common';

export const Regions: React.FC<{ authors: IAuthor[] }> = ({ authors }) => {
  return (
    <Wrapper>
      {authors.map(a => (
          <AuthorLink color={a.color} key={a.name}>
            <Link to={a.slug} key={a.name}>
              {a.name}
            </Link>
          </AuthorLink>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const AuthorLink = styled(SightName)`
  font-size: 24px;
  font-weight: 700 !important;
  margin-right: 15px;
  padding-right: 15px;

  &&&:after {
    top: 16px;
  }

  ${mediaqueries.phablet`
    font-size: 18px;
    &&&:after {
      top: 12px;
    }
  `}
`;
