import axios, {AxiosResponse} from 'axios';
import Toast from 'react-native-toast-message';

import {City, CityRaw} from '@src/types';
import getCityFromCityRaw from '@utils/getCityFromCityRaw';

interface RequestParams {
  [key: string]: string | number | boolean | undefined;
}

const instance = axios.create({
  baseURL: 'http://dev.wibedo.com:9001/api/v1/',
  timeout: 10000,
});

async function makeRequest<T>(
  url: string,
  method: string = 'GET',
  params?: RequestParams,
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await instance.request({
      url,
      method,
      responseType: 'json',
      params,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request error: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Request error: ${(error as Error).message}`);
  }
}

export async function getCities(
  pageNumber?: number,
  pageSize?: number,
  searchQuery?: string,
): Promise<City[] | undefined> {
  try {
    const response = await makeRequest<CityRaw[]>('/laborer/city', 'GET', {
      'page[number]': pageNumber,
      'page[size]': pageSize,
      searchQuery,
    });
    return response.map<City>(city => getCityFromCityRaw(city));
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: (error as Error).message,
      position: 'bottom',
    });
  }
}
