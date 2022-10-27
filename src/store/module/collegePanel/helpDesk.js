import Axios from "axios";

import {
  GET_COLLEGE_NOTICE,
  GET_COLLEGE_FAQ,
  GET_COLLEGE_INSTRUCTION
} from "../../mutation-types";

import { collegeNotice, collegeFaq, collegeInstruction } from "../../api";

import { saveMsg, updateMsg, failedMsg } from "../../erpUtil";

const state = {
  noticeList: [],
  faqList: [],
  insList: []
};

const getters = {
  collegeNotice(state) {
    return state.noticeList;
  },
  collegeFaq(state) {
    return state.faqList;
  },
  collegeInstruction(state) {
    return state.insList;
  }
};

const mutations = {
  [GET_COLLEGE_NOTICE](state, result) {
    state.noticeList = result;
  },
  [GET_COLLEGE_FAQ](state, result) {
    state.faqList = result;
  },
  [GET_COLLEGE_INSTRUCTION](state, result) {
    state.insList = result;
  }
};

const actions = {
  collegeNotice({ commit }, SearchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(collegeNotice, { params: SearchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_COLLEGE_NOTICE", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },
  collegeFaq({ commit }, SearchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(collegeFaq, { params: SearchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_COLLEGE_FAQ", result);
          resolve(result);
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },
  collegeInstruction({ commit }, schema) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(collegeInstruction, { params: schema })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_COLLEGE_INSTRUCTION", result);
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
