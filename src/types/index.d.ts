import React from 'react';

export interface IPaginator {
  pageCount: number;
  index: number;
  pathPrefix: string;
}

interface IGatsbyImage {
  src: string;
  base64?: string;
  srcWebp?: string;
  srcSet?: string;
  srcSetWebp?: string;
  tracedSVG?: string;
}

interface IGatsbyImageFluid extends IGatsbyImage {
  maxHeight: number;
  maxWidth: number;
}

interface IGatsbyImageFixed extends IGatsbyImage {
  height: number;
  width: number;
}

export interface IAuthor {
  authorsPage?: boolean;
  featured?: boolean;
  name: string;
  slug: string;
  bio: string;
  color: SightColor;
  country: string;
  avatar: {
    image: IGatsbyImageFluid;
    large: IGatsbyImageFluid;
    full: IGatsbyImageFluid;
  };
}

export interface IArticle {
  slug: string;
  author: string;
  title: string;
  excerpt: string;
  type: string;
  body: string;
  id: string;
  hero: {
    full: IGatsbyImageFluid;
    preview: IGatsbyImageFluid;
    regular: IGatsbyImageFluid;
    seo: { src: string };
  };
  canonical_url?: string;
  dateForSEO: string;
  timeToRead: number;
  date: string;
  secret: boolean;
}

export interface IProgress {
  height: number;
  offset: number;
  title: string;
  mode: string;
  onClose?: () => void;
}

export type Icon = React.FC<{
  fill: string;
}>;

export type ArticlesTemplate = React.FC<{
  pageContext: {
    group: IArticle[];
    additionalContext: {
      authors: IAuthor[];
    };
    pageCount: number;
  };
  location: Location;
}>;

export type ArticleTemplate = React.FC<{
  pageContext: {
    authors: IAuthor[];
    article: IArticle;
    next: IArticle[];
  };
  location: Location;
}>;

export type SightColor = 'blue' | 'green' | 'red' | 'orange';

export type SightType = 'Пляж' | 'Храм' | 'Остров' | 'Смотровая площадка' | 'Природа';
