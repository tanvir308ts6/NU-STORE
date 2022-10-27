import Axios from "axios";
import {
  GET_CORRECTION_EXAMLIST,
  GET_CORRECTION_APPLIED_LIST,
  GET_RESULT_CORRECTION_DETAIL,
  GET_CORRECTION_PAPER_CODE,
  GET_CORRECTION_APP_CATEGORY
} from "../../mutation-types";

import {
  correctionExamList,
  studentCorrectionApply,
  studentCorrectionUpdate,
  correctionAppliedList,
  resultCorrectionDetail,
  resultCorrectionPaperCodes,
  resultCorrectionAppCategory,
  deletePaper
  
} from "../../api";

import { saveMsg, updateMsg, failedMsg } from "../../erpUtil";

const state = {
  correctionExamList: [],
  correctionpaperCodes: [],
  correctionAppCategory: [],
  correctionAppliedList: [],
  correctionDetail: []
};

const getters = {
  getCorrectionExamList(state) {
    return state.correctionExamList;
  },
  getCorrectionPaperCodes(state) {
    return state.correctionpaperCodes;
  },
  getCorrectionAppliedList(state) {
    return state.correctionAppliedList;
  },
  getResultCorrectionDetails(state) {
    return state.correctionDetail;
  },
  getCorrectionAppCategory(state) {
    return state.correctionAppCategory;
  }
};

const mutations = {
  [GET_CORRECTION_EXAMLIST](state, result) {
    state.correctionExamList = result;
  },
  [GET_CORRECTION_PAPER_CODE](state, result) {
    state.correctionpaperCodes = result;
  },
  [GET_CORRECTION_APP_CATEGORY](state, result) {
    state.correctionAppCategory = result;
  },
  [GET_CORRECTION_APPLIED_LIST](state, result) {
    state.correctionAppliedList = result;
  },
  [GET_RESULT_CORRECTION_DETAIL](state, result) {
    state.correctionDetail = result;
  }
};

const actions = {
  getCorrectionExam({ commit }, SearchParam) {
    //let data = { result_id: SearchParam };
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      //Axios.get(correctionExamList, { params: data })
      Axios.get(correctionExamList)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_CORRECTION_EXAMLIST", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },
  getCorrectionPaperCodes({ commit }, data) {
    //let data = { result_id: SearchParam };
    return new Promise(function (resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(resultCorrectionPaperCodes, { params: data })
        .then(function (response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_CORRECTION_PAPER_CODE", result);
          resolve();
        })
        .catch(function (error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },
  getCorrectionAppCategory({ commit }, data) {
    return new Promise(function (resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(resultCorrectionAppCategory)
        .then(function (response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_CORRECTION_APP_CATEGORY", result);
          resolve();
        })
        .catch(function (error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },

  submitCorrectionRequestToCollege({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(studentCorrectionApply, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
            resolve(response.data);
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

  editCorrection({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(studentCorrectionUpdate, data)
        .then(function (response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
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
        .catch(function (error) {
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

  deletePaper({ commit }, schema){
    let data = { id: schema};
    Axios.delete(deletePaper, { params: data});
  },

  getCorrectionAppliedList({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(correctionAppliedList)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_CORRECTION_APPLIED_LIST", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },

  getResultCorrectionDetails({ commit }, application_id) {
    let results = { application_id: application_id };
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(resultCorrectionDetail, { params: results })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_RESULT_CORRECTION_DETAIL", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
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
