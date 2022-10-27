import Axios from "axios";
import { GET_DEGREE_DATA, SET_DEGREE_FORM_DATA } from "../../../mutation-types";
import { DegreeDataApi, MenuListApi } from "../../../api";
import { saveMsg, updateMsg } from "../../../erpUtil";
import { failedMsg } from "../../../erpUtil";

const state = {
  degreeList: [],
  schema: {
    id: "",
    degree_code: "",
    degree_name: "",
    degree_title: "",
    status: 1
  }
};

const getters = {
  getDegreeData(state) {
    return state.degreeList;
  },
  degreeFormData(state) {
    return state.schema;
  }
};

const mutations = {
  [GET_DEGREE_DATA](state, result) {
    state.degreeList = result;
  },
  [SET_DEGREE_FORM_DATA](state, result) {
    state.schema = result;
  }
};

const actions = {
  fetchDegreeList({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(DegreeDataApi)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_DEGREE_DATA", result);
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
  saveDegreeData({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(DegreeDataApi, data)
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

  updateDegreeData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    const url = `${DegreeDataApi}/${data.id}`;
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
