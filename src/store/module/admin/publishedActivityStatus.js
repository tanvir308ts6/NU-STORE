/* eslint-disable prettier/prettier */
import Axios from "axios";

import { SET_PUBLISHED_ACTIVITY_STATUS_DATA } from "../../mutation-types";

import { PublishedActivityStatusApi } from "../../api";

const state = {
  schema: {
    id: "",
    cen_publish_status: "1",
    name: "Mitu",
    f_name: "Md. Abul Kashem",
    m_name: "Marjia begum",
    institution_name: "Victoria College",
  },
  datalist: [],
};

const getters = {
  getActivityStatusItem(state) {
    return state.datalist;
  },
  getActivityStatusSchema(state) {
    return state.schema;
  },
};
const mutations = {
  [SET_PUBLISHED_ACTIVITY_STATUS_DATA](state, result) {
    state.datalist = result;
  },
};
const actions = {
  //after search data
  fetchActivityStatus({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(PublishedActivityStatusApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log(response.data.data);
          commit("SET_PUBLISHED_ACTIVITY_STATUS_DATA", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  changeActivityStatus({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(PublishedActivityStatusApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log(result);
          // commit('SET_PUBLISHED_ACTIVITY_STATUS_DATA', result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
