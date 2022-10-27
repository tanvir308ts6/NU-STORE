import Axios from "axios";
import {
  GET_FORM_FILLUP_INFO,
  GET_FORM_FILLUP_DETAILS,
  GET_FORM_FILLUP_SLOT_DETAILS,
  GET_FORM_FILLUP_STUDENT_DETAILS,
  GET_PROBABLE_COLLEGE_WISE_DETAILS,
  GET_PROBABLE_SUBJECT_WISE_DETAILS,
  GET_PROBABLE_PAPER_WISE_DETAILS,
  GET_EXAM_WISE_SUBJECTS,
  GET_EXAM_WISE_PAPERS,
  GET_EXAM_WISE_COLLEGES,
  GET_EXAM_WISE_SESSION
} from "../../mutation-types";
import {
  deleteProbableSlot,
  detailsProbable,
  confirmProbableSlot,
  probableSlotStatus,
  detailSlotWiseProbable,
  formFillUpInfo,
  probableStudentDetails,
  ProbableCollegeWise,
  ProbableSubjectWise,
  ProbablePaperWise,
  GetExamColleges,
  GetExamSubjects,
  GetExamPapers,
  GetExamSession
} from "../../api";
import { deleteMsg, failedMsg } from "../../erpUtil";

const state = {
  formFillUpInfo: {},
  schema: [],
  slotDetails: [],
  studentDetails: [],
  collegeWise: [],
  subjectWise: [],
  paperWise: [],
  getColleges: [],
  getSubjects: [],
  getPapers: [],
  getSessions: []
};

const getters = {
  getFormFillupInfo(state) {
    return state.formFillUpInfo;
  },
  getFormFillupDetailList(state) {
    return state.schema;
  },
  getProbableDetails(state) {
    return state.slotDetails;
  },
  getProbableStudentDetails(state) {
    return state.studentDetails;
  },
  getProbableCollegeWiseDetails(state) {
    return state.collegeWise;
  },
  getProbableSubjectWiseWiseDetails(state) {
    return state.subjectWise;
  },
  getProbablePaperWiseWiseDetails(state) {
    return state.paperWise;
  },
  getSearchParamCollege(state) {
    return state.getColleges;
  },
  getSearchParamSubject(state) {
    return state.getSubjects;
  },
  getSearchParamPapers(state) {
    return state.getPapers;
  },
  getSearchParamSession(state) {
    return state.getSessions;
  }
};

const mutations = {
  //get data from api
  [GET_FORM_FILLUP_INFO](state, result) {
    state.formFillUpInfo = result;
  },
  [GET_FORM_FILLUP_DETAILS](state, result) {
    state.schema = result;
  },
  [GET_FORM_FILLUP_SLOT_DETAILS](state, result) {
    state.slotDetails = result;
  },
  [GET_FORM_FILLUP_STUDENT_DETAILS](state, result) {
    state.studentDetails = result;
  },
  [GET_PROBABLE_COLLEGE_WISE_DETAILS](state, result) {
    state.collegeWise = result;
  },
  [GET_PROBABLE_SUBJECT_WISE_DETAILS](state, result) {
    state.subjectWise = result;
  },
  [GET_PROBABLE_PAPER_WISE_DETAILS](state, result) {
    state.paperWise = result;
  },
  [GET_EXAM_WISE_SUBJECTS](state, result) {
    state.getSubjects = result;
  },
  [GET_EXAM_WISE_PAPERS](state, result) {
    state.getPapers = result;
  },
  [GET_EXAM_WISE_COLLEGES](state, result) {
    state.getColleges = result;
  },
  [GET_EXAM_WISE_SESSION](state, result) {
    state.getSessions = result;
  }
};

