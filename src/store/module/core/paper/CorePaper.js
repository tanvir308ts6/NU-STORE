import Axios from "axios";
import { GET_PAPER_DATA } from "../../../mutation-types";
import { PaperDataApi, customPaperSearch, CorePaperRegulationUpdate } from "../../../api";
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../../erpUtil";

const state = {
  paperList: [],
  schema: {
    id: "",
    paper_code: "",
    paper_name: "",
    paper_type: "",
    degree_code: "",
    degree_group_code: "",
    subject_code: "",
    exam_code: "",
    status: 1
  }
};

const getters = {
  getPaperData(state) {
    return state.paperList;
  }
};

const mutations = {
  [GET_PAPER_DATA](state, result) {
    state.paperList = result;
  }
};

const actions = {
  fetchPaperList({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(PaperDataApi, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_PAPER_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },
  CorePaperRegulationUpdate({ commit }, searchParam) {
    return new Promise(function (resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(CorePaperRegulationUpdate, searchParam)
        .then(function (response) {
          commit("SET_SNACKBAR", {
            msg: updateMsg,
            color: "green"
          });
          commit("UNSET_LOADING");

          resolve(response.data);
        })
        .catch(function (error) {
          commit("UNSET_LOADING");
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          console.log(error);
          reject();
        });
    });
  },

  fetchSearchData({ commit }, searchParam) {
    return new Promise(function (resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(customPaperSearch, searchParam)
        .then(function (response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_PAPER_DATA", result);
          resolve(response.data);
        })
        .catch(function (error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },

  // save data
  savePaperData({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(PaperDataApi, data)
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

  updatePaperData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    const url = `${PaperDataApi}/${data.id}`;
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
