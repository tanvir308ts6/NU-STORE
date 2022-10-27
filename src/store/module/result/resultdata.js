// axios
import Axios from "axios";

// apis
import { ResultApi,consolidateResultApi } from "../../api";

// mutation types
import { SET_RESULT_DATA,SET_CONSOLIDATE_RESULT_DATA } from "../../mutation-types";

const state = {
  schema: {
    id: "",
    examiner: "",
    mark_entry: "",
    mark_re_entry: "",
    script_qr_code: "",
    created_at: "",
    updated_at: "",
    deleted_at: ""
  },
  resultData: [],
  consolidateResultData: [],
};

// getters
const getters = {
  // get data lsit
  getResultData(state) {
    return state.resultData;
  },
  getConsolidateResultData(state) {
    return state.consolidateResultData;
  }
};

// mutations
const mutations = {
  // set data list
  [SET_RESULT_DATA](state, result) {
    state.resultData = result;
  },
  [SET_CONSOLIDATE_RESULT_DATA](state, result) {
    state.consolidateResultData = result;
  }
};

const actions = {
  // get data list
  fetchResultData({ commit, state }) {
    // console.log("ddsdsd");

    return new Promise(function(resolve, reject) {
      Axios.get(ResultApi)
        .then(function(response) {
          var result = response.data.data;
          commit("SET_RESULT_DATA", result);
          // return state.datalist;
          resolve(response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  searchResultData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(ResultApi, {
        params: searchParam
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_RESULT_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  searchConsolidateResultData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(consolidateResultApi, {
        params: searchParam
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_CONSOLIDATE_RESULT_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  searchMarks({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(MarksApi, {
        params: searchParam
      })
        // Axios.post(LogData, params)
        .then(function(response) {
          console.log("searchMarks:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("searchMarks--->", response.data.data);
          commit("SET_MARK_DATA", result);
          resolve();
        })
        .catch(function(error) {
          console.log("searchMarks: in catch ??");
          // commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
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
