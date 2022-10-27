import Axios from "axios";
import { resolve } from "path";
import {
  getCollegeExamMasterListUrl,
  getAllOpenExamMasterListUrl,
  getCollegeProbableListUrl,
  getCollegeDegreeWiseDegreeGroupUrl,
  getCollegeDegreeGroupWiseSubjectUrl,
  getCollegeProbableListPdfUrl,
  getCollegeProbableListExcelUrl,
  getCollegeAllDegreeGroupUrl,
  getCollegeAllSubjectUrl,
  downloadExamWiseAdmit,
  downloadExamWiseAttendanceSheet,
  downloadExamWiseDescriptiveRollSheet,
  examWiseAttendanceSheet,
  examWiseDescriptiveRollSheet
} from "../../../api";
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../../erpUtil";
import {
  UNSET_PROBABLE_LIST_SCHEMA,
  SET_ALL_OPEN_EXAM_MASTER_LIST,
  UNSET_ALL_OPEN_EXAM_MASTER_LIST,
  SET_EXAM_MASTER_LIST,
  UNSET_EXAM_MASTER_LIST,
  SET_PROBABLE_LIST,
  UNSET_PROBABLE_LIST,
  SET_DEGREE_GROUP,
  UNSET_DEGREE_GROUP,
  SET_All_DEGREE_GROUP,
  UNSET_All_DEGREE_GROUP,
  SET_SUBJECT,
  UNSET_SUBJECT,
  SET_All_SUBJECT,
  UNSET_All_SUBJECT
} from "../../../mutation-types";
const state = {
  probable_schema: {
    exam_initiate_id: null,
    degree_code: null,
    degree_group_code: null,
    subject_code: null
  },
  all_open_exam_master: [],
  exam_master: [],
  all_probable_list: [],
  degree_group: [],
  subjects: [],
  all_degree_group: [],
  all_subject: []
};
const getters = {
  getProbableSchema(state) {
    return state.probable_schema;
  },
  getAllOpenExamMasterList(state) {
    return state.all_open_exam_master;
  },
  getCollegeExamMasterList(state) {
    return state.exam_master;
  },
  getCollegeProbableList(state) {
    return state.all_probable_list;
  },
  getCollegeDegreeWiseDegreeGroup(state) {
    return state.degree_group;
  },
  getCollegeDegreeGroupWiseSubject(state) {
    return state.subjects;
  },
  getCollegeAllDegreeGroup(state) {
    return state.all_degree_group;
  },
  getCollegeAllSubject(state) {
    return state.all_subject;
  }
};
const mutations = {
  [UNSET_PROBABLE_LIST_SCHEMA](state) {
    state.probable_schema = {
      exam_initiate_id: null,
      degree_code: null,
      degree_group_code: null,
      subject_code: null
    };
  },
  [SET_ALL_OPEN_EXAM_MASTER_LIST](state, data) {
    state.all_open_exam_master = data;
  },
  [UNSET_ALL_OPEN_EXAM_MASTER_LIST](state) {
    state.all_open_exam_master = [];
  },
  [SET_EXAM_MASTER_LIST](state, data) {
    state.exam_master = data;
  },
  [UNSET_EXAM_MASTER_LIST](state) {
    state.exam_master = [];
  },
  [SET_PROBABLE_LIST](state, data) {
    state.all_probable_list = data;
  },
  [UNSET_PROBABLE_LIST](state) {
    state.all_probable_list = [];
  },
  [SET_DEGREE_GROUP](state, data) {
    state.degree_group = data;
  },
  [UNSET_DEGREE_GROUP](state) {
    state.degree_group = [];
  },
  [SET_SUBJECT](state, data) {
    state.subjects = data;
  },
  [UNSET_SUBJECT](state) {
    state.subjects = [];
  },
  [SET_All_DEGREE_GROUP](state, data) {
    state.all_degree_group = data;
  },
  [UNSET_All_DEGREE_GROUP](state) {
    state.all_degree_group = [];
  },
  [SET_All_SUBJECT](state, data) {
    state.all_subject = data;
  },
  [UNSET_All_SUBJECT](state) {
    state.all_subject = [];
  }
};
const actions = {
  getAllOpenExamMasterList({ commit, state }, search) {
    commit("SET_LOADING", { color: "primary" });
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams();
      params.append("search", search);
      Axios.get(getAllOpenExamMasterListUrl, params)
        .then(response => {
          var result = response.data.data;
          commit("SET_ALL_OPEN_EXAM_MASTER_LIST", result);
          resolve(response.data);
        })
        .catch(error => {
          commit("UNSET_ALL_OPEN_EXAM_MASTER_LIST");
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  getCollegeExamMasterList({ commit, state }, search) {
    commit("SET_LOADING", { color: "primary" });
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams();
      params.append("search", search);
      Axios.get(getCollegeExamMasterListUrl, params)
        .then(response => {
          var result = response.data.data;
          commit("SET_EXAM_MASTER_LIST", result);
          resolve(response.data);
        })
        .catch(error => {
          commit("UNSET_EXAM_MASTER_LIST");
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  getCollegeProbableList({ commit, state }) {
    commit("SET_LOADING", { color: "primary" });
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams();
      // params.append("search", search);
      Axios.get(getCollegeProbableListUrl, { params: state.probable_schema })
        .then(response => {
          var result = response.data.data;
          commit("SET_PROBABLE_LIST", result);
          resolve(response.data);
        })
        .catch(error => {
          commit("UNSET_PROBABLE_LIST");
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  getCollegeDegreeWiseDegreeGroup({ commit, state }) {
    commit("SET_LOADING", { color: "primary" });
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams();
      // params.append("exam_initiate_id", state.probable_schema.exam_initiate_id);
      params.append("degree_code", state.probable_schema.degree_code);
      Axios.get(getCollegeDegreeWiseDegreeGroupUrl, { params: params })
        .then(response => {
          var result = response.data.data;
          commit("SET_DEGREE_GROUP", result);
          resolve(response.data);
        })
        .catch(error => {
          commit("UNSET_DEGREE_GROUP");
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  getDegreeWiseDegreeGroup({ commit, state }, degree_code) {
    commit("SET_LOADING", { color: "primary" });
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams();
      // params.append("exam_initiate_id", state.probable_schema.exam_initiate_id);
      params.append("degree_code", degree_code);
      Axios.get(getCollegeDegreeWiseDegreeGroupUrl, { params: params })
        .then(response => {
          var result = response.data.data;
          commit("SET_DEGREE_GROUP", result);
          resolve(response.data);
        })
        .catch(error => {
          commit("UNSET_DEGREE_GROUP");
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  getCollegeDegreeGroupWiseSubject({ commit, state }) {
    commit("SET_LOADING", { color: "primary" });
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams();
      // params.append("exam_initiate_id", state.probable_schema.exam_initiate_id);
      params.append(
        "degree_group_code",
        state.probable_schema.degree_group_code
      );
      Axios.get(getCollegeDegreeGroupWiseSubjectUrl, { params: params })
        .then(response => {
          var result = response.data.data;
          commit("SET_SUBJECT", result);
          resolve(response.data);
        })
        .catch(error => {
          commit("UNSET_SUBJECT");
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  collegeProbableListDownloadPdf({ commit, state }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    var params = new URLSearchParams();
    let url = `${getCollegeProbableListPdfUrl}`;
    return new Promise((resolve, reject) => {
      Axios.get(url, data)
        .then(response => {
          // console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "file.pdf"); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {})
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  collegeProbableListDownloadExcel({ commit, state }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    return new Promise((resolve, reject) => {
      Axios.get(getCollegeProbableListExcelUrl, data)
        .then(response => {
          console.log("excel", response);
        })
        .catch(error => {})
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  getCollegeAllDegreeGroup({ commit, state }) {
    commit("SET_LOADING", {
      color: "primary"
    });
    var params = new URLSearchParams();
    let url = `${getCollegeAllDegreeGroupUrl}`;
    return new Promise((resolve, reject) => {
      Axios.get(url)
        .then(response => {
          var result = response.data.data;
          commit("SET_All_DEGREE_GROUP", result);
          resolve(response.data);
        })
        .catch(error => {
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  getCollegeAllSubject({ commit, state }) {
    commit("SET_LOADING", {
      color: "primary"
    });
    var params = new URLSearchParams();
    let url = `${getCollegeAllSubjectUrl}`;
    return new Promise((resolve, reject) => {
      Axios.get(url)
        .then(response => {
          var result = response.data.data;
          commit("SET_All_SUBJECT", result);
          resolve(response.data);
        })
        .catch(error => {
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  downloadExamWiseAdmit({ commit }, item) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(downloadExamWiseAdmit, {
        params: item
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("responseresponse", response.data.status);
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            // resolve(result);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            // reject();
          }

          // console.log("r", result);
          //commit("SET_ADMIT_CARD_COLLEGEWISE_DATA", result);
          resolve(result);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          reject();
        });
    });
  },
  downloadExamWiseAttendanceSheet({ commit }, item) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(downloadExamWiseAttendanceSheet, {
        params: item
      })
        .then(function(response) {
          commit("UNSET_LOADING");
          var result = response.data.data;
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            resolve(result);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            // reject();
          }
          resolve(result);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          reject();
        });
    });
  },

  downloadExamWiseDescriptiveRollSheet({ commit }, item) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(downloadExamWiseDescriptiveRollSheet, {
        params: item
      })
        .then(function(response) {
          commit("UNSET_LOADING");
          var result = response.data.data;
          console.log("result dekhi", result);
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            resolve(result);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            // reject();
          }
          resolve(result);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          reject();
        });
    });
  },

  // Download From admin panel
  examWiseAttendanceSheet({ commit }, item) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(examWiseAttendanceSheet, {
        params: item
      })
        .then(function(response) {
          commit("UNSET_LOADING");
          var result = response.data.data;
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            resolve(result);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            // reject();
          }
          resolve(result);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          reject();
        });
    });
  },

  examWiseDescriptiveRollSheet({ commit }, item) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(examWiseDescriptiveRollSheet, {
        params: item
      })
        .then(function(response) {
          commit("UNSET_LOADING");
          var result = response.data.data;
          console.log("result dekhi", result);
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            resolve(result);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            // reject();
          }
          resolve(result);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
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
