import Axios from "axios";

import {
  STU_GET_ALL_NOTICE,
  STU_GET_FAQ_LIST,
  STU_GET_GEN_INS
} from "../../mutation-types";

import { stuAllNotice, stuFaqList, stuGenIns } from "../../api";

import { saveMsg, updateMsg, failedMsg } from "../../erpUtil";

const state = {
  noticeList: [],
  faqList: [],
  stuGeneralInstruction: []
};

const getters = {
  stuNoticeList(state) {
    return state.noticeList;
  },
  stuFaqList(state) {
    return state.faqList;
  },
  stuGeneralInstruction(state) {
    return state.stuGeneralInstruction;
  }
};

const mutations = {
  [STU_GET_ALL_NOTICE](state, result) {
    state.noticeList = result;
  },
  [STU_GET_FAQ_LIST](state, result) {
    state.faqList = result;
  },
  [STU_GET_GEN_INS](state, result) {
    state.stuGeneralInstruction = result;
  }
};

const actions = {
  stuNoticeList({ commit }, SearchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(stuAllNotice, { params: SearchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("STU_GET_ALL_NOTICE", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },
  stuFaqList({ commit }, SearchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(stuFaqList, { params: SearchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("STU_GET_FAQ_LIST", result);
          resolve(result);
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },
  stuGeneralInstruction({ commit }, schema) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(stuGenIns, { params: schema })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("STU_GET_GEN_INS", result);
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
