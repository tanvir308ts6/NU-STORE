// axios
import Axios from "axios";

// apis
import { BsDistToRCApi } from "../../api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_BS_DIST_TO_RC_DATA,
  ADD_REG_BS_COLL_FROM_NU_DATA,
  SET_BS_DIST_TO_RC_SCHEMA,
  UNSET_BS_DIST_TO_RC_SCHEMA
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    reg_center_code: "",
    reg_center_name: "",
    main_packet_size: "",
    main_quantity: "",
    extra_packet_size: "",
    extra_quantity: "",
    total_packet: "",
    date: "",
    comment: "",
    sender_id: "",
    exam_initiate_id: "",
    exam_code: "",
    exam_name: "",
    year: "",
    user_id: "",
    user_name: "",
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
  getBsDistToRegCenList(state) {
    return state.datalist;
  },
  // get form schema
  getBsDistToRCSchema(state) {
    return state.schema;
  }
  // // get message
  // getRegBsCollFromNuMessage(editRegBsDistToCenData) {
  //   return state.message;
  // }
};

// mutations
const mutations = {
  // set data list
  [SET_BS_DIST_TO_RC_DATA](state, result) {
    state.datalist = result;
  },
  // set item to datalist
  // [ADD_REG_BS_COLL_FROM_NU_DATA](state, jschema) {
  //   state.datalist.push(jschema);
  // },
  // set message
  // [SET_MESSAGE](state, Msg) {
  //   state.message = Msg;
  // },
  // unset message
  // [UNSET_MESSAGE](state) {
  //   state.message = "";
  // },
  // set action process
  [SET_ACTION_PROCESS](state) {
    state.action_process = true;
  },
  // unset action process
  [UNSET_ACTION_PROCESS](state) {
    state.action_process = false;
  },
  // set form schema
  [SET_BS_DIST_TO_RC_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    // state.schema.regional_center_id = parseInt(state.schema.regional_center_id);
    //state.schema.exam_id = schemaData.exam_id.toString();
  },
  // unset form schema
  [UNSET_BS_DIST_TO_RC_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      reg_center_code: "",
      reg_center_name: "",
      main_packet_size: "",
      main_quantity: "",
      extra_packet_size: "",
      extra_quantity: "",
      total_packet: "",
      date: "",
      comment: "",
      sender_id: "",
      exam_initiate_id: "",
      exam_code: "",
      exam_name: "",
      year: "",
      user_id: "",
      user_name: "",
      status: 0,
      created_at: "",
      updated_at: "",
      deleted_at: ""
    };
  }
};

const actions = {
  // get data list
  callBsDistToRegCenData({ commit, state }, limit) {
    //console.log("state api ", limit.limit)
    let url = `${BsDistToRCApi}?limit=${limit.limit}&page=${limit.page}&search=${limit.search}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(url)
        .then(function(response) {
          commit("UNSET_LOADING");
          var result = response.data.data;
          commit("SET_BS_DIST_TO_RC_DATA", result);
          // return state.datalist;
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  // delete data
  deleteBsDistToRegCenItem({ commit, state }, item) {
    let url = `${BsDistToRCApi}/${item}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" });
      Axios.delete(url)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action delete");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            resolve(response.data.message);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
              timeout: 10000
            });
            reject(response.data.message);
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          console.log("in state : ", error);
          reject();
        });
    });
  },
  // save data ...
  saveRegBsCollFromNuData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    data["status"] = 0;
    // commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(BsDistToRCApi, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action save");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            commit("UNSET_FORMNOTIFY");
            resolve(response.data.message);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
              timeout: 10000
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message
            });
            reject(response.data.message);
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          console.log("in state : ", error);
          reject();
        });
    });
  },
  // edit/update data
  editBsDistToRegCenData({ commit, state }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${BsDistToRCApi}/${data.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" });
      Axios.put(url, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action edit");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            commit("UNSET_FORMNOTIFY");
            resolve(response.data.message);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
              timeout: 10000
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message
            });
            reject(response.data.message);
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          console.log("in state : ", error);
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
