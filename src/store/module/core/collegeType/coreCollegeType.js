import Axios from "axios";
import {
  COLLEGE_TYPES,
  COLLEGE_TYPES_FORM_DATA
} from "../../../mutation-types";
import { CollegeType } from "../../../api";
import { saveMsg, updateMsg } from "../../../erpUtil";
import { failedMsg } from "../../../erpUtil";

const state = {
  collegeTypeList: [],
  schema: {
    id: "",
    college_type: "",
    status: 1
  }
};

const getters = {
  getCollegeTypeData(state) {
    return state.collegeTypeList;
  },
  setCollegeType(state) {
    return state.schema;
  }
};

const mutations = {
  [COLLEGE_TYPES](state, result) {
    state.collegeTypeList = result;
  },
  [COLLEGE_TYPES_FORM_DATA](state, result) {
    state.schema = result;
  }
};

const actions = {
  fetchCollegeTypeList({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(CollegeType)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("COLLEGE_TYPES", result);
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
  saveCollegeType({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(CollegeType, data)
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

  updateCollegeType({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    const url = `${CollegeType}/${data.id}`;
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
