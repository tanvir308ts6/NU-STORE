// axios
import Axios from "axios";

// apis
import { LsCollFromRegApi } from "../../api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_NU_LS_COLL_FROM_REG_DATA,
  ADD_NU_LS_COLL_FROM_REG_DATA,
  SET_NU_LS_COLL_FROM_REG_SCHEMA,
  UNSET_NU_LS_COLL_FROM_REG_SCHEMA
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
  // get data lsit
  getNuLsCollFromRCList(state) {
    return state.datalist;
  },
  // get form schema
  getNuLsCollFromRCSchema(state) {
    return state.schema;
  }
};

// mutations
const mutations = {
  // set data list
  [SET_NU_LS_COLL_FROM_REG_DATA](state, result) {
    state.datalist = result;
  },
  // set item to datalist
  [ADD_NU_LS_COLL_FROM_REG_DATA](state, jschema) {
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
  [SET_NU_LS_COLL_FROM_REG_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    state.schema.regional_center_id = parseInt(state.schema.regional_center_id);
    state.schema.exam_id = parseInt(state.schema.exam_id);
  },
  // unset form schema
  [UNSET_NU_LS_COLL_FROM_REG_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      loose_qty: "",
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
  // fetchNuLsCollFromRCData({ commit }, limit) {
  //   return new Promise(function(resolve, reject) {
  //     let url = `${LsCollFromRegApi}?limit=${limit.limit}&page=${limit.page}&search=${limit.search}`;
  //     commit("SET_LOADING", {
  //       color: "primary"
  //     }); // loading Opening
  //     Axios.get(url)
  //       .then(function(response) {
  //         commit("UNSET_LOADING"); // loading Closing
  //         var result = response.data.data;
  //         commit("SET_NU_LS_COLL_FROM_REG_DATA", result);
  //         resolve(response.data);
  //       })
  //       .catch(function(error) {
  //         // handle error
  //         console.log(error);
  //         commit("UNSET_LOADING"); // loading Closing
  //         reject();
  //       });
  //   });
  // },
  fetchNuLsCollFromRCData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.get(LsCollFromRegApi, {
        params: searchParam
      })
        .then(function(response) {
          commit("UNSET_LOADING");
          var result = response.data.data;
          commit("SET_NU_LS_COLL_FROM_REG_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },
  // delete data
  deleteNuLsCollFromRCItem({ commit }, item) {
    let url = `${LsCollFromRegApi}/${item}`;
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
  saveNuLsCollFromRCData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    data["status"] = 0;
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(LsCollFromRegApi, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("ADD_NU_LS_COLL_FROM_REG_DATA", schema);
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
  editNuLsCollFromRCData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    console.log("DATA ACTION ", data);
    //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${LsCollFromRegApi}/${data.id}`;
    //console.log(LsCollFromRegApi + " bef url", url)

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
