import Axios from "axios";
import { PAPER_TYPES, PAPER_TYPE_FORM_DATA } from "../../../mutation-types";
import { PaperType } from "../../../api";
import { saveMsg, updateMsg, failedMsg } from "../../../erpUtil";

const state = {
  paperTypeList: [],
  schema: {
    id: "",
    paper_type: "",
    status: ""
  }
};

const getters = {
  getPaperTypeData(state) {
    return state.paperTypeList;
  },
  setPaperTypeData(state) {
    return state.schema;
  }
};

const mutations = {
  [PAPER_TYPES](state, result) {
    state.paperTypeList = result;
  },
  [PAPER_TYPE_FORM_DATA](state, result) {
    state.schema = result;
  }
};

const actions = {
  fetchCPaperTypeList({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(PaperType)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("PAPER_TYPES", result);
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
  savePaperType({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(PaperType, data)
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

  updatePaperType({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    const url = `${PaperType}/${data.id}`;
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
