/* eslint-disable prettier/prettier */
// axios
import Axios from "axios";

// apis
import { VerifyTMS_Examiner } from "@/store/api";
// verify-tms-examiner
// mutation types
import {
  SET_VARIFIED_EXAMINER,
  // SET_ACTION_PROCESS,
  // UNSET_ACTION_PROCESS,
  // SET_TOKEN_VERIFY_DATA,
  // ADD_TOKEN_VERIFY_DATA,
  // SET_TOKEN_VERIFY_SCHEMA
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  varified_examiner: {
    status: false,
  },
  datalist: [],
};
// commit("SET_VARIFIED_EXAMINER", result);

// getters
const getters = {
  // get data lsit
  // getTokenVerifyDataList(state) {
  //   return state.datalist;
  // },
  // get form schema
  getVarifiedExaminer(state) {
    return state.varified_examiner;
  },
};

// mutations
const mutations = {
  // set data list

  [SET_VARIFIED_EXAMINER](state, result) {
    state.varified_examiner = result;
  },

  // [SET_TOKEN_VERIFY_DATA](state, result) {
  //   state.datalist = result;
  // },
  // // set item to datalist
  // [ADD_TOKEN_VERIFY_DATA](state, jschema) {
  //   state.datalist.push(jschema);
  // },
  // // set action process
  // [SET_ACTION_PROCESS](state) {
  //   state.action_process = true;
  // },
  // // unset action process
  // [UNSET_ACTION_PROCESS](state) {
  //   state.action_process = false;
  // },
  // // set form schema
  // [SET_TOKEN_VERIFY_SCHEMA](state, schemaData) {
  //   state.schema = schemaData;
  // }
};

const actions = {
  searchTokenData({ commit }, searchParam) {
    // console.log("search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(VerifyTMS_Examiner, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = {
            status: false,
          };
          if (response.data.data.length != 0) {
            result = response.data.data;
            result.status = true;
            result.message = "Examiner Verified";
            commit("SET_SNACKBAR", {
              msg: result.message,
              color: "green",
            });
          } else {
            result.message = "Examiner Not Verified";
            commit("SET_SNACKBAR", {
              msg: result.message,
              color: "red",
            });
          }

          commit("SET_VARIFIED_EXAMINER", result);

          resolve(response.data.data);
        })
        .catch(function(error) {
          commit("SET_SNACKBAR", {
            msg: response.data.message,
            color: "red",
          });
          // console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },

  saveTokenVerifyData({ commit }, schema) {
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
            commit("ADD_TOKEN_VERIFY_DATA", schema);
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
