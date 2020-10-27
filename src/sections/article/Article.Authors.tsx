import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Image from '../../components/Image';
import mediaqueries from '../../styles/media';
import { IAuthor } from '../../types';
import { SightName, Marker, AdditionalInfo } from '../../components/Common/Common';

interface AuthorsProps {
  authors: IAuthor[];
  sightType: string;
}

const ArticleAuthors: React.FC<AuthorsProps> = ({ authors, sightType }) => {
  if (!authors || !authors[0]) {
    return null;
  }

  const hasCoAuthors = authors.length > 1;
  // Special dropdown UI for multiple authors

  return (
    <AuthorLink as={authors[0]?.authorsPage ? Link : 'div'} to={authors[0]?.slug}>
      <AuthorAvatar>
        <RoundedImage src={authors[0]?.avatar.small} />
      </AuthorAvatar>
      <SightName color={authors[0]?.color}>{authors[0]?.name}</SightName>
      <Marker />
      <AdditionalInfo>{authors[0]?.country}</AdditionalInfo>
      <Marker />
      <AdditionalInfo>{sightType}</AdditionalInfo>
    </AuthorLink>
  );
};

export default ArticleAuthors;

const AuthorAvatar = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-right: 14px;
  background: ${p => p.theme.colors.grey};
  overflow: hidden;
  flex-shrink: 0;

  .gatsby-image-wrapper > div {
    padding-bottom: 100% !important;
  }

  ${mediaqueries.phablet`
    display: none;
  `}
`;

const RoundedImage = styled(Image)`
  border-radius: 50%;
`;

const AuthorLink = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: inherit;
  font-weight: 700;

  strong {
    transition: ${p => p.theme.colorModeTransition};
  }

  &:hover strong {
    color: ${p => p.theme.colors.primary};
  }
`;