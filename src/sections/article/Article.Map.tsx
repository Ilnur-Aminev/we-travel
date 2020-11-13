import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { geoUriParse } from '../../helpers/geoUriParse';
import { ArticleGeoUri } from '../../types';

interface Props {
  baloonTitle?: string;
  geoUri?: string;
  regionGeoUris?: ArticleGeoUri[];
}

export const ArticleMap: React.FC<Props> = ({ baloonTitle, geoUri, regionGeoUris }) => {
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
        <Marker position={[latitude, longitude]}>{baloonTitle && <Popup>{baloonTitle}</Popup>}</Marker>
        {renderRegionUris()}
      </MapContainer>
    </MapWrapper>
  );

  function renderRegionUris() {
    if (!regionGeoUris || regionGeoUris.length === 0) {
      return null;
    }

    return regionGeoUris.map(({ geoUri, slug, title }) => {
      const { latitude, longitude } = geoUriParse(geoUri)!;
      return (
        <Marker position={[latitude, longitude]} key={title}>
          <Popup>
            <Link to={slug}>{title}</Link>
          </Popup>
        </Marker>
      );
    });
  }
};

const MapWrapper = styled.div`
  position: relative;
  height: 600px;
  margin: 40px auto 70px;
`;
