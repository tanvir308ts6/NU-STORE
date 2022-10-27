import Axios from "axios";
import { saveMsg, updateMsg, failedMsg } from "../../erpUtil";

import {
  GET_INSTRUCTION_LIST,
  UN_SET_INSTRUCTION_LIST,
  GET_SINGLE_INSTRUCTION
} from "../../mutation-types";

import { instructionDataApi } from "../../api";

const state = {
  instructionList: [],
  schema: {
    id: "",
    instruction: "",
    display_type: "",
    instruction_type: "",
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
  getInstructionList(state) {
    return state.instructionList;
  },
  getSingleInstruction(state) {
    return state.schema;
  }
};

const mutations = {
  [GET_INSTRUCTION_LIST](state, result) {
    state.instructionList = result;
  },
  [UN_SET_INSTRUCTION_LIST](state) {
    state.instructionList = [];
  },
  [GET_SINGLE_INSTRUCTION](state, result) {
    state.schema = result;
  }
};

const actions = {
  getInstructionList({ commit }, schema) {
    let data = schema;
    console.log(data);
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(instructionDataApi, { params: data })
        .then(function(response) {
          let result = response.data.data;
          commit("GET_INSTRUCTION_LIST", result);
          commit("UNSET_LOADING");
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UN_SET_INSTRUCTION_LIST");
          commit("UNSET_LOADING");
          //reject();
        });
    });
  },

  submitInstruction({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(instructionDataApi, data)
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

  updateInstruction({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.put(instructionDataApi + "/" + data.id, data)
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

  deleteInstruction({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    const url = `${instructionDataApi}/${data.id}`;
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
