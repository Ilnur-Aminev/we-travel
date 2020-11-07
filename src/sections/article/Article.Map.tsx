import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { geoUriParse } from '../../helpers/geoUriParse';

interface Props {
  baloonTitle?: string;
  geoUri?: string;
}

export const ArticleMap: React.FC<Props> = ({ baloonTitle, geoUri }) => {
  if (typeof window == 'undefined' || !geoUri || geoUriParse(geoUri) == null) {
    return null;
  }
  const { latitude, longitude, zoom } = geoUriParse(geoUri)!;

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: '600px', margin: '40px auto 70px' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>{baloonTitle && <Popup>{baloonTitle}</Popup>}</Marker>
    </MapContainer>
  );
};