const actions = {
  getFormFillInfo({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(formFillUpInfo, { params: search })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data;
          //console.log(result);
          commit("GET_FORM_FILLUP_INFO", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          // console.log(error);
          commit("UNSET_LOADING");
          reject();
        });
    });
  },
  fetchProbableDetails({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(detailsProbable, { params: search })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(result);
          commit("GET_FORM_FILLUP_DETAILS", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  fetchProbableSlotDetailData({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(detailSlotWiseProbable, { params: search })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(result);
          commit("GET_FORM_FILLUP_SLOT_DETAILS", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  fetchProbableStudentDetailData({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(probableStudentDetails, { params: search })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(result);
          commit("GET_FORM_FILLUP_STUDENT_DETAILS", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          // console.log(error);
          commit("UNSET_LOADING");
          reject();
        });
    });
  },

  // ================= search wizard for report summery ====================
  fetchExamWiseColleges({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(GetExamColleges, { params: search })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_EXAM_WISE_COLLEGES", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  fetchExamWiseSubjects({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(GetExamSubjects, { params: search })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(result);
          commit("GET_EXAM_WISE_SUBJECTS", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  fetchExamWisePapers({ commit }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(GetExamPapers, { params: search })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_EXAM_WISE_PAPERS", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  fetchExamWiseSession({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(GetExamSession, { params: search })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(result);
          commit("GET_EXAM_WISE_SESSION", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  //=============== end search wizard ==========================

  fetchProbableCollegeWiseDetailData({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(ProbableCollegeWise, { params: search })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          // console.log(result);
          commit("GET_PROBABLE_COLLEGE_WISE_DETAILS", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  exportProbableCollegeWise({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios({
        url: ProbableCollegeWise,
        method: "GET",
        responseType: "arraybuffer",
        params: search
      })
        .then(response => {
          commit("UNSET_LOADING"); // loading Closing

          const fileURL = window.URL.createObjectURL(new Blob([response.data]));
          const fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "college_" + Date.now() + ".pdf");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(error => {
          console.log(error);
        });
    });
  },

  fetchProbableSubjectWiseDetailData({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(ProbableSubjectWise, { params: search })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(result);
          commit("GET_PROBABLE_SUBJECT_WISE_DETAILS", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  exportProbableSubjectWise({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios({
        url: ProbableSubjectWise,
        method: "GET",
        responseType: "arraybuffer",
        params: search
      })
        .then(response => {
          commit("UNSET_LOADING"); // loading Closing

          const fileURL = window.URL.createObjectURL(new Blob([response.data]));
          const fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "subject_" + Date.now() + ".pdf");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(error => {
          console.log(error);
        });
    });
  },

  fetchProbablePaperWiseDetailData({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(ProbablePaperWise, { params: search })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(result);
          commit("GET_PROBABLE_PAPER_WISE_DETAILS", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  exportProbablePaperWise({ commit, state }, schema) {
    const search = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios({
        url: ProbablePaperWise,
        method: "GET",
        responseType: "arraybuffer",
        params: search
      })
        .then(response => {
          commit("UNSET_LOADING"); // loading Closing

          const fileURL = window.URL.createObjectURL(new Blob([response.data]));
          const fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "paper_" + Date.now() + ".pdf");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(error => {
          console.log(error);
        });
    });
  },

  // confirm slot wise probable data
  confirmProbableData({ commit }, schema) {
    const data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(confirmProbableSlot, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: "Data confirm successfully",
              color: "green"
            });
            resolve("done");
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

  // delete slot wise probable data
  deleteProbableData({ commit }, schema) {
    const data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.delete(deleteProbableSlot, { params: data })
        .then(function(response) {
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: deleteMsg,
              color: "green"
            });
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
          }
          resolve(response);
        })
        .catch(function(error) {
          console.log(error);

          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject(error);
        })
        .then(() => {
          commit("UNSET_LOADING"); // loading Closing
        });
    });
  },

  //probable status update
  probableDataStatusUpdate({ commit }, schema) {
    const data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(probableSlotStatus, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.code == 200) {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
          }
          resolve(response);
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
