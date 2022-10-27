/* eslint-disable prettier/prettier */
// axios
import Axios from "axios";

// apis
import { CenLsDistToRegApi } from "@/store/api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_LS_DIST_TO_REG_DATA,
  ADD_LS_DIST_TO_REG_DATA,
  SET_LS_DIST_TO_REG_SCHEMA,
  UNSET_LS_DIST_TO_REG_SCHEMA,
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    // loose_qty: "",
    // date: "",
    // regional_center_id: "",
    // center_id: "",
    // exam_name: "",
    // status: 0,
    // exam_id: "",
    // comments: "",
    // created_at: "",
    // updated_at: "",
    // deleted_at: "",

    //new requirement after api done
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
    status: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
  },
  datalist: [],
};

// getters
const getters = {
  // get data lsit
  getCenLsDistToRegDataList(state) {
    return state.datalist;
  },
  // get form schema
  getCenLsDistToRegSchema(state) {
    return state.schema;
  },
};

// mutations
const mutations = {
  // set data list
  [SET_LS_DIST_TO_REG_DATA](state, result) {
    state.datalist = result;
  },
  // set item to datalist
  [ADD_LS_DIST_TO_REG_DATA](state, jschema) {
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
  [SET_LS_DIST_TO_REG_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    console.log("schema edit", state.schema);
    //state.schema.exam_id = schemaData.exam_id.toString();
    //state.schema.center_id = parseInt(state.schema.center_id);
    //state.schema.regional_center_id = parseInt(state.schema.regional_center_id);
  },
  // unset form schema
  [UNSET_LS_DIST_TO_REG_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      //   loose_qty: "",
      //   date: "",
      //   regional_center_id: "",
      //   center_id: "",
      //   exam_name: "",
      //   status: 0,
      //   exam_id: "",
      //   comments: "",
      //   created_at: "",
      //   updated_at: "",
      //   deleted_at: "",

      //new requirement after api
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
      status: "",
      created_at: "",
      updated_at: "",
      deleted_at: "",
    };
  },
};

const actions = {
  // get data list
  fetchCenLsDistToRegData({ commit }, limit) {
    return new Promise(function(resolve, reject) {
      let url = `${CenLsDistToRegApi}?limit=${limit.limit}&page=${limit.page}&search=${limit.search}`;
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(url)
        .then(function(response) {
          commit("UNSET_LOADING");
          var result = response.data.data;
          commit("SET_LS_DIST_TO_REG_DATA", result);
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
  deleteCenLsDistToRegItem({ commit }, item) {
    let url = `${CenLsDistToRegApi}/${item}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.delete(url)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: deleteMsg,
              color: "green",
            });
            resolve("done");
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          reject();
        });
    });
  },
  // save data
  saveCenLsDistToRegData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    data["status"] = 0;
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.post(CenLsDistToRegApi, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("ADD_LS_DIST_TO_REG_DATA", schema);
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green",
            });
            commit("UNSET_FORMNOTIFY");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message,
            });
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          reject();
        });
    });
  },
  // edit/update data
  editCenLsDistToRegData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${CenLsDistToRegApi}/${data.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.put(url, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: updateMsg,
              color: "green",
            });
            commit("UNSET_FORMNOTIFY");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message,
            });
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          console.log(error);
          reject();
        });
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
