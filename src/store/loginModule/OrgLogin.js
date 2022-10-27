import Axios from "axios";

import {
  SET_ORGANIZATION_LOGGED_IN,
  SET_ORGANIZATION,
  SET_ORGANIZATION_TOKEN,
  UNSET_ORGANIZATION_LOGGED_IN,
  UNSET_ORGANIZATION,
  UNSET_ORGANIZATION_TOKEN
} from "../mutation-types";

import { orgLoginUrl, orgLogoutUrl } from "../api";
const state = {
  orgLoggedIn: false,
  orgToken: null,
  orgUser: {}
};
const getters = {
  organization(state) {
    return JSON.parse(localStorage.getItem("organization"));
  }
};
const mutations = {
  [SET_ORGANIZATION_LOGGED_IN](state) {
    state.orgLoggedIn = true;
  },
  [UNSET_ORGANIZATION_LOGGED_IN](state) {
    state.orgLoggedIn = false;
  },
  [SET_ORGANIZATION](state, data) {
    state.orgUser = data;
  },
  [UNSET_ORGANIZATION](state) {
    state.orgUser = {};
  },
  [SET_ORGANIZATION_TOKEN](state, data) {
    state.orgToken = data;
  },
  [UNSET_ORGANIZATION_TOKEN](state) {
    state.orgToken = null;
  }
};
const actions = {
  orgLogin({ commit }, data) {
    // console.log(data)
    var params = new URLSearchParams();
    localStorage.clear();
    commit("SET_LOADING", { color: "primary" });
    params.append("email", data.username);
    params.append("password", data.password);
    return new Promise((resolve, reject) => {
      Axios.post(orgLoginUrl, params)
        .then(function(response) {
          console.log(response.data);
          var token = response.data.access_token;
          var expires = response.data.expires_in;
          var user = response.data.user;

          localStorage.setItem("guard", true);
          localStorage.setItem("token", token);
          localStorage.setItem("organization", JSON.stringify(user));
          localStorage.setItem("org-expires", expires);
          // localStorage.setItem("menu", JSON.stringify(menu));
          commit("SET_ORGANIZATION_LOGGED_IN");
          commit("SET_ORGANIZATION", user);
          commit("SET_ORGANIZATION_TOKEN", token);
          resolve();
        })
        .catch(function(error) {
          localStorage.removeItem("token");
          localStorage.removeItem("org-expires");

          commit("UNSET_ORGANIZATION_LOGGED_IN");
          commit("UNSET_ORGANIZATION");
          commit("UNSET_ORGANIZATION_TOKEN");

          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  orgLogout({ commit, state }) {
    return new Promise(resolve => {
      Axios.post(orgLogoutUrl);
      localStorage.clear();

      commit("UNSET_ORGANIZATION_LOGGED_IN");
      commit("UNSET_ORGANIZATION");
      commit("UNSET_ORGANIZATION_TOKEN");

      resolve();
    });
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
