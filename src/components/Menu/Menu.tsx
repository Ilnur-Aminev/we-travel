import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { IAuthor } from '../../types';
import {
  CountriesList,
  Country,
  MenuButton,
  MenuContent,
  MenuWrapper,
  RegionItem,
  RegionLink,
  RegionsList,
  RoundedImage,
  BackArrow,
  RegionsWrapper
} from './Menu.styled';
import { Sizes } from '../../gatsby-plugin-theme-ui';

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

const styles: React.CSSProperties = {
  height: '100vh',
  overflow: 'hidden'
};

const defaultStyles: React.CSSProperties = {
  height: 'auto',
  overflow: 'auto'
};

export const Menu: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: Sizes.tablet });
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
  const defaultCountry = isMobile ? undefined : countries[0];
  const [country, setCountry] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (!showMenu) {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      setCountry(undefined);
      return;
    }
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    setCountry(defaultCountry);
  }, [showMenu]);

  return (
    <>
      <MenuButton onClick={() => setShowMenu(!showMenu)} opened={showMenu} />
      {renderRegions()}
    </>
  );

  function renderRegions() {
    const showCountries = !isMobile || !country;
    const menuHeight = isMobile ? window.innerHeight - 70 : menuRef.current?.offsetHeight;
    return (
      <MenuWrapper active={showMenu} h={menuHeight}>
        <MenuContent ref={menuRef}>
          {showCountries && (
            <CountriesList>
              {countries.map(ct => (
                <Country key={ct} active={ct === country} onClick={() => setCountry(ct)} country={ct}>
                  {ct}
                </Country>
              ))}
            </CountriesList>
          )}
          {country && (
            <RegionsWrapper>
              {isMobile && <BackArrow onClick={() => setCountry(undefined)} />}
              <RegionsList>
                {countriesMap[country]?.map(ct => (
                  <RegionItem key={ct.name}>
                    <RegionLink to={ct.slug} activeStyle={{ pointerEvents: 'none', fontWeight: 800 }}>
                      <RoundedImage src={ct.avatar.publicURL} />
                      {ct.name}
                    </RegionLink>
                  </RegionItem>
                ))}
              </RegionsList>
            </RegionsWrapper>
          )}
        </MenuContent>
      </MenuWrapper>
    );
  }
};
