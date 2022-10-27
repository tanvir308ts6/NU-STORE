import Axios from "axios";
import {
  GET_EXAM_FEE_HEAD_LIST,
  SET_EXAM_FEE_HEAD_SCHEMA
} from "../../../mutation-types";
import { CoreExamFeeHeadUrl } from "../../../api";
import { saveMsg, updateMsg, failedMsg } from "../../../erpUtil";

const state = {
  examFeeHeadList: [],
  schema: {
    id: "",
    fee_title: "",
    fee_type: "",
    credit: "",
    amount: "",
    status: 1
  }
};

const getters = {
  getExamFeeHeadData(state) {
    return state.examFeeHeadList;
  },
  setExamFeeHeadData(state) {
    return state.schema;
  }
};

const mutations = {
  [GET_EXAM_FEE_HEAD_LIST](state, result) {
    state.examFeeHeadList = result;
  },
  [SET_EXAM_FEE_HEAD_SCHEMA](state, result) {
    state.schema = result;
  }
};

const actions = {
  fetchCoreExamFeeHeadList({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(CoreExamFeeHeadUrl)
        .then(function(response) {
          let result = response.data.data;
          commit("GET_EXAM_FEE_HEAD_LIST", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  // save data
  saveCoreExamFeeHead({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(CoreExamFeeHeadUrl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.code == 200) {
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
            resolve();
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
  updateCoreExamFeeHead({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    const url = `${CoreExamFeeHeadUrl}/${data.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.put(url, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.code == 200) {
            commit("SET_SNACKBAR", {
              msg: updateMsg,
              color: "green"
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
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
