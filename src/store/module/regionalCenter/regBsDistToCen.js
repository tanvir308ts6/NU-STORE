// axios
import Axios from "axios";

// apis
import { RegBsDistToCenApi } from "../../api";

// mutation types
import {
  SET_MESSAGE,
  UNSET_MESSAGE,
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_REG_BS_DIST_TO_CEN_DATA,
  ADD_REG_BS_DIST_TO_CEN_DATA,
  SET_REG_BS_DIST_TO_CEN_SCHEMA,
  UNSET_REG_BS_DIST_TO_CEN_SCHEMA
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    main_qty: "",
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
  getRegBsDistToCenDataList(state) {
    return state.datalist;
  },
  // get form schema
  getRegBsDistToCenSchema(state) {
    return state.schema;
  },
  // get message
  getRegBsDistToCenMessage(state) {
    return state.message;
  }
};

// mutations
const mutations = {
  // set data list
  [SET_REG_BS_DIST_TO_CEN_DATA](state, result) {
    state.datalist = result;
  },
  // set item to datalist
  [ADD_REG_BS_DIST_TO_CEN_DATA](state, jschema) {
    state.datalist.push(jschema);
  },
  // set message
  [SET_MESSAGE](state, Msg) {
    state.message = Msg;
  },
  // unset message
  [UNSET_MESSAGE](state) {
    state.message = "";
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
  [SET_REG_BS_DIST_TO_CEN_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    //state.schema.exam_id = schemaData.exam_id.toString();
    //state.schema.regional_center_id = schemaData.regional_center_id.toString();
    //state.schema.center_id = schemaData.center_id.toString();
  },
  // unset form schema
  [UNSET_REG_BS_DIST_TO_CEN_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      main_qty: "",
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
    };
  }
};

const actions = {
  // get data list

  // { commit }, searchParam

  callRegBsDistToCenData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(RegBsDistToCenApi, {
        params: searchParam
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_REG_BS_DIST_TO_CEN_DATA", result);
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
  deleteRegBsDistToCenItem({ commit, state }, item) {
    let url = `${RegBsDistToCenApi}/${item}`;
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
          commit("UNSET_LOADING");
          commit("SET_SNACKBAR", {
            msg: "Data Did Not delete, Please recheck",
            color: "pink"
          });
          reject(error);
        });
    });
  },
  // save data
  saveRegBsDistToCenData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    data["status"] = 0;
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(RegBsDistToCenApi, data)
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
          commit("UNSET_LOADING");
          commit("SET_SNACKBAR", {
            msg: "Data Did Not Save, Please recheck",
            color: "pink"
          });
          reject(error);
        });
    });
  },
  // edit/update data
  editRegBsDistToCenData({ commit, state }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${RegBsDistToCenApi}/${data.id}`;
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
          commit("UNSET_LOADING");
          commit("SET_SNACKBAR", {
            msg: "Data Did Not Edit, Please recheck",
            color: "pink"
          });
          reject(error);
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
