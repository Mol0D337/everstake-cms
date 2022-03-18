import Vue from 'vue';
import axios from 'axios';
import queryString from 'querystring';
import { handleError } from '@/utils/errorsHandler';
import { SET_USER_ID_TOKEN } from '@/store/mutation-types';
import store from '../store';

const formatParams = (params) =>
  params && Object.keys(params).length
    ? `?${queryString.stringify(params)}`
    : '';

const APIService = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const handleAuthorizationBearer = async (config) => {
  const accessToken = await Vue.prototype.$auth.getUserIdToken();

  if (accessToken) {
    config.headers.Authorization = accessToken;
  }
  return config;
};

APIService.interceptors.request.use(
  (config) => {
    return handleAuthorizationBearer(config);
  },
  (e) => {
    return Promise.reject(e);
  },
);

let isRefreshing = false;
let subscribers = [];
function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}
function onRefreshed() {
  subscribers.map((cb) => cb());
}

APIService.interceptors.response.use(
  (response) => {
    return response;
  },
  // eslint-disable-next-line consistent-return
  (e) => {
    const originalRequest = e.config;

    if (e.response.data.error === 'ERR_BAD_AUTH') {
      if (!isRefreshing) {
        isRefreshing = true;

        Vue.prototype.$auth
          .getUserIdToken(true)
          .then((resp) => {
            store.commit(`auth/${SET_USER_ID_TOKEN}`, resp);
            isRefreshing = false;
            subscribers = [];
          })
          .catch((error) => {
            handleError(error);
          });
      }

      const requestSubscribers = new Promise((resolve) => {
        subscribeTokenRefresh(() => {
          resolve(APIService(originalRequest));
        });
      });

      onRefreshed();
      return requestSubscribers;
    }

    return Promise.reject(e);
  },
);

subscribers = [];

export const getWalletsChains = () => {
  return APIService.get(`/wallets/chains`);
};

export const getRates = () => {
  return APIService.get(`/rates`);
};

// Admin routes requires authentication for access. Access provided for all admin roles.

export const getChain = (params) => {
  return APIService.get(`/chain?name=${params}`);
};

export const putChain = (data) => {
  return APIService.put(`/chain`, data);
};

export const getChains = () => {
  return APIService.get('/chains');
};

export const getCurrencies = () => {
  return APIService.get(`/currencies`);
};

export const getCurrency = (params) => {
  return APIService.get(`/currency?code=${params}`);
};

export const postTextBlock = (data) => {
  return APIService.post(`/text_block`, data);
};

export const putTextBlock = (data) => {
  return APIService.put(`/text_block`, data);
};

// Admin routes requires authentication for access. Access provided for admin role only.

export const postChain = (data) => {
  return APIService.post(`/chain`, data);
};

export const putUserRole = (data) => {
  return APIService.put(`/user/role`, data);
};

export const getUsers = () => {
  return APIService.get(`/users`);
};

// Admin routes requires authentication for access. Access provided for editor & admin roles.

export const postCurrency = (data) => {
  return APIService.post(`/currency`, data);
};

export const putCurrency = (data) => {
  return APIService.put(`/currency`, data);
};

export const deleteTextBlock = (data) => {
  return APIService.delete(`/text_block`, data);
};

// Public routes

export const getTextBlock = (data) => {
  return APIService.get(`/text_block`);
};

export const getSystemInfo = (data) => {
  return APIService.get(`/system_info`);
};

// Public routes
