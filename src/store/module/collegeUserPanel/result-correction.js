import Axios from "axios";
import {
  resultCorrectionApplicationList,
  applicationDetails,
  getStudentResult,
  approveApplicaiton,
  resultCorrectionList
} from "../../api";
import {
  GET_RESULT_CORRECTION_LIST,
  GET_STUDENT_RESULT,
  GET_APPLICATION_DETAIL_DATA
} from "../../mutation-types";
import {
  saveMsg,
  updateMsg,
  deleteMsg,
  failedMsg,
  sessionExpireMsg
} from "../../erpUtil";

const state = {
  resultCorrectionApplicationList: [],
  applicationDetails: [],
  getStudentResult: {}
};

const getters = {
  getResultCorrectionApplicationList(state) {
    return state.resultCorrectionApplicationList;
  },
  getApplicationDetails(state) {
    return state.applicationDetails;
  },
  getStudentResult(state) {
    return state.getStudentResult;
  }
};

const mutations = {
  [GET_RESULT_CORRECTION_LIST](state, result) {
    state.resultCorrectionApplicationList = result;
  },
  [GET_APPLICATION_DETAIL_DATA](state, result) {
    state.applicationDetails = result;
  },
  [GET_STUDENT_RESULT](state, result) {
    state.getStudentResult = result;
  }
};

const actions = {
  stdCustAppForCollege({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(resultCorrectionList)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_RESULT_CORRECTION_LIST", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },
  getResultCorrectionApplicationList({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(resultCorrectionApplicationList)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_RESULT_CORRECTION_LIST", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },
  getApplicationDetails({ commit }, application_id) {
    let results = { application_id: application_id };
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(applicationDetails, { params: results })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_APPLICATION_DETAIL_DATA", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },
  getStudentResult({ commit }, application_id) {
    let results = { application_id: application_id };
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(getStudentResult, { params: results })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_STUDENT_RESULT", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },

  approveApplication({ commit, state }, data) {
    //let results = { application_id: application_id };
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(approveApplicaiton, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
            resolve();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
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
