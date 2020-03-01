import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

const responseInterceptor = (response) => {
  response.data = camelcaseKeys(response.data, { deep: true });
  return response;
};

const responseErrorInterceptor = (error) => {
  if (!axios.isCancel(error) && error.response) {
    if (error.response) {
      // eslint-disable-next-line no-param-reassign
      error.response.data = camelcaseKeys(error.response.data, { deep: true });
    }
  }
  return Promise.reject(error);
};

export const createApi = (baseUrl) => {
  const api = axios.create({
    baseURL: baseUrl,
  });

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  api.CancelToken = cancelToken;
  api.defaults.headers.common.Client = 'Testbox';
  api.defaults.timeout = 2500;
  api.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
  return { api, source };
};
