import axios from 'axios';

let store = null;
export function installHttp(s) {
  store = s;
}

const http = axios.create({
  baseURL: '',
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

http.interceptors.request.use((config) => {
  if (config.loading) {
    store.commit('loading/startLoading', { name: config.loading });
  }
  return config;
}, error => Promise.reject(error));

http.interceptors.response.use((response) => {
  if (response.config.loading) {
    store.commit('loading/endLoading', { name: response.config.loading });
  }
  return response;
}, (error) => {
  if (error.response.config.loading) {
    store.commit('loading/endLoading', { name: error.response.config.loading });
  }
  return Promise.reject(error);
});

export default http;
