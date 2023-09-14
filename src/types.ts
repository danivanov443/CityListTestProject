export type FederalDistrict = {
  id: string;
  title: string;
};

export type Region = {
  id: string;
  code: string | null;
  title: string;
  address: string;
  locality: number;
  federalDistrict: FederalDistrict;
};
export type City = {
  id: string;
  title: string;
  address: string;
  point: string;
  region: Region;
  latitude: string;
  longitude: string;
};

export type CityRaw = {
  id: string;
  title: string;
  address: string;
  point: string;
  region: Region;
  latitude: string;
  'longitude:': string;
};

export type CustomListAction = {
  name: string;
  icon: string;
  onPress?: (...args: any[]) => void;
};
