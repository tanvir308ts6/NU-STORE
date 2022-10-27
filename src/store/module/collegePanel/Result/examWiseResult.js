import {
  getClgExamWiseResultUrl,
  getConsolidateResultUrl,
  getConsolidateResultDownloadPdfUrl,
  getClgExamWiseResultDownloadPdfUrl
} from "../../../api";
import {
  saveMsg,
  updateMsg,
  deleteMsg,
  failedMsg,
  college_token
} from "../../../erpUtil";
import {
  SET_COLLEGE_EXAM_WISE_RESULT,
  UNSET_COLLEGE_EXAM_WISE_RESULT,
  SET_COLLEGE_EXAM_WISE_CONSOLIDATE_RESULT,
  UNSET_COLLEGE_EXAM_WISE_CONSOLIDATE_RESULT
} from "../../../mutation-types";
import Axios from "axios";
const state = {
  ExamWiseResultForCollege: [],
  consolidate_result: []
};
const getters = {
  getClgExamWiseResult(state) {
    return state.ExamWiseResultForCollege;
  },
  getConsolidateResult(state) {
    return state.consolidate_result;
  }
};
const mutations = {
  [SET_COLLEGE_EXAM_WISE_RESULT](state, data) {
    state.ExamWiseResultForCollege = data;
  },
  [UNSET_COLLEGE_EXAM_WISE_RESULT](state) {
    state.ExamWiseResultForCollege = [];
  },
  [SET_COLLEGE_EXAM_WISE_CONSOLIDATE_RESULT](state, data) {
    state.consolidate_result = data;
  },
  [UNSET_COLLEGE_EXAM_WISE_CONSOLIDATE_RESULT](state) {
    state.consolidate_result = [];
  }
};
const actions = {
  getClgExamWiseResult({ commit, state }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    return new Promise((resolve, reject) => {
      Axios.get(getClgExamWiseResultUrl, data)
        .then(response => {
          var result = response.data.data;
          commit("SET_COLLEGE_EXAM_WISE_RESULT", result);
          resolve(response.data);
        })
        .catch(error => {
          commit("UNSET_COLLEGE_EXAM_WISE_RESULT");
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  getConsolidateResult({ commit, state }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    return new Promise((resolve, reject) => {
      Axios.get(getConsolidateResultUrl, data)
        .then(response => {
          var result = response.data.data;
          commit("SET_COLLEGE_EXAM_WISE_CONSOLIDATE_RESULT", result);
          resolve(response.data);
        })
        .catch(error => {
          commit("UNSET_COLLEGE_EXAM_WISE_CONSOLIDATE_RESULT");
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  getConsolidateResultDownloadPdf({ commit, state }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    var params = new URLSearchParams();
    let url = `${getConsolidateResultDownloadPdfUrl}`;
    return new Promise((resolve, reject) => {
      Axios.get(url, data)
        .then(response => {
          // console.log(response);
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
  getClgExamWiseResultDownloadPdf({ commit, state }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    var params = new URLSearchParams();
    let url = `${getClgExamWiseResultDownloadPdfUrl}`;
    return new Promise((resolve, reject) => {
      Axios.get(url, data)
        .then(response => {
          // console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "exam_wise_result.pdf"); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {})
        .then(always => {
          commit("UNSET_LOADING");
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
