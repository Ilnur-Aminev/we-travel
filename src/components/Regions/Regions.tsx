import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React from 'react';
import mediaqueries from '../../styles/media';
import { IAuthor } from '../../types';
import { SightName, Marker } from '../Common/Common';

export const Regions: React.FC<{ authors: IAuthor[] }> = ({ authors }) => {
  return (
    <Wrapper>
      {authors.map((a, idx) => (
        <>
          {idx > 0 && <CustomMarker />}
          <AuthorLink color={a.color} key={a.name}>
            <Link to={a.slug} key={a.name}>
              {a.name}
            </Link>
          </AuthorLink>
        </>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CustomMarker = styled(Marker)`
  width: 6px;
  height: 6px;
  margin: 0 15px;
`;

const AuthorLink = styled(SightName)`
  font-size: 24px;
  font-weight: 700;

  ${mediaqueries.phablet`
    font-size: 18px;
  `}
`;
