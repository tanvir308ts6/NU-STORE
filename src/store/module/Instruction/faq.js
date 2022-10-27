import Axios from "axios";
import { saveMsg, updateMsg, failedMsg } from "../../erpUtil";

import {
  INS_FAQ_EXAM_LIST,
  GET_FAQ_LIST,
  UN_SET_FAQ_LIST,
  GET_SINGLE_FAQ
} from "../../mutation-types";

import { faqDataApi, insFaqExamList } from "../../api";

const state = {
  insFaqExamList: [],
  faqList: [],
  schema: {
    id: "",
    exam_initiate_id: "",
    question: "",
    answer: "",
    user_id: "",
    user_type: "",
    question_date: "",
    answer_date: "",
    expire_date: "",
    student_panel: "",
    college_panel: "",
    college_user_panel: "",
    center_panel: "",
    examineer_panel: "",
    degree_code: "",
    degree_group_code: "",
    subject_code: "",
    status: ""
  }
};

const getters = {
  getInsFaqExamList(state) {
    return state.insFaqExamList;
  },
  getInsFaqList(state) {
    return state.faqList;
  },
  getSingleFaq(state) {
    return state.schema;
  }
};

const mutations = {
  [INS_FAQ_EXAM_LIST](state, result) {
    state.insFaqExamList = result;
  },
  [GET_FAQ_LIST](state, result) {
    state.faqList = result;
  },
  [UN_SET_FAQ_LIST](state) {
    state.faqList = [];
  },
  [GET_SINGLE_FAQ](state, result) {
    state.schema = result;
  }
};

const actions = {
  getInsFaqExamList({ commit }, SearchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(insFaqExamList)
        .then(function(response) {
          let result = response.data.data;
          commit("INS_FAQ_EXAM_LIST", result);
          commit("UNSET_LOADING");
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },
  getInsFaqList({ commit }, schema) {
    let data = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(faqDataApi, { params: data })
        .then(function(response) {
          let result = response.data.data;
          commit("GET_FAQ_LIST", result);
          commit("UNSET_LOADING");
          resolve(response.data.data);
        })
        .catch(function(error) {
          commit("UN_SET_FAQ_LIST");
          commit("UNSET_LOADING");
          //reject();
        });
    });
  },

  submitFaq({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(faqDataApi, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: saveMsg,
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

  updateFaq({ commit }, schema) {
    let data = schema;
    //const url = `${faqDataApi}/${data.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.put(faqDataApi + "/" + data.id, data)
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

  deleteFaq({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    const url = `${faqDataApi}/${data.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.delete(url, data)
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
