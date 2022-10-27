import Axios from "axios";

import {
  CU_GET_FAQ_LIST,
  CU_UN_SET_FAQ_LIST,
  CU_FAQ_EXAM_LIST,
  CU_SINGLE_FAQ
} from "../../mutation-types";

import {
  cuFaqList,
  cuSubmitQuestion,
  cuUpdateQuestion,
  cuDeleteFaq,
  cuFaqExamList
} from "../../api";

import { saveMsg, updateMsg, failedMsg } from "../../erpUtil";

const state = {
  cuFaqList: [],
  cuFaqExamList: [],
  schema: {
    id: "",
    exam_initiate_id: "",
    question: ""
  }
};

const getters = {
  cuFaqList(state) {
    return state.cuFaqList;
  },
  cuFaqExamList(state) {
    return state.cuFaqExamList;
  },
  cuSingleFaq(state) {
    return state.schema;
  }
};

const mutations = {
  [CU_GET_FAQ_LIST](state, result) {
    state.cuFaqList = result;
  },
  [CU_FAQ_EXAM_LIST](state, result) {
    state.cuFaqExamList = result;
  },
  [CU_UN_SET_FAQ_LIST](state) {
    state.cuFaqList = [];
  },
  [CU_SINGLE_FAQ](state, result) {
    state.schema = result;
  }
};

const actions = {
  cuFaqList({ commit }) {
    commit("CU_UN_SET_FAQ_LIST");
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(cuFaqList)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("CU_GET_FAQ_LIST", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },

  cuFaqExamList({ commit }, SearchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(cuFaqExamList)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("CU_FAQ_EXAM_LIST", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },

  cuSubmitQuestion({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" }); // loading Opening
      Axios.post(cuSubmitQuestion, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
            resolve(response.data);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        });
    });
  },

  cuUpdateQuestion({ commit }, schema) {
    let data = schema;
    //const url = `${faqDataApi}/${data.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.put(cuUpdateQuestion, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: updateMsg,
              color: "green"
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          console.log(error);
          reject();
        });
    });
  },

  cuDeleteFaq({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.delete(cuDeleteFaq, { params: schema })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
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
