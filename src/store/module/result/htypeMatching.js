/* eslint-disable prettier/prettier */
import Axios from "axios";

import {
  SET_E_H_TYPE_MATCH_GEN_DATA,
  SET_E_H_TYPE_MATCH_STATUS_DATA,
} from "../../mutation-types";

import { hTypeMatchingApi, hTypeMatchingStatusApi } from "../../api";

const state = {
  schema: {
    hTypeMatching_mark: "",
    passed_percentage: "",
    target_percentage: "",
    target_students: "",
    total_failed: "",
    total_passed: "",
    total_students: "",
  },
  datalist: [],
  progressList: [],
};
const getters = {
  // get data lsit
  gethTypeMatchingSchema(state) {
    return state.schema;
  },
  gethTypeMatchingData(state) {
    console.log("scma d", state.datalist);
    return state.datalist;
  },
  getMatchingProgressList(state) {
    return state.progressList;
  },
};
// mutations
const mutations = {
  [SET_E_H_TYPE_MATCH_GEN_DATA](state, result) {
    //console.log('mu', result);
    state.schema = result;
  },
  [SET_E_H_TYPE_MATCH_STATUS_DATA](state, data) {
    state.progressList = data;
  },
};
// Actions
const actions = {
  // get data list
  callhTypeMatching({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.post(hTypeMatchingApi, searchParam)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            var result = response.data.data;
            console.log("...", result);
            commit("SET_E_H_TYPE_MATCH_GEN_DATA", result);
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green",
            });
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "orange",
            });
          }
          // return state.datalist;
          resolve(response.data.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  gethTypeMatchingProcess({ commit }, sparam) {
    return new Promise((resolve, reject) => {
      console.log("sparam", sparam);
      // loading  Opening
      Axios.get(hTypeMatchingStatusApi, {
        params: sparam,
      })
        .then(function(response) {
          console.log("here_", response.data.data);
          commit("SET_E_H_TYPE_MATCH_STATUS_DATA", response.data.data);

          resolve(response.data.data);
        })
        .catch(function(response) {
          commit("SET_SNACKBAR", {
            msg: response.data.message,
            color: "red",
          });
          // commit("UNSET_LOADING");
          // console.log(error);
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
