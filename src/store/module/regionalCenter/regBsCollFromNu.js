// axios
import Axios from "axios";

// apis
import { RegBsCollFromNuApi } from "../../api";

// mutation types
import {
  SET_MESSAGE,
  UNSET_MESSAGE,
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_REG_BS_COLL_FROM_NU_DATA,
  ADD_REG_BS_COLL_FROM_NU_DATA,
  SET_REG_BS_COLL_FROM_NU_SCHEMA,
  UNSET_REG_BS_COLL_FROM_NU_SCHEMA
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
  getRegBsCollFromNuDataList(state) {
    return state.datalist;
  },
  // get form schema
  getRegBsCollFromNuSchema(state) {
    return state.schema;
  },
  // get message
  getRegBsCollFromNuMessage(state) {
    return state.message;
  }
};

// mutations
const mutations = {
  // set data list
  [SET_REG_BS_COLL_FROM_NU_DATA](state, result) {
    state.datalist = result;
  },
  // set item to datalist
  [ADD_REG_BS_COLL_FROM_NU_DATA](state, jschema) {
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
  [SET_REG_BS_COLL_FROM_NU_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    state.schema.reg_center_code = schemaData.reg_center_code.toString();
    state.schema.exam_code = schemaData.exam_code.toString();
    //state.schema.exam_code = parseInt(state.schema.exam_code);
  },
  // unset form schema
  [UNSET_REG_BS_COLL_FROM_NU_SCHEMA](state) {
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

  callRegBsCollFromNuData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(RegBsCollFromNuApi, {
        params: searchParam
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_REG_BS_COLL_FROM_NU_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  // delete data
  deleteRegBsCollFromNuItem({ commit, state }, item) {
    let url = `${RegBsCollFromNuApi}/${item}`;
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
  // save data  ...
  // saveRegBsCollFromNuData({ commit }, schema) {
  //   let data = schema;
  //   ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
  //   data["status"] = 0;
  //   // commit("SET_ACTION_PROCESS");
  //   return new Promise((resolve, reject) => {
  //     commit("SET_LOADING", { color: "primary" });
  //     Axios.post(RegBsCollFromNuApi, data)
  //       .then(function(response) {
  //         commit("UNSET_LOADING");
  //         if (response.data.status == "success") {
  //           console.log("in action save");
  //           commit("SET_SNACKBAR", {
  //             msg: response.data.message,
  //             color: "green"
  //           });
  //           resolve(response.data.message);
  //         } else {
  //           commit("SET_SNACKBAR", {
  //             msg: response.data.message,
  //             color: "red",
  //             timeout: 10000
  //           });
  //           reject(response.data.message);
  //         }
  //       })
  //       .catch(function(error) {
  //         commit("UNSET_LOADING"); // loading Closing
  //         commit("SET_SNACKBAR", {
  //           msg: failedMsg,
  //           color: "red"
  //         });
  //         console.log("in state : ", error);
  //         reject();
  //       });
  //   });
  // },
  // edit/update data
  editRegBsCollFromNuData({ commit, state }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${RegBsCollFromNuApi}/${data.id}`;
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
