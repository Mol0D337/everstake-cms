import Vue from 'vue';
import { handleError } from '@/utils/errorsHandler';
import {
  SET_USER,
  SET_IS_USER_LOADING,
  SET_IS_USER_COOKIE_LOADING,
  SET_USER_ID_TOKEN,
} from '../mutation-types';
import { LOGIN_VIA_SOCIAL_MEDIA, LOGIN, LOGOUT } from '../action-types';

const state = {
  user: {},
  isUserLoading: false,
  isUserCookieLoading: false,
};

const getters = {
  isUserAuth(state) {
    return Boolean(state.user && Object.keys(state.user).length);
  },
  displayName(state) {
    if (!state.user || !Object.keys(state.user).length) return '';
    return state.user.displayName;
  },
  photoURL(state) {
    if (!state.user || !Object.keys(state.user).length) return '';
    return state.user.photoURL;
  },
  email(state) {
    if (!state.user || !Object.keys(state.user).length) return '';
    return state.user.email;
  },
  accessToken(state) {
    return state.user.xa;
  },
};

const mutations = {
  [SET_USER](state, user) {
    state.user = user;
  },
  [SET_IS_USER_LOADING](state, newState) {
    state.isUserLoading = newState;
  },
  [SET_IS_USER_COOKIE_LOADING](state, newState) {
    state.isUserCookieLoading = newState;
  },
  [SET_USER_ID_TOKEN](state, idToken) {
    state.user.xa = idToken;
  },
};

const actions = {
  async [LOGIN]({ commit }) {
    try {
      commit(SET_IS_USER_COOKIE_LOADING, true);
    } catch (e) {
      handleError(e);
    } finally {
      commit(SET_IS_USER_COOKIE_LOADING, false);
      location.reload()
    }
  },
  async [LOGIN_VIA_SOCIAL_MEDIA]({ dispatch, commit }, provider) {
    try {
      commit(SET_IS_USER_LOADING, true);
      const resp = await Vue.prototype.$auth.login(provider);
      if (resp && Object.keys(resp).length !== 0) {
        await dispatch(LOGIN);
      }
    } catch (e) {
      if (e.code === 'auth/account-exists-with-different-credential') {
        await Vue.prototype.$auth.onAccExistsErr(e);
        await dispatch(LOGIN);
      } else {
        handleError(e);
      }
    } finally {
      commit(SET_IS_USER_LOADING, false);
    }
  },
  async [LOGOUT]({ commit }) {
    try {
      await Vue.prototype.$auth.logout();
      commit(SET_USER, {});
    } catch (e) {
      handleError(e);
    } finally {
      location.reload()
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
