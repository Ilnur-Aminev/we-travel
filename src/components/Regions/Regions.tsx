import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React from 'react';
import mediaqueries from '../../styles/media';
import { IAuthor } from '../../types';
import { SightName } from '../Common/Common';
import { useMediaQuery } from 'react-responsive';
import Image from '../../components/Image';
import Headings from '../Headings';

export const Regions: React.FC<{ authors: IAuthor[] }> = ({ authors }) => {
  const isDesktop = useMediaQuery({
    query: '(min-device-width: 1070px)'
  });

  if (isDesktop) {
    return (
      <DesctopWrapper>
        {authors.map(a => (
          <RegionLink to={a.slug} key={a.name}>
            <ImageWrapper>
              <Image src={a.avatar.medium} style={{ height: '200px' }} />
            </ImageWrapper>
            <Title>{a.name}</Title>
            <Subtitle>{a.country}</Subtitle>
          </RegionLink>
        ))}
      </DesctopWrapper>
    );
  }

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

const Title = styled(Headings.h3)`
  font-family: ${p => p.theme.fonts.sansSerif};
  text-align: center;
  font-size: 22px;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: #7d7d7d;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 20px;
`;

const DesctopWrapper = styled(Wrapper)`
  margin: 50px -10px 0;
`;

const ImageWrapper = styled.div`
  margin-bottom: 16px;
  transition: transform 0.3s var(--ease-out-quad), box-shadow 0.3s var(--ease-out-quad);
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, ${p => (p.narrow ? 0.22 : 0.3)}),
    0 18px 36px -18px rgba(0, 0, 0, ${p => (p.narrow ? 0.25 : 0.33)});
`;

export const RegionLink = styled(Link)`
  width: calc(25% - 20px);
  margin: 10px;
  height: 270px;

  &:hover,
  &:focus {
    ${ImageWrapper} {
      transform: translateY(-1px);
      box-shadow: 0 50px 80px -20px rgba(0, 0, 0, 0.27), 0 30px 50px -30px rgba(0, 0, 0, 0.3);
    }
    h3 {
      color: ${p => p.theme.colors.accent};
    }
  }
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
