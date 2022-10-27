import Axios from "axios";
import {
  GET_DEGREE_GROUP_DATA,
  SET_DEGREE_GROUP_FORM_DATA
} from "../../../mutation-types";
import { DegreeDataApi, DegreeGroupApi } from "../../../api";
import { saveMsg, updateMsg } from "../../../erpUtil";
import { failedMsg } from "../../../erpUtil";

const state = {
  degreeGroupList: [],
  schema: {
    id: "",
    degree_code: "",
    degree_group_code: "",
    degree_group_name: "",
    degree_group_title: "",
    status: 1
  }
};

const getters = {
  getDegreeGroupData(state) {
    return state.degreeGroupList;
  },
  degreeGroupFormData(state) {
    return state.schema;
  }
};

const mutations = {
  [GET_DEGREE_GROUP_DATA](state, result) {
    state.degreeGroupList = result;
  },
  [SET_DEGREE_GROUP_FORM_DATA](state, result) {
    state.schema = result;
  }
};

const actions = {
  fetchDegreeGroupList({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(DegreeGroupApi)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_DEGREE_GROUP_DATA", result);
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
  saveDegreeGroupData({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(DegreeGroupApi, data)
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

  updateDegreeGroupData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    const url = `${DegreeGroupApi}/${data.id}`;
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
