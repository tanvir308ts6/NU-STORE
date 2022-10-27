import Axios from "axios";
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "./../erpUtil";
import {
  GET_ALL_COLLEGE,
  GET_ALL_DEGREE,
  GET_ALL_DEGREE_GROUP,
  GET_ALL_SUBJECT,
  GET_ALL_PAPER,
  GET_ALL_EXAMS,
  GET_PAPER_TYPE,
  GET_PAPER_TYPE_INFO,
  GET_EXAM_YEAR,
  GET_EXAM_TYPE,
  GET_AC_SESSION,
  SET_RETURN_MESSAGE,
  UNSET_RETURN_MESSAGE,
  SET_DIVISION_DATA,
  SET_DISTRICT_DATA,
  SET_THANA_DATA,
  GET_ALL_GROUP_BY_SUBJECT,
  GET_COURSE_EXAM_WISE,
  UN_SET_COURSE_EXAM_WISE,
  GET_EXAM_CANDIDATE_TYPE,
  SET_SUBJECT_WISE_PAPER_GROUP,
  UNSET_SUBJECT_WISE_PAPER_GROUP
} from "../mutation-types";

import {
  GetAllCollege,
  GetAllDegree,
  GetAllDegreeGroup,
  GetAllSubject,
  GetAllPaper,
  GetAllExams,
  GetAllPaperType,
  GetAllPaperInfo,
  GetAllPaperGroup,
  GetAllExamType,
  GetAllAcSession,
  GetAllExam,
  Asset_Url,
  DivisionsList,
  DistrictsList,
  ThanasList,
  GetAllGroupBySubject,
  GetAllExamByCourse,
  GetCandidateType,
  examWiseDegreeGroup
} from "../api";

const state = {
  collegeLists: [],
  degreeLists: [],
  degreeGroupLists: [],
  subjectLists: [],
  subjectGroupLists: [],
  paperLists: [],
  examsLists: [],
  courseLists: [],
  paperTypeInfo: [],
  paperTypeLists: [],
  candidateTypeList: [],
  examTypeLists: [],
  divisions: [],
  districts: [],
  thanas: [],
  acSession: [],
  examYearData: [],
  getSubjectWisePaperGroup: [],
  examFeeType: [
    { value: "per_paper", text: "Per Paper" },
    { value: "per_student", text: "Per Student" },
    { value: "per_exam", text: "Per Exam" }
  ],
  return_message: null
};
const getters = {
  getAllCollege(state) {
    return state.collegeLists;
  },
  getAllDegree(state) {
    return state.degreeLists;
  },
  getAllDegreeGroup(state) {
    return state.degreeGroupLists;
  },
  getAllSubject(state) {
    return state.subjectLists;
  },
  getAllSubjectGroup(state) {
    return state.subjectGroupLists;
  },
  getAllPaper(state) {
    return state.paperLists;
  },
  getAllExams(state) {
    return state.examsLists;
  },
  getAllPaperType(state) {
    return state.paperTypeLists;
  },
  getAllPaperTypeInfo(state) {
    return state.paperTypeInfo;
  },
  getPaperGroup(state) {
    return state.paperGroup;
  },
  getAllExamType(state) {
    return state.examTypeLists;
  },
  getAcSessionData(state) {
    return state.acSession;
  },
  getAllExamYear(state) {
    return state.examYearData;
  },
  getExamFeeType(state) {
    return state.examFeeType;
  },
  getCandidateType(state) {
    return state.candidateTypeList;
  },
  getAssetUrl() {
    return Asset_Url;
  },
  getReturnMessage(state) {
    return state.return_message;
  },

  getDivision(state) {
    return state.divisions;
  },
  getDistrict(state) {
    return state.districts;
  },
  getThana(state) {
    return state.thanas;
  },
  getExamByCourse(state) {
    return state.courseLists;
  },
  getSubjectWisePaperGroup(state) {
    return state.getSubjectWisePaperGroup;
  }
};

