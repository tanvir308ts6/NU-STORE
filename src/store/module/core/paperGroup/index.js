import Axios from "axios";
import { PAPER_GROUP,UNSET_PAPER_GROUP, PAPER_GROUP_FORM_DATA } from "../../../mutation-types";
import { PaperGroup } from "../../../api";
import { saveMsg, updateMsg, failedMsg, deleteMsg } from "../../../erpUtil";

const state = {
  paperGroupList: [],
  schema: {
    id: "",
    subject_code: "",
    exam_code: "",
    name: "",
    number_of_paper: "",
    status: ""
  }
};

const getters = {
  getPaperGroupData(state) {
    return state.paperGroupList;
  },
  setPaperGroupData(state) {
    return state.schema;
  }
};

const mutations = {
  [PAPER_GROUP](state, result) {
    state.paperGroupList = result;
  },
  [UNSET_PAPER_GROUP](statet) {
    state.paperGroupList = [];
  },
  [PAPER_GROUP_FORM_DATA](state, result) {
    state.schema = result;
  }
};

const actions = {
  fetchCPaperGroupList({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      // commit("UNSET_PAPER_GROUP");
      Axios.get(PaperGroup, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("PAPER_GROUP", result);
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
  savePaperGroup({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(PaperGroup, data)
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

  updatePaperGroup({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    const url = `${PaperGroup}/${data.id}`;
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
  },

  deletePaperGroup({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    const url = `${PaperGroup}/${data.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.delete(url, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: deleteMsg,
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
