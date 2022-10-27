import Axios from "axios";

import { SET_COL_STM_DATA_SUB_WISE } from "../../mutation-types";

import { CollegeSTMUrl_subWise } from "../../api";
/*import {
  failedMsg, loadMsg, saveMsg, updateMsg, deleteMsg
}from '../erpUtil'*/

// initial state

const state = {
  data: []
};
const getters = {
  getCollegeStm(state) {
    return state.data;
  }
};
// mutations
const mutations = {
  [SET_COL_STM_DATA_SUB_WISE](state, data) {
    state.data = data;
  }
};

// Actions
const actions = {
  fetchCollegeStm({ commit }, searchParam) {
    //
    console.log("searchParam->", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });

      Axios.get(CollegeSTMUrl_subWise, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_COL_STM_DATA_SUB_WISE", response.data);
          resolve();
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
