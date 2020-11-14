import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { geoUriParse } from '../../helpers/geoUriParse';
import { ArticleGeoUri, IGatsbyImage } from '../../types';
import Image from '../../components/Image';
import { limitToTwoLines } from '../articles/Articles.List';

export interface BaloonProps {
  title: string;
  excerpt: string;
  hero: IGatsbyImage;
}

interface MarkerProps extends BaloonProps {
  longitude: number;
  latitude: number;
  slug?: string;
}

interface Props {
  baloon: BaloonProps;
  geoUri?: string;
  regionGeoUris?: ArticleGeoUri[];
}

export const ArticleMap: React.FC<Props> = ({ baloon: { hero, title, excerpt }, geoUri, regionGeoUris }) => {
  if (!geoUri || geoUriParse(geoUri) == null) {
    return null;
  }
  const { latitude, longitude, zoom } = geoUriParse(geoUri)!;

  return (
    <MapWrapper>
      <MapContainer center={[latitude, longitude]} zoom={zoom} scrollWheelZoom={false} style={{ height: '600px' }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapMarker title={title} hero={hero} latitude={latitude} longitude={longitude} excerpt={excerpt} />
        {renderRegionUris()}
      </MapContainer>
    </MapWrapper>
  );

  function renderRegionUris() {
    if (!regionGeoUris || regionGeoUris.length === 0) {
      return null;
    }

    return regionGeoUris.map(({ geoUri, slug, title, hero, excerpt }) => {
      const { latitude, longitude } = geoUriParse(geoUri)!;
      return (
        <MapMarker
          key={title}
          title={title}
          slug={slug}
          hero={hero}
          latitude={latitude}
          longitude={longitude}
          excerpt={excerpt}
        />
      );
    });
  }
};

const MapMarker: React.FC<MarkerProps> = ({ title, excerpt, hero, latitude, longitude, slug }) => {
  const renderTitle = () =>
    slug ? (
      <ArticleLink to={slug}>
        <Title>{title}</Title>
      </ArticleLink>
    ) : (
      <Title>{title}</Title>
    );

  return (
    <Marker position={[latitude, longitude]} key={title} title={title}>
      <Popup>
        <HeroWrapper>
          <Image src={hero} />
        </HeroWrapper>
        {renderTitle()}
        <Description>{excerpt}</Description>
      </Popup>
    </Marker>
  );
};

const HeroWrapper = styled.div`
  margin: 20px 0;
`;

const ArticleLink = styled(Link)`
  &:hover > * {
    color: #016891;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  font-family: ${p => p.theme.fonts.serif};
  margin-bottom: 10px;
  line-height: 1.1;
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};
`;

const MapWrapper = styled.div`
  position: relative;
  height: 600px;
  margin: 40px auto 70px;
`;

const Description = styled.p`
  margin: 0 0 18px !important;
`;
