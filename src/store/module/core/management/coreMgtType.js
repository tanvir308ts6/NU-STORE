import Axios from "axios";
import { MGT_TYPES, MGT_TYPES_FORM_DATA } from "../../../mutation-types";
import { CollegeMgtType } from "../../../api";
import { saveMsg, updateMsg } from "../../../erpUtil";
import { failedMsg } from "../../../erpUtil";

const state = {
  managementTypeList: [],
  schema: {
    id: "",
    mgt_type: "",
    status: 1
  }
};

const getters = {
  getMgtTypeList(state) {
    return state.managementTypeList;
  },
  setMgtType(state) {
    return state.schema;
  }
};

const mutations = {
  [MGT_TYPES](state, result) {
    state.managementTypeList = result;
  },
  [MGT_TYPES_FORM_DATA](state, result) {
    state.schema = result;
  }
};

const actions = {
  fetchMgtList({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(CollegeMgtType)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("MGT_TYPES", result);
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
  saveMgtType({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(CollegeMgtType, data)
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

  updateMgtType({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    const url = `${CollegeMgtType}/${data.id}`;
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
