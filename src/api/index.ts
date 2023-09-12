import axios from 'axios';

export async function getData() {
  try {
    const {data} = await axios.request({
      url: 'http://dev.wibedo.com:9001/api/v1/laborer/city',
      method: 'GET',
      responseType: 'json',
    });
    return data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}
