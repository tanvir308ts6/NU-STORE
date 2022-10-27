// axios
import Axios from "axios";

// apis
import { LsCollFromCenterApi } from "../../api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_LS_COLL_FROM_CEN_DATA,
  ADD_LS_COLL_FROM_CENTER_DATA,
  SET_LS_COLL_FROM_CENTER_SCHEMA,
  UNSET_LS_COLL_FROM_CENTER_SCHEMA
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
    script_qty: "",
    date: "",
    reg_center_code: "",
    reg_center_name: "",
    exam_name: "",
    exam_code: "",
    status: 0,
    comment: "",
    exam_initiate_id: "",
    extra_packet_size: "",
    extra_quantity: "",
    main_packet_size: "",
    main_quantity: "",
    sender_id: "",
    total_packet: "",
    user_id: "",
    year: ""
  },
  datalist: []
};

// getters
const getters = {
  getLsCollFromCenterList(state) {
    return state.datalist;
  },
  // get data lsit
  getLsCollFromCenterList(state) {
    return state.datalist;
  },
  // get form schema
  getLsCollFromCenterSchema(state) {
    return state.schema;
  }
};

// mutations
const mutations = {
  // set data list
  [SET_LS_COLL_FROM_CEN_DATA](state, result) {
    state.datalist = result;
  },
  // set item to datalist
  [ADD_LS_COLL_FROM_CENTER_DATA](state, jschema) {
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
  [SET_LS_COLL_FROM_CENTER_SCHEMA](state, schemaData) {
    state.schema = schemaData;
  },
  // unset form schema
  [UNSET_LS_COLL_FROM_CENTER_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      loose_qty: "",
      script_qty: "",
      date: "",
      reg_center_code: "",
      reg_center_name: "",
      exam_name: "",
      exam_code: "",
      status: 0,
      comment: "",
      exam_initiate_id: "",
      extra_packet_size: "",
      extra_quantity: "",
      main_packet_size: "",
      main_quantity: "",
      sender_id: "",
      total_packet: "",
      user_id: "",
      year: ""
    };
  }
};

const actions = {
  // get data list
  fetchLsCollFromCenterData({ commit }) {
    return new Promise(function(resolve, reject) {
      Axios.get(LsCollFromCenterApi)
        .then(function(response) {
          var result = response.data.data;
          commit("SET_LS_COLL_FROM_CEN_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  //delete data
  deleteLsCollFromCenterItem({ commit }, item) {
    let url = `${LsCollFromCenterApi}/${item}`;
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
              msg: failedMsg,
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
  saveLsCollFromCenterData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    data["status"] = 0;
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(LsCollFromCenterApi, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("ADD_LS_COLL_FROM_CENTER_DATA", schema);
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: failedMsg,
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
  // edit/update data
  editLsCollFromCenterData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    console.log("DATA ACTION ", data);
    //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${LsCollFromCenterApi}/${data.id}`;
    //console.log(LsCollFromCenterApi + " bef url", url)

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
              msg: failedMsg,
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
