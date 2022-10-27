import {
  frontendBaseUrl,
  sendStudentEmail,
  resetStudentPassword,
  studentLoginUrl,
  API_END_POINT,
  studentLogoutUrl,
  getStudentProfileUrl
} from "../api";
import {
  saveMsg,
  updateMsg,
  deleteMsg,
  failedMsg,
  student_token
} from "../erpUtil";
import {
  SET_STUDENT_LOGGED_IN,
  UNSET_STUDENT_LOGGED_IN,
  SET_AUTH_STUDENT,
  UNSET_AUTH_STUDENT,
  SET_STUDENT_TOKEN,
  UNSET_STUDENT_TOKEN,
  SET_AUTH_STUDENT_ACADEMIC_INFO,
  UNSET_AUTH_STUDENT_ACADEMIC_INFO,
  SET_STUDENT_PROFILE,
  UNSET_STUDENT_PROFILE
} from "../mutation-types";
import Axios from "axios";

// initial state
const state = {
  studentLoggedIn: false,
  studentToken: "",
  authStudent: {},
  student_academic_info: {},
  profile: {}
};
const getters = {
  getAuthStudentToken(state) {
    return state.studentToken
      ? state.studentToken
      : localStorage.getItem(student_token);
  },
  getAuthStudent(state) {
    let student = JSON.parse(localStorage.getItem("student"));
    // state.authStudent = student
    return state.authStudent;
  },
  getAuthStudentAcademicInfo() {
    return JSON.parse(localStorage.getItem("student_academic_info"));
  },
  getStudentProfile(state) {
    return state.profile;
  }
};
const mutations = {
  [SET_STUDENT_LOGGED_IN](state) {
    state.studentLoggedIn = true;
  },
  [UNSET_STUDENT_LOGGED_IN](state) {
    state.studentLoggedIn = false;
  },
  [SET_AUTH_STUDENT](state, authStudent) {
    localStorage.setItem("student", JSON.stringify(authStudent));
    state.authStudent = authStudent;
  },
  [UNSET_AUTH_STUDENT](state) {
    state.authStudent = {
      password: "",
      username: ""
    };
  },
  [SET_STUDENT_TOKEN](state, token) {
    state.studentToken = token;
  },
  [UNSET_STUDENT_TOKEN](state) {
    state.studentToken = "";
  },
  [SET_AUTH_STUDENT_ACADEMIC_INFO](state, student_academic_info) {
    state.student_academic_info = student_academic_info;
  },
  [UNSET_AUTH_STUDENT_ACADEMIC_INFO](state) {
    state.student_academic_info = "";
  },
  [SET_STUDENT_PROFILE](state, profile) {
    state.profile = profile;
  },
  [UNSET_STUDENT_PROFILE](state) {
    state.profile = {};
  }
};

const actions = {
  getStudentProfile({ commit, state }) {
    let url = `${getStudentProfileUrl}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(url)
        .then(response => {
          let profile = response.data.student;
          commit("SET_STUDENT_PROFILE", profile);
          resolve();
        })
        .catch(error => {
          commit("UNSET_STUDENT_PROFILE");
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  // setAcademicInfo({ commit, state }, studentToken) {
  //     let url = `${API_END_POINT}student/me`
  //     console.log(studentToken)
  //     return new Promise((resolve, reject) => {
  //         commit("SET_LOADING", { color: "primary" });
  //         Axios.post(url, {}, {
  //             headers: {
  //                 Authorization: "Bearer " + studentToken
  //             }
  //         })
  //             .then(function (response) {
  //                 let student = response.data.data;
  //                 let student_academic_info = response.data.data.student_academic_info;
  //                 localStorage.setItem("student", JSON.stringify(student));
  //                 localStorage.setItem("student_academic_info", JSON.stringify(student_academic_info));

  //                 commit("SET_AUTH_STUDENT", student);
  //                 commit("SET_AUTH_STUDENT_ACADEMIC_INFO", student_academic_info);
  //                 resolve();
  //             })
  //             .catch(function (error) {
  //                 commit("UNSET_AUTH_STUDENT_ACADEMIC_INFO");
  //                 reject();
  //             })
  //             .then(always => {
  //                 commit("UNSET_LOADING");
  //             });
  //     })
  // },
  sendStudentEmail({ commit, state }, data) {
    var params = new URLSearchParams();
    params.append("email", data.email);
    params.append("reg_no", data.reg_no);
    params.append("base_url", frontendBaseUrl);
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(sendStudentEmail, params)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            resolve();
          } else {
            commit("UNSET_LOADING"); // loading Closing
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

  resetStudentPassword({ commit, state }, data) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(resetStudentPassword + "/" + data.reset_code, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: "Password changed",
              color: "green"
            });
            resolve();
          } else {
            commit("UNSET_LOADING"); // loading Closing
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
            msg: "YourEmail Is Wrong",
            color: "red"
          });
          reject();
        });
    });
  },

  authenticateStudent({ commit }, authStudent) {
    var params = new URLSearchParams();
    localStorage.clear();
    params.append("username", authStudent.username);
    params.append("password", authStudent.password);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" });
      // http://127.0.0.1:8000/api/student/login
      // studentLoginUrl
      Axios.post(studentLoginUrl, params)
        .then(function(response) {
          // console.log(response.data);
          var token = response.data.access_token;
          var expires = response.data.expires_in;
          var student = response.data.student;

          localStorage.setItem("guard", true);
          localStorage.setItem("token", token);
          localStorage.setItem("student", JSON.stringify(student));
          localStorage.setItem("std-expires", expires);
          // localStorage.setItem("menu", JSON.stringify(menu));
          commit("SET_STUDENT_LOGGED_IN");
          commit("SET_AUTH_STUDENT", student);
          commit("SET_STUDENT_TOKEN", token);
          resolve();
        })
        .catch(function(error) {
          localStorage.setItem("token", "");
          localStorage.setItem("std-expires", "");
          localStorage.clear();

          commit("UNSET_STUDENT_LOGGED_IN");
          commit("UNSET_AUTH_STUDENT");
          commit("UNSET_STUDENT_TOKEN");

          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  logoutStudent({ commit, state }) {
    return new Promise(resolve => {
      Axios.post(studentLogoutUrl);
      localStorage.removeItem("token", "");
      localStorage.removeItem("expires", "");
      localStorage.removeItem("student", "");
      localStorage.removeItem("guard", "");
      localStorage.removeItem("student_academic_info", "");
      localStorage.clear();

      commit("UNSET_STUDENT_LOGGED_IN");
      commit("UNSET_AUTH_STUDENT");
      commit("UNSET_STUDENT_TOKEN");
      commit("UNSET_AUTH_STUDENT_ACADEMIC_INFO");

      resolve();
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
