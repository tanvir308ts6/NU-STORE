// axios
import Axios from "axios";

// apis
import { usedScriptApi, usSummaryApi } from "../../api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_US_STATEMENT_DATA,
  SET_SUMMARY_DATA
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,

  datalist: [],
  summary: {}
};

// getters
const getters = {
  getUsStatementList(state) {
    return state.datalist;
  },
  getSummaryList(state) {
    return state.summary;
  }
};

// mutations
const mutations = {
  // set data list
  [SET_US_STATEMENT_DATA](state, result) {
    state.datalist = result;
  },
  [SET_SUMMARY_DATA](state, result) {
    state.summary = result;
  },
  // set item to datalist

  // set action process
  [SET_ACTION_PROCESS](state) {
    state.action_process = true;
  },
  // unset action process
  [UNSET_ACTION_PROCESS](state) {
    state.action_process = false;
  }
};

const actions = {
  // get data list
  fetchUsStatementData({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });

      Axios.get(usedScriptApi, {
        params: searchParam
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;

          commit("SET_US_STATEMENT_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing

          reject();
        });
    });
  },

  summaryData({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });

      Axios.get(usSummaryApi, {
        params: searchParam
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;

          commit("SET_SUMMARY_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing

          reject();
        });
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
