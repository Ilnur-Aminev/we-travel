import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { IAuthor } from '../../types';
import Image from '../Image';
import { Link } from 'gatsby';
import mediaqueries from '../../styles/media';

const query = graphql`
  {
    allAuthor {
      nodes {
        country
        name
        slug
        avatar {
          publicURL
        }
      }
    }
  }
`;

export const Menu: React.FC = () => {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const results = useStaticQuery(query);
  const allRegions: IAuthor[] = results.allAuthor.nodes;
  const [showMenu, setShowMenu] = React.useState<boolean>();
  const countriesMap: { [key: string]: IAuthor[] } = allRegions.reduce((acc, ct) => {
    if (acc[ct.country]) {
      acc[ct.country] = [...acc[ct.country], ct];
    } else {
      acc[ct.country] = [ct];
    }
    return acc;
  }, {});
  const countries = Object.keys(countriesMap);
  const [country, setCountry] = React.useState<string>(countries[0]);

  return (
    <>
      <MenuButton onClick={() => setShowMenu(!showMenu)} opened={showMenu} />
      {renderRegions()}
    </>
  );

  function renderRegions() {
    return (
      <MenuWrapper active={showMenu} h={menuRef.current?.offsetHeight}>
        <MenuContent ref={menuRef}>
          <CountriesList>
            {countries.map(ct => (
              <Country key={ct} active={ct === country} onClick={() => setCountry(ct)} country={ct}>
                {ct}
              </Country>
            ))}
          </CountriesList>
          <RegionsList>
            {countriesMap[country]?.map(ct => (
              <RegionItem key={ct.name}>
                <RegionLink
                  to={ct.slug}
                  activeStyle={{ pointerEvents: 'none', fontWeight: 800 }}
                >
                  <RoundedImage src={ct.avatar.publicURL}></RoundedImage>
                  {ct.name}
                </RegionLink>
              </RegionItem>
            ))}
          </RegionsList>
        </MenuContent>
      </MenuWrapper>
    );
  }
};

const getHamburgerBg = color => {
  return `linear-gradient(
    to bottom,
    ${color} 0%,
    ${color} 14.3%,
    transparent 14.3%,
    transparent 28.6%,
    ${color} 28.6%,
    ${color} 42.9%,
    transparent 42.9%,
    transparent 57.2%,
    ${color} 57.2%,
    ${color} 71.6%,
    transparent 71.6%,
    transparent 85.9%,
    ${color} 85.9%,
    ${color} 100%
  )`;
};

const getCloseBg = color => {
  return `linear-gradient(
    -45deg,
    transparent 0%,
    transparent 46%,
    ${color} 46%,
    ${color} 56%,
    transparent 56%,
    transparent 100%
  ), linear-gradient(
    45deg,
    transparent 0%,
    transparent 46%,
    ${color} 46%,
    ${color} 56%,
    transparent 56%,
    transparent 100%
  );`;
};

const MenuButton = styled.button<{ opened?: boolean }>`
  width: 24px;
  height: 24px;
  background: ${p => (p.opened ? getCloseBg(p.theme.colors.primary) : getHamburgerBg(p.theme.colors.primary))};
  opacity: 0.5;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  ${mediaqueries.tablet`
    display: none
  `};
`;

const MenuWrapper = styled.div<{ active?: boolean; h?: number }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${p => p.theme.colors.background};
  box-shadow: 0px 40px 40px rgba(0, 0, 0, 0.1);
  height: ${p => (p.active ? p.h : 0)}px;
  transition: height 0.3s ease-in-out;
  overflow: hidden;
`;

const MenuContent = styled.div`
  display: flex;
  max-width: 1220px;
  padding: 0 20px;
  margin: 0 auto;
  padding-bottom: 80px;
`;

const CountriesList = styled.ul`
  padding: 20px 0;
  list-style: none;
  border-right: 1px solid #ccc;
  color: ${p => p.theme.colors.primary};
  flex-shrink: 0;

  &::before {
    content: 'Страны';
    font-family: ${p => p.theme.fonts.serif};
    display: block;
    font-size: 24px;
    line-height: 30px;
    font-weight: 600;
    margin-bottom: 15px;
    padding-left: 20px;
  }
`;

const RegionsList = styled.ul`
  padding: 20px 20px 20px 40px;
  list-style: none;
  color: ${p => p.theme.colors.primary};

  &::before {
    content: 'Регионы';
    font-family: ${p => p.theme.fonts.serif};
    display: block;
    font-size: 24px;
    line-height: 30px;
    font-weight: 600;
    margin-bottom: 15px;
    padding-left: 20px;
  }
`;

const RoundedImage = styled(Image)`
  width: 56px;
  height: 56px;
  margin-right: 10px;
  border-radius: 50%;
`;

const RegionItem = styled.li`
  display: inline-block;
  margin-right: 5px;
`;

export const RegionLink = styled(Link)`
  width: 290px;
  padding: 16px;
  border-radius: 2px;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${p => p.theme.colors.primary};

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

const activeCss = css`
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  font-size: 20px;
`;

const FlagMap = {
  Россия: '🇷🇺',
  Тайланд: '🇹🇭'
};

const Country = styled.li<{ active?: boolean; country: string }>`
  width: 196px;
  padding: 8px 20px;
  margin-bottom: 10px;
  font-weight: 600;
  border-radius: 2px;
  cursor: pointer;
  font-size: ${p => (p.active ? 20 : 16)}px;
  line-height: 24px;
  transition: font-size 0.1s ease-in-out;
  ${p => p.active && activeCss}

  &:before {
    content: '${p => FlagMap[p.country]}';
    display: inline;
    margin-right: 7px;
  }

  &:hover {
    color: #000;
    background: #fff;
    ${activeCss}
  }
`;
