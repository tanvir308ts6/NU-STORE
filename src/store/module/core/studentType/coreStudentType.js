import Axios from "axios";
import {
  STUDENT_TYPES,
  STUDENT_TYPES_FORM_DATA
} from "../../../mutation-types";
import { StudentType } from "../../../api";
import { saveMsg, updateMsg } from "../../../erpUtil";
import { failedMsg } from "../../../erpUtil";

const state = {
  studentTypeList: [],
  schema: {
    id: "",
    student_type: "",
    status: 1
  }
};

const getters = {
  getStudentTypeData(state) {
    return state.studentTypeList;
  },
  setStudentTypeData(state) {
    return state.schema;
  }
};

const mutations = {
  [STUDENT_TYPES](state, result) {
    state.studentTypeList = result;
  },
  [STUDENT_TYPES_FORM_DATA](state, result) {
    state.schema = result;
  }
};

const actions = {
  fetchCStudentTypeList({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(StudentType)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("STUDENT_TYPES", result);
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
  saveStudentType({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(StudentType, data)
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

  updateStudentType({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    const url = `${StudentType}/${data.id}`;
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
