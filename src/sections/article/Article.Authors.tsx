import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Image from '../../components/Image';
import mediaqueries from '../../styles/media';
import { IAuthor } from '../../types';
import { SightName, AdditionalInfo } from '../../components/Common/Common';

interface AuthorsProps {
  author: IAuthor;
  sightType: string;
}

const ArticleAuthors: React.FC<AuthorsProps> = ({ author, sightType }) => {
  if (author == null) {
    return null;
  }
  return (
    <AuthorLink to={author.slug}>
      <AuthorAvatar>
        <RoundedImage src={author.avatar.small} />
      </AuthorAvatar>
      <SightName color={author.color}>{author.name}</SightName>
      <AdditionalInfo>{author.country}</AdditionalInfo>
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

const AuthorLink = styled(Link)`
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
