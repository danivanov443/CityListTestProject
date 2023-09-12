import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://dev.wibedo.com:9001/api/v1/',
  timeout: 1000,
});

export async function getData(
  pageNumber?: number,
  pageSize?: number,
  searchQuery?: string,
) {
  try {
    const response = await instance.request({
      url: '/laborer/city',
      method: 'GET',
      responseType: 'json',
      params: {
        'page[number]': pageNumber,
        'page[size]': pageSize,
        searchQuery,
      },
    });
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}
