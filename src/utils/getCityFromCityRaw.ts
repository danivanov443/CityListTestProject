import {City, CityRaw} from '../types';

export default function getCityFromCityRaw(cityRaw: CityRaw): City {
  const longitude = cityRaw['longitude:'];

  const city: City = {
    id: cityRaw.id,
    title: cityRaw.title,
    address: cityRaw.address,
    point: cityRaw.point,
    region: cityRaw.region,
    latitude: cityRaw.latitude,
    longitude: longitude,
  };

  return city;
}
