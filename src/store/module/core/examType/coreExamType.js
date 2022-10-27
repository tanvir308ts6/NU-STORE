import Axios from "axios";
import { EXAM_TYPES, EXAM_TYPES_FORM_DATA } from "../../../mutation-types";
import { ExamType } from "../../../api";
import { saveMsg, updateMsg } from "../../../erpUtil";
import { failedMsg } from "../../../erpUtil";

const state = {
  examTypeList: [],
  schema: {
    id: "",
    paper_type: "",
    status: 1
  }
};

const getters = {
  getExamTypeData(state) {
    return state.examTypeList;
  },
  setExamTypeData(state) {
    return state.schema;
  }
};

const mutations = {
  [EXAM_TYPES](state, result) {
    state.examTypeList = result;
  },
  [EXAM_TYPES_FORM_DATA](state, result) {
    state.schema = result;
  }
};

const actions = {
  fetchCExamTypeList({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(ExamType)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          console.log(result);
          commit("EXAM_TYPES", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },

  // save data
  saveExamType({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(ExamType, data)
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

  updateExamType({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    const url = `${ExamType}/${data.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.put(url, data)
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
