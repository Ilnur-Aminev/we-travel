import React from 'react';

export interface IPaginator {
  pageCount: number;
  index: number;
  pathPrefix: string;
  siteUrl?: string;
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
  featured?: boolean;
  name: string;
  slug: string;
  bio: string;
  color: SightColor;
  country: string;
  avatar: {
    large: IGatsbyImageFluid;
    medium: IGatsbyImageFluid;
    small: IGatsbyImageFluid;
  };
}

export interface IArticle {
  slug: string;
  author: IAuthor;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  excerpt: string;
  type: string;
  body: string;
  id: string;
  geoUri: string;
  visitTime: string;
  ageLimit?: string;
  price: string;
  hero: {
    full: IGatsbyImageFluid;
    preview: IGatsbyImageFluid;
    regular: IGatsbyImageFluid;
    narrow: IGatsbyImageFluid;
    seo: { src: string };
  };
  canonical_url?: string;
  dateForSEO: string;
  timeToRead: number;
  date: string;
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
export interface ArticleGeoUri {
  title: string;
  geoUri: string;
  slug: string;
  hero: IGatsbyImageFluid;
  excerpt: string;
}

export type ArticleTemplate = React.FC<{
  pageContext: {
    article: IArticle;
    next: IArticle[];
    regionGeoUris: ArticleGeoUri[];
  };
  location: Location;
}>;

export type SightColor = 'blue' | 'green' | 'red' | 'orange';

export type SightType = 'Пляж' | 'Храм' | 'Остров' | 'Смотровая площадка' | 'Природа';
