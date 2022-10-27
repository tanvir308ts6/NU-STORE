// axios
import Axios from "axios";

// apis
import { offDayApi } from "@/store/api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_OFFDAY_LIST_DATA,
  ADD_OFFDAY_DATA,
  SET_OFFDAY_SCHEMA,
  UNSET_OFFDAY_SCHEMA
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    date: "",
    exam_code: "",
    year: "",
    description: "",
    created_at: "",
    updated_at: "",
    deleted_at: ""
  },
  datalist: []
};

// getters
const getters = {
  // get data lsit
  getOffDayDataList(state) {
    return state.datalist;
  },
  getOffDaySchema(state) {
    return state.schema;
  }
};

// mutations
const mutations = {
  // set data list
  [SET_OFFDAY_LIST_DATA](state, result) {
    state.datalist = result;
  },
  // set item to datalist
  [ADD_OFFDAY_DATA](state, jschema) {
    state.datalist.push(jschema);
  },
  // set action process
  [SET_ACTION_PROCESS](state) {
    state.action_process = true;
  },
  // unset action process
  [UNSET_ACTION_PROCESS](state) {
    state.action_process = false;
  },
  // set form schema
  [SET_OFFDAY_SCHEMA](state, schemaData) {
    state.schema = schemaData;
  },
  // unset form schema
  [UNSET_OFFDAY_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      date: "",
      exam_code: "",
      year: "",
      description: "",
      created_at: "",
      updated_at: "",
      deleted_at: ""
    };
  }
};

const actions = {
  // get data list
  fetchOffDayData({ commit }, limit) {
    return new Promise(function(resolve, reject) {
      let url = `${offDayApi}?limit=${limit.limit}&page=${limit.page}&search=${limit.search}`;
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.get(url)
        .then(function(response) {
          commit("UNSET_LOADING");
          var result = response.data.data;
          commit("SET_OFFDAY_LIST_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  // delete data
  deleteOffDay({ commit }, item) {
    let url = `${offDayApi}/${item}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.delete(url)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
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
  // save data
  saveOffDayData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(offDayApi, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("ADD_OFFDAY_DATA", schema);
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
  // edit/update data
  editOffDayData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${offDayApi}/${data.id}`;
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
