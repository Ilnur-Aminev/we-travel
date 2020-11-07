interface LatLngZoom {
  latitude: number;
  longitude: number;
  zoom: number;
}

export function geoUriParse(uri: string): LatLngZoom | null {
  const re = /^geo:(-?[0-9]*\.?[0-9]+),(-?[0-9]*\.?[0-9]+)\?z=([0-9]*\.?[0-9]+)?/;
  const match = uri.match(re);

  if (!match) {
    return null;
  }

  const parsedGeo = {
    latitude: +match[1],
    longitude: +match[2],
    zoom: +match[3]
  };

  if (parsedGeo.latitude < -90 || parsedGeo.latitude > 90) {
    return null;
  }

  if (parsedGeo.longitude < -180 || parsedGeo.longitude > 180) {
    return null;
  }

  return parsedGeo;
}
