import Axios from "axios";
import {
  GET_RESCRUTINY_DATA,
  GET_RESCRUTINY_DETAIL_DATA,
  GET_RESCRUTINY_PAPER_DATA,
  UNSET_RESCRUTINY_PAPER_DATA,
  GET_RESULT_DATA,
  GET_RESULT_DETAIL_DATA,
  GET_CONSOLIDATED_RESULT,
  GET_CORRECTION_EXAMLIST,
  GET_CORRECTION_APPLIED_LIST,
  GET_RESULT_CORRECTION_DETAIL
} from "../../mutation-types";
import {
  GetRescrutinyExamList,
  applyRescrutiny,
  rescrutinyDetails,
  GetRescrutinyPaperList,
  getResultList,
  getResultDetail,
  downloadResultDetail,
  getConsolidatedResult,
  downloadConsolidateResult,
  ChangeStudentPasswordUrl,
  StudentInfoUpdatedUrl,
  correctionExamList,
  studentCorrectionApply,
  correctionAppliedList,
  resultCorrectionDetail
} from "../../api";
import { saveMsg, updateMsg } from "../../erpUtil";
import { failedMsg } from "../../erpUtil";

const state = {
  schema: [],
  paperList: [],
  detailList: [],
  resultList: [],
  resultDetailList: [],
  consolidateResult: [],
  correctionExamList: [],
  correctionAppliedList: [],
  correctionDetail: []
};

const getters = {
  getRescrunityExamList(state) {
    return state.schema;
  },
  getRescrunityPaperList(state) {
    return state.paperList;
  },
  getRescrunityDetailList(state) {
    return state.detailList;
  },
  getResultList(state) {
    return state.resultList;
  },
  getResultDetails(state) {
    return state.resultDetailList;
  },
  getConsolidatedResult(state) {
    return state.consolidateResult;
  }
};

const mutations = {
  [GET_RESCRUTINY_DATA](state, result) {
    state.schema = result;
  },
  [GET_RESCRUTINY_PAPER_DATA](state, result) {
    state.paperList = result;
  },
  [UNSET_RESCRUTINY_PAPER_DATA](state) {
    state.paperList = [];
  },
  [GET_RESCRUTINY_DETAIL_DATA](state, result) {
    state.detailList = result;
  },
  [GET_RESULT_DATA](state, result) {
    state.resultList = result;
  },
  [GET_RESULT_DETAIL_DATA](state, result) {
    state.resultDetailList = result;
  },
  [GET_CONSOLIDATED_RESULT](state, result) {
    state.consolidateResult = result;
  }
};

const actions = {
  fetchRescrunityExamList({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(GetRescrutinyExamList)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_RESCRUTINY_DATA", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },

  fetchRescrunityPaperist({ commit }, SearchParam) {
    let data = { result_id: SearchParam };
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(GetRescrutinyPaperList, { params: data })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("UNSET_RESCRUTINY_PAPER_DATA");
          commit("GET_RESCRUTINY_PAPER_DATA", result);
          resolve(result);
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          commit("UNSET_RESCRUTINY_PAPER_DATA");
          console.log(error);
          reject();
        });
    });
  },

  // save RecrunityPaper
  submitRescrunityPaper({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(applyRescrutiny, data)
        .then(function(response) {
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

  fetchRescrunityDetailsList({ commit }, SearchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(rescrutinyDetails, { params: SearchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_RESCRUTINY_DETAIL_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },
  //====================== results =========================

  fetchResultList({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(getResultList)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_RESULT_DATA", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },

  fetchResultDetailList({ commit }, resultId) {
    let results = { result_id: resultId };
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(getResultDetail, { params: results })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_RESULT_DETAIL_DATA", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },

  fetchConsolidatedResult({ commit, state }, schema) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(getConsolidatedResult, { params: schema })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_CONSOLIDATED_RESULT", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },

  exportResultDetailList({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios({
        url: getResultDetail,
        method: "GET",
        responseType: "arraybuffer",
        params: search
      })
        .then(response => {
          commit("UNSET_LOADING"); // loading Closing

          const fileURL = window.URL.createObjectURL(new Blob([response.data]));
          const fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "result_" + Date.now() + ".pdf");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(error => {
          console.log(error);
        });
    });
  },

  downloadResultDetails({ commit, state }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    var params = new URLSearchParams();
    let url = `${downloadResultDetail}`;
    return new Promise((resolve, reject) => {
      Axios.get(url, data)
        .then(response => {
          // console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "result_details.pdf"); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {})
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },

  downloadConsolidateResult({ commit, state }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    return new Promise((resolve, reject) => {
      Axios.get(downloadConsolidateResult, data)
        .then(response => {
          //console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "consolidate_result.pdf"); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {})
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },

  //Correction result
  

  ChangeStudentPassword({ commit, state }, data) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(ChangeStudentPasswordUrl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: "Change password Successful",
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
  StudentInfoUpdate({ commit, state }, data) {
    var params = new URLSearchParams();
    params.append("email", data.email);
    params.append("mobile", data.mobile);
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(StudentInfoUpdatedUrl, params)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_AUTH_STUDENT", data);
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
          console.log(error);
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
