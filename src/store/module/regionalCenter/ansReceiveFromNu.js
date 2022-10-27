/* eslint-disable prettier/prettier */
// axios
import Axios from "axios";

// apis
import {
  ansChalanwiseReceiveFromNu,
  ReceiveansChalanwiseReceiveFromNu,
} from "../../api";

// mutation types
import {
  SET_AS_REG_RECV_FROM_NU,
  UNSET_AS_REG_RECV_FROM_NU,
  SET_AS_REG_RECV_FROM_NU_SUMM,
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    script_qty: "",
    date: "",
    reg_center_code: "",
    reg_center_name: "",
    exam_name: "",
    exam_code: "",
    status: 0,
    created_at: "",
    updated_at: "",
    deleted_at: "",
    comment: "",
    exam_initiate_id: "",
    extra_packet_size: "",
    extra_quantity: 0,
    main_packet_size: "",
    main_quantity: "",
    sender_id: "",
    total_packet: "",
    user_id: "",
    year: "",
  },
  datalist: [],
  summdatalist: [],
};

// getters
const getters = {
  // get data lsit
  getRegAsCollFromNuData(state) {
    return state.datalist;
  },
  // get data lsit
  getRegAsCollFromNuSummData(state) {
    return state.summdatalist;
  },
};

// mutations
const mutations = {
  // set data list
  [SET_AS_REG_RECV_FROM_NU](state, result) {
    state.datalist = result;
  },
  // set data list
  [SET_AS_REG_RECV_FROM_NU_SUMM](state, result) {
    state.summdatalist = result;
  },
  // unset
  [UNSET_AS_REG_RECV_FROM_NU](state) {
    state.datalist = [];
  },
};

const actions = {
  // get data list
  fetchRegAsCollFromNuData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.get(ansChalanwiseReceiveFromNu, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_AS_REG_RECV_FROM_NU", result);
          var resultsum = response.data.summary;
          commit("SET_AS_REG_RECV_FROM_NU_SUMM", resultsum);
          // return state.datalist;
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

  // receive data
  receiveAnsScriptRcToNuRecieve({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(ReceiveansChalanwiseReceiveFromNu, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: response.data.message,
            color: "green",
            timeout: 10000,
          });
          resolve(response);
        })
        .catch(function(error) {
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
