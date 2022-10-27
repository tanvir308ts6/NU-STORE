// axios
import Axios from "axios";

// apis
import { districtApi } from "@/store/api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_DISTRICT_LIST_DATA,
  ADD_DISTRICT_DATA,
  SET_DISTRICT_SCHEMA,
  UNSET_DISTRICT_SCHEMA
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    district_name: "",
    dist_code: "",
    old_dist_code: "",
    div_code: "",
    old_div_code: "",
    created_at: "",
    updated_at: "",
    deleted_at: ""
  },
  datalist: []
};

// getters
const getters = {
  // get data lsit
  getDistrictDataList(state) {
    return state.datalist;
  },
  getDistrictSchema(state) {
    return state.schema;
  }
};

// mutations
const mutations = {
  // set data list
  [SET_DISTRICT_LIST_DATA](state, result) {
    state.datalist = result;
  },
  // set item to datalist
  [ADD_DISTRICT_DATA](state, jschema) {
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
  [SET_DISTRICT_SCHEMA](state, schemaData) {
    state.schema = schemaData;
  },
  // unset form schema
  [UNSET_DISTRICT_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      district_name: "",
      dist_code: "",
      old_dist_code: "",
      div_code: "",
      old_div_code: "",
      created_at: "",
      updated_at: "",
      deleted_at: ""
    };
  }
};

const actions = {
  // get data list
  fetchDistrictData({ commit }, limit) {
    return new Promise(function(resolve, reject) {
      //let url = `${districtApi}?limit=${limit.limit}&page=${limit.page}&search=${limit.search}`;
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.get(districtApi, {
        params: limit
      })
        .then(function(response) {
          commit("UNSET_LOADING");
          var result = response.data.data;
          commit("SET_DISTRICT_LIST_DATA", result);
          // console.log("~~>", result);
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
  deleteDistrictItem({ commit }, item) {
    let url = `${districtApi}/${item}`;
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
  saveDistrictData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(districtApi, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("ADD_DISTRICT_DATA", schema);
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
  editDistrictData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${districtApi}/${data.id}`;
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
