import {City} from './../types';

export default function getAddressWithoutCity(city: City) {
  const addressArray = city.address.split(',');
  addressArray.pop();
  return addressArray.join(',');
}
