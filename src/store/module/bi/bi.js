// fetchCollegeWiseBasicInfo

/* eslint-disable prettier/prettier */
// axios
import Axios from "axios";

// apis
import { CollegeWiseBasicBiInfoURL, BiResultDataURL } from "../../api";

// mutation types
import {
  SET_BI_COL_BASIC_INFO,
  SET_BI_RESULT_DATA,
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  datalist: [],
  resultData: {},
};

// getters
const getters = {
  // get data lsit
  getBiColBasicInfo(state) {
    return state.datalist;
  },
  getBiResultData(state) {
    return state.resultData;
  },
};

// mutations
const mutations = {
  // set data list
  [SET_BI_COL_BASIC_INFO](state, result) {
    state.datalist = result;
  },
  [SET_BI_RESULT_DATA](state, result) {
    state.resultData = result;
  },
};

const actions = {
  //search for future requiremet
  fetchCollegeWiseBasicBiInfo({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });

      Axios.get(CollegeWiseBasicBiInfoURL, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_BI_COL_BASIC_INFO", result);
          resolve(result);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },

  fetchBiResultData({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });

      Axios.get(BiResultDataURL, {
        params: searchParam,
      })
        .then(function(response) {
          console.log(response.data.data);
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_BI_RESULT_DATA", result);
          resolve(result);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          //   console.log(error);
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
