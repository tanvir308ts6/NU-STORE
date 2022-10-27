import Axios from "axios";

import { ExpelDataList_FetchUrl } from "@/store/api";

import {
  SET_EXPEL_DATA,
  SET_EXPEL_DATA_SCHEMA,
  UNSET_EXPEL_DATA_SCHEMA
} from "@/store/mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    reg_no: "",
    exam_code: "",
    paper_code: "",
    year: "",
    expel_date: "",
    punishment_start: "",
    punishment_end: "",
    remarks: ""
  },
  datalist: []
};

const getters = {
  getExpelDataList(state) {
    return state.datalist;
  },
  getExpelDataSchema(state) {
    return state.schema;
  }
};
const mutations = {
  [SET_EXPEL_DATA](state, result) {
    state.datalist = result;
  },
  [SET_EXPEL_DATA_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    // state.schema.regional_center_id = parseInt(state.schema.regional_center_id);
  },
  // unset form schema
  [UNSET_EXPEL_DATA_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      reg_no: "",
      exam_code: "",
      paper_code: "",
      year: "",
      expel_date: "",
      punishment_start: "",
      punishment_end: "",
      remarks: ""
    };
  }
};
const actions = {
  fetchExpelDataList({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.get(ExpelDataList_FetchUrl)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_EXPEL_DATA", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  deleteExpelItem({ commit }, deleteditemId) {
    console.log(" In action ", deleteditemId);
    const deleteurl = `${ExpelDataList_FetchUrl}/${deleteditemId}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.delete(deleteurl)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            commit("SET_SNACKBAR", {
              msg: deleteMsg,
              color: "green"
            });
            resolve("done");
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
          console.log("in state : ", error);
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        });
    });
  },
  saveExpelItem({ commit }, schema) {
    console.log("save");
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(ExpelDataList_FetchUrl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
            commit("UNSET_FORMNOTIFY");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message
            });
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        });
    });
  },

  editExpelItem({ commit }, schema) {
    let data = schema;
    const updateurl = `${ExpelDataList_FetchUrl}/${data.id}`;

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.put(updateurl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            commit("SET_SNACKBAR", {
              msg: updateMsg,
              color: "green"
            });
            commit("UNSET_FORMNOTIFY");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message
            });
            reject();
          }
        })
        .catch(function(error) {
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          commit("UNSET_LOADING"); // loading Closing
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