const mutations = {
  [GET_ALL_COLLEGE](state, result) {
    state.collegeLists = result;
  },
  [GET_ALL_DEGREE](state, result) {
    state.degreeLists = result;
  },
  [GET_ALL_DEGREE_GROUP](state, result) {
    state.degreeGroupLists = result;
  },
  [GET_ALL_SUBJECT](state, result) {
    state.subjectLists = result;
  },
  [GET_ALL_GROUP_BY_SUBJECT](state, result) {
    state.subjectGroupLists = result;
  },
  [GET_ALL_PAPER](state, result) {
    state.paperLists = result;
  },
  [GET_ALL_EXAMS](state, result) {
    state.examsLists = result;
  },
  [GET_PAPER_TYPE](state, result) {
    state.paperTypeLists = result;
  },
  [GET_PAPER_TYPE_INFO](state, result) {
    state.paperTypeInfo = result;
  },
  [GET_EXAM_TYPE](state, result) {
    state.examTypeLists = result;
  },
  [GET_EXAM_CANDIDATE_TYPE](state, result) {
    state.candidateTypeList = result;
  },
  [GET_AC_SESSION](state, result) {
    state.acSession = result;
  },
  [GET_EXAM_YEAR](state, result) {
    state.examYearData = result;
  },
  [GET_COURSE_EXAM_WISE](state, result) {
    state.courseLists = result;
  },
  [UN_SET_COURSE_EXAM_WISE](state) {
    state.courseLists = [];
  },
  [SET_DIVISION_DATA](state, result) {
    state.divisions = result;
  },
  [SET_DISTRICT_DATA](state, result) {
    state.districts = result;
  },
  [SET_THANA_DATA](state, result) {
    state.thanas = result;
  },

  [SET_RETURN_MESSAGE](state, message) {
    state.return_message = message;
  },
  [UNSET_RETURN_MESSAGE](state) {
    state.return_message = null;
  },
  [SET_SUBJECT_WISE_PAPER_GROUP](state, data) {
    state.getSubjectWisePaperGroup = data;
  },
  [UNSET_SUBJECT_WISE_PAPER_GROUP](state) {
    state.return_message = null;
  }
};
const actions = {
  fetchAllCollegeData({ commit, state }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(GetAllCollege, { params: searchParam })
        .then(function(response) {
          let result = response.data;
          commit("GET_ALL_COLLEGE", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },

  fetchAllDegreeData({ commit, state }, options) {
    return new Promise(function(resolve, reject) {
      Axios.get(GetAllDegree, options)
        .then(function(response) {
          let result = response.data.data;
          commit("GET_ALL_DEGREE", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },

  fetchAllDegreeGroupData({ commit, state }, options) {
    const url = GetAllDegreeGroup;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(url, options)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_ALL_DEGREE_GROUP", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },

  fetchExamWiseDegreeGroup({ commit, state }, schema) {
    let examCode = schema;
    const url = examCode
      ? `${examWiseDegreeGroup}/${examCode}`
      : examWiseDegreeGroup;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(url)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_ALL_DEGREE_GROUP", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },

  fetchAllSubjectData({ commit, state }, options) {
    const url = GetAllSubject;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(url, options)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_ALL_SUBJECT", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },

  fetchAllDegreeBySubjects({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      //commit("SET_LOADING", {color: "primary"});
      Axios.get(GetAllGroupBySubject, { params: searchParam })
        .then(function(response) {
          //commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_ALL_GROUP_BY_SUBJECT", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },

  fetchAllPaperData({ commit, state }, schema) {
    let degreeCode = schema;
    const url = degreeCode ? `${GetAllPaper}/${degreeCode}` : GetAllPaper;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(url)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_ALL_PAPER", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },

  fetchAllExamData({ commit, state }, schema) {
    let degreeCode = schema;
    const url = degreeCode ? `${GetAllExams}/${degreeCode}` : GetAllExams;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(url)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_ALL_EXAMS", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },

  fetchPaperType({ commit, state }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(GetAllPaperType)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_PAPER_TYPE", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },

  fetchPaperTypeInfo({ commit, state }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(GetAllPaperInfo)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_PAPER_TYPE_INFO", result);
          resolve(result);
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },

  fetchExamType({ commit, state }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(GetAllExamType)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_EXAM_TYPE", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },

  fetchCandidateType({ commit, state }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(GetCandidateType)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_EXAM_CANDIDATE_TYPE", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },

  fetchSessionData({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(GetAllAcSession)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_AC_SESSION", result);
          resolve();
        })
        .catch(function(error) {
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          console.log(error);
          reject();
        });
    });
  },

  fetchExamYearData({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(GetAllExam)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_EXAM_YEAR", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  getPaperGroup({ commit }, data) {
    const url = GetAllPaperGroup;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(url, { params: data })
        .then(function(response) {
          let result = response.data.data;
          commit("SET_SUBJECT_WISE_PAPER_GROUP", result);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        })
        .then(awl => {
          commit("UNSET_LOADING");
        });
    });
  },

  // division
  fetchDivisions({ commit }) {
    return new Promise(function(resolve, reject) {
      Axios.get(DivisionsList)
        .then(function(response) {
          let result = response.data.data;
          commit("SET_DIVISION_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  // district
  fetchDistricts({ commit }, schema) {
    const division_id = schema;
    const url = division_id ? DistrictsList + "/" + division_id : DistrictsList;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(url)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("SET_DISTRICT_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  // thana
  fetchThanas({ commit }, schema) {
    const district_id = schema;
    const url = district_id ? ThanasList + "/" + district_id : ThanasList;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(url)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("SET_THANA_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  // fetch all course exam wise
  fetchCourseListInfo({ commit }, schema) {
    commit("UN_SET_COURSE_EXAM_WISE");
    return new Promise(function(resolve, reject) {
      Axios.get(GetAllExamByCourse, { params: schema })
        .then(function(response) {
          let result = response.data.data;
          commit("GET_COURSE_EXAM_WISE", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
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
