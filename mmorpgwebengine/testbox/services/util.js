import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';


// function toLowerCase(object) {
//   if (object instanceof Array) {
//     return object.map((element) => toLowerCase(element));
//   }

//   return Object.keys(object).reduce((c, k) => {
//     const name = k[0].toLowerCase() + k.slice(1);
//     if (object[k] == null) {
//       // eslint-disable-next-line no-param-reassign
//       c[name] = null;
//     } else if (object[k] instanceof Array) {
//       // eslint-disable-next-line no-param-reassign
//       c[name] = object[k].map((o) => toLowerCase(o));
//     } else if (typeof object[k] === 'object') {
//       // eslint-disable-next-line no-param-reassign
//       c[name] = toLowerCase(object[k]);
//     } else {
//       // eslint-disable-next-line no-param-reassign
//       c[name] = object[k];
//     }
//     return c;
//   }, {});
// }


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
