import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React from 'react';
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
  align-items: center;
`;

const AuthorLink = styled(SightName)`
  font-size: 24px;
  font-weight: 700;
  margin-right: 15px;

  &:not(:first-of-type):before {
    content: '·';
    color: rgba(8, 8, 11, 0.15);
    margin-right: 15px;
  }
`;
