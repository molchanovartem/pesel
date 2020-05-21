/* eslint-disable */
import axios from 'axios';
import store from '../store';
import router from '../router';

const baseURL = process.env.VUE_APP_BASE_URL;

const headers = {};
// const params = {};


// NOTE: axiosInstance для модифицирования запросов, ответов.
const axiosInstance = axios.create({
  baseURL,
  headers,
});
// NOTE: перехвадчик для запросов
axiosInstance.interceptors.request.use(
  (request) => {
    // NOTE: добавляет аксесс токен авторизации в запрос. в будущем закомментировный код пригодится.
    const { token } = store.state.auth;
    if (token) {
      request.headers['x-access-token'] = token;
    }
    // TODO: временное решение, надо удалить, когда время жизни токена настроят
    // request.headers['x-access-token'] = store.getters['auth/token'];

    return request;
  },
  (error) => {
    const { status, data } = error.response;

    // store.commit('ui/LOADING', false, { root: true });

    return Promise.reject(error.response);
  },
);
// NOTE: перехватываем ответ от сервера, в дев режиме выводим в консоль.
axiosInstance.interceptors.response.use(
  (response) => {
    const { config, data } = response;

    // store.commit('ui/LOADING', false, { root: true });

    if (process.env.NODE_ENV === 'development') {
      console.log(`${config.method}: ${config.url}`, data);
    }

    return data;
  },
  (error) => new Promise((resolve, reject) => {
    // store.commit('ui/LOADING', false, { root: true });
    const { response } = error;
    // NOTE: если у пользвателя токен истек, то данные пользователя удаляются, перекидывает на логин
    if (response.status === 401 && response.config && !response.config.__isRetryRequest) {
      store.dispatch('auth/AUTH_LOGOUT')
        .then(() => {
          router.push({ path: '/auth/login' });
          resolve();
        });
    }
    reject(response.data);
  }),

);

export default axiosInstance;
