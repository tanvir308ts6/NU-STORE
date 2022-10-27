import Axios from "axios";
import {
  GET_COLLEGE_AFFILIATION_DATA,
  SET_COURSE_SCHEMA_DATA,
  GET_AFFILIATED_SUBJECT_DATA
} from "../../mutation-types";
import { CollegeAffiliation } from "../../api";
import { saveMsg } from "../../erpUtil";
import { failedMsg } from "../../erpUtil";

const state = {
  schema: [],
  subjects: [],

  formData: {
    id: "",
    college_code: "",
    degree_code: "",
    degree_group_code: "",
    course_subject_code: "",
    ac_session_start: "",
    renew_up_to: "",
    status: 1
  }
};

const getters = {
  getCourseData(state) {
    return state.schema;
  },
  getDegreeSubject(state) {
    return state.subjects;
  },

  setCourseData(state) {
    return state.formData;
  }
};
const mutations = {
  [SET_COURSE_SCHEMA_DATA](state, result) {
    state.formData = result;
  },

  [GET_COLLEGE_AFFILIATION_DATA](state, result) {
    state.schema = result;
  },
  [GET_AFFILIATED_SUBJECT_DATA](state, result) {
    state.subjects = result;
  }
};

const actions = {
  fetchCourseList({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(CollegeAffiliation, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_COLLEGE_AFFILIATION_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          //console.log(error);
          reject();
        });
    });
  },

  // show details
  fetchDegreeSubjectDetails({ commit }, schema) {
    const masterId = schema;
    const url = `${CollegeAffiliation}/${masterId.id}`;

    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(url)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_AFFILIATED_SUBJECT_DATA", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          //console.log(error);
          reject();
        });
    });
  },

  // add new college
  submitCollegeAffiliation({ commit, state }, schema) {
    const formData = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(CollegeAffiliation, formData)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status === "success") {
            state.submitStatus = 1;
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            reject();
          }
          resolve();
        })
        .catch(function(error) {
          // handle error
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        });
    });
  },

  //update college item
  updateCollegeAffiliation({ commit, state }, schema) {
    const formData = schema;
    const url = `${CollegeAffiliation}/${formData.id}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.put(url, formData)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status === "success") {
            state.submitStatus = 1;
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message
            });
            reject();
          }
          resolve();
        })
        .catch(function(error) {
          // handle error
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
