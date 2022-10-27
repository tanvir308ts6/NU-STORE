/* eslint-disable prettier/prettier */
import Axios from "axios";

import {
  SET_TABULATION_RESULT_GEN_DATA,
  SET_TABULATION_RESULT_GEN_PROGRESS_DATA,
} from "../../mutation-types";

import { ResultGenerateApi, ResultProgressApi } from "../../api";

const state = {
  schema: {
    TabulationResultGen_mark: "",
    passed_percentage: "",
    target_percentage: "",
    target_students: "",
    total_failed: "",
    total_passed: "",
    total_students: "",
  },
  datalist: [],
  progressList: [],
  processSummary: {},
};
const getters = {
  // get data lsit
  getTabulationResultGenSchema(state) {
    return state.schema;
  },
  getTabulationResultGenData(state) {
    console.log("scma d", state.datalist);
    return state.datalist;
  },
  getTabulationResultProgressList(state) {
    return state.progressList;
  },
};
// mutations
const mutations = {
  [SET_TABULATION_RESULT_GEN_DATA](state, result) {
    //console.log('mu', result);
    state.schema = result;
  },
  [SET_TABULATION_RESULT_GEN_PROGRESS_DATA](state, data) {
    state.progressList = data;
  },
};
// Actions
const actions = {
  // generate data list
  callTabulationResultGenerate({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.post(ResultGenerateApi, searchParam)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            var result = response.data.data;
            console.log("...", result);
            commit("SET_TABULATION_RESULT_GEN_DATA", result);
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
  //get progress
  getTabulationResultGenProgress({ commit }, sparam) {
    return new Promise((resolve, reject) => {
      console.log("sparam", sparam);
      // loading  Opening
      Axios.get(ResultProgressApi, {
        params: sparam,
      })
        .then(function(response) {
          console.log("here_", response.data.data);
          commit("SET_TABULATION_RESULT_GEN_PROGRESS_DATA", response.data.data);

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
