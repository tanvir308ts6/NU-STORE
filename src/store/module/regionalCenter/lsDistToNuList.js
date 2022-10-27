// axios
import Axios from "axios";

// apis
import { RegLsDistToNuApi } from "@/store/api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_REG_LS_DIST_TO_NU_DATA,
  ADD_REG_LS_DIST_TO_NU_DATA,
  SET_REG_LS_DIST_TO_NU_SCHEMA,
  UNSET_REG_LS_DIST_TO_NU_SCHEMA
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    loose_qty: "",
    date: "",
    reg_center_code: "",
    center_code: "",
    main_packet_size: "",
    main_quantity: "",
    extra_packet_size: "",
    extra_quantity: "",
    total_packet: "",
    comment: "",
    sender_id: "",
    exam_initiate_id: "",
    exam_code: "",
    year: "",
    user_id: "",
    status: 0,
    created_at: "",
    updated_at: "",
    deleted_at: ""
  },
  datalist: []
};

// getters
const getters = {
  // get data lsit
  getRegLsDistToNuDataList(state) {
    return state.datalist;
  },
  // get form schema
  getRegLsDistToNuSchema(state) {
    return state.schema;
  }
};

// mutations
const mutations = {
  // set data list
  [SET_REG_LS_DIST_TO_NU_DATA](state, result) {
    state.datalist = result;
  },
  // set item to datalist
  [ADD_REG_LS_DIST_TO_NU_DATA](state, jschema) {
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
  [SET_REG_LS_DIST_TO_NU_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    state.schema.regional_center_id = schemaData.regional_center_id.toString();
    //state.schema.regional_center_id = parseInt(state.schema.regional_center_id);
  },
  // unset form schema
  [UNSET_REG_LS_DIST_TO_NU_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      loose_qty: "",
      date: "",
      reg_center_code: "",
      center_code: "",
      main_packet_size: "",
      main_quantity: "",
      extra_packet_size: "",
      extra_quantity: "",
      total_packet: "",
      comment: "",
      sender_id: "",
      exam_initiate_id: "",
      exam_code: "",
      year: "",
      user_id: "",
      status: "",
      created_at: "",
      updated_at: "",
      deleted_at: ""
    };
  }
};

const actions = {
  // get data list
  fetchRegLsDistToNuData({ commit }, limit) {
    return new Promise(function(resolve, reject) {
      let url = `${RegLsDistToNuApi}?limit=${limit.limit}&page=${limit.page}&search=${limit.search}`;
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.get(url)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("---->", result);
          commit("SET_REG_LS_DIST_TO_NU_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },
  // delete data
  deleteRegLsDistToNuItem({ commit }, item) {
    let url = `${RegLsDistToNuApi}/${item}`;
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
            //state.message = response.data.message
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
  saveRegLsDistToNuData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    data["status"] = 0;
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(RegLsDistToNuApi, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("ADD_REG_LS_DIST_TO_NU_DATA", schema);
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
  editRegLsDistToNuData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${RegLsDistToNuApi}/${data.id}`;
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
