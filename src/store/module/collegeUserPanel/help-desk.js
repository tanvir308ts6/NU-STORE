import Axios from "axios";

import {
  CU_GET_ALL_NOTICE,
  CU_ALL_FAQ_LIST,
  CU_GET_GEN_INS
} from "../../mutation-types";

import { cuAllNotice, cuAllFaq, cuAllInstruction } from "../../api";

import { saveMsg, updateMsg, failedMsg } from "../../erpUtil";

const state = {
  noticeList: [],
  faqList: [],
  cuInstructions: []
};

const getters = {
  cuAllNotice(state) {
    return state.noticeList;
  },
  cuAllFaq(state) {
    return state.faqList;
  },
  cuInstructions(state) {
    return state.cuInstructions;
  }
};

const mutations = {
  [CU_GET_ALL_NOTICE](state, result) {
    state.noticeList = result;
  },
  [CU_ALL_FAQ_LIST](state, result) {
    state.faqList = result;
  },
  [CU_GET_GEN_INS](state, result) {
    state.cuInstructions = result;
  }
};

const actions = {
  cuAllNotice({ commit }, SearchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(cuAllNotice, { params: SearchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("CU_GET_ALL_NOTICE", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },
  cuAllFaq({ commit }, SearchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(cuAllFaq, { params: SearchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("CU_ALL_FAQ_LIST", result);
          resolve(result);
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },
  cuInstructions({ commit }, schema) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(cuAllInstruction, { params: schema })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("CU_GET_GEN_INS", result);
          resolve(result);
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
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
