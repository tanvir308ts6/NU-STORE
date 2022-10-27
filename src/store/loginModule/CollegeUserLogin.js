import Axios from "axios";
import {
  SET_COLLEGE_USER_LOGGED_IN,
  UNSET_COLLEGE_USER_LOGGED_IN,
  SET_AUTH_COLLEGE_USER,
  UNSET_AUTH_COLLEGE_USER,
  SET_COLLEGE_USER_TOKEN,
  UNSET_COLLEGE_USER_TOKEN,
  SET_COLLEGE_USER_PROFILE,
  UNSET_COLLEGE_USER_PROFILE,
  SET_COLLEGE_USER_CURRENT_PRIVILEGE,
  UNSET_COLLEGE_USER_CURRENT_PRIVILEGE
} from "../mutation-types";

import {
  collegeUserLoginUrl,
  logoutCollegeUserUrl,
  getCollegeUserProfileUrl,
  frontendBaseUrl,
  sendCollegeUserEmail,
  resetCollegeUserPassword,
} from '../api'
import { updateMsg } from '../erpUtil'

// initial state
const state = {
  CollegeUserLoggedIn: false,
  collegeUserToken: "",
  authCollegeUser: {},
  profile: {},
  currentPrivilege: null
};

const getters = {
  // getAuthStudentToken(state) {
  //     let access_token = localStorage.getItem("college_token")
  //     state.studentToken = access_token
  //     return access_token;
  // },
  getAuthCollegeUser(state) {
    let authCollegeUser = JSON.parse(localStorage.getItem("college-user"));
    state.authCollegeUser = authCollegeUser;
    return state.authCollegeUser ? state.authCollegeUser : authCollegeUser;
  },
  getCollegeUserToken(state) {
    return state.collegeUserToken;
  },
  getCollegeUserProfile(state) {
    return state.profile;
  },
  getCollegeUserCurrentPrivilege(state) {
    let currentPrivilege = JSON.parse(
      localStorage.getItem("current-privilege")
    );
    return state.currentPrivilege ? state.currentPrivilege : currentPrivilege;
  }
};
const mutations = {
  [SET_COLLEGE_USER_LOGGED_IN](state) {
    state.CollegeUserLoggedIn = true;
  },
  [UNSET_COLLEGE_USER_LOGGED_IN](state) {
    state.CollegeUserLoggedIn = false;
  },
  [SET_AUTH_COLLEGE_USER](state, user) {
    state.authCollegeUser = user;
  },
  [UNSET_AUTH_COLLEGE_USER](state) {
    state.authCollegeUser = {};
  },
  [SET_COLLEGE_USER_TOKEN](state, token) {
    let cu_token = localStorage.getItem("token");
    state.collegeUserToken = cu_token;
  },
  [UNSET_COLLEGE_USER_TOKEN](state) {
    state.collegeUserToken = "";
  },
  [SET_COLLEGE_USER_PROFILE](state, profile) {
    state.profile = profile;
  },
  [UNSET_COLLEGE_USER_PROFILE](state) {
    state.profile = {};
  },
  [SET_COLLEGE_USER_CURRENT_PRIVILEGE](state, currentPrivilege) {
    state.currentPrivilege = currentPrivilege;
  },
  [UNSET_COLLEGE_USER_CURRENT_PRIVILEGE](state) {
    state.currentPrivilege = null;
  }
  // [SET_AUTH_COLLEGE_ACADEMIC_INFO](state, student_academic_info) {
  //     state.student_academic_info = student_academic_info
  // },
  // [UNSET_AUTH_COLLEGE_ACADEMIC_INFO](state) {
  //     state.student_academic_info = "";
  // },
};

const actions = {
  // setAcademicInfo({ commit }, authStudent) {
  //     let url = `${API_END_POINT}student/me`
  //     return new Promise((resolve, reject) => {
  //         commit("SET_LOADING", { color: "primary" });
  //         Axios.post(url)
  //             .then(function (response) {
  //                 let student = response.data.data;
  //                 let student_academic_info = response.data.data.student_academic_info;
  //                 localStorage.setItem("student", JSON.stringify(student));
  //                 localStorage.setItem("student_academic_info", JSON.stringify(student_academic_info));

  //                 commit("SET_AUTH_STUDENT", student);
  //                 commit("SET_AUTH_COLLEGE_ACADEMIC_INFO", student_academic_info);
  //                 resolve();
  //             })
  //             .catch(function (error) {
  //                 commit("SET_AUTH_STUDENT", authStudent);
  //                 commit("UNSET_AUTH_COLLEGE_ACADEMIC_INFO");
  //                 reject();
  //             })
  //             .then(always => {
  //                 commit("UNSET_LOADING");
  //             });
  //     })
  // },
  sendCollegeUserEmail(state,data){
    var params = new URLSearchParams();
    params.append("email", data.email);
    params.append("base_url", frontendBaseUrl);

    Axios.post(sendCollegeUserEmail, params)
    .then(function(response){
      return response;
    }).catch(error=>{
      return error
    });
  },
  resetCollegeUserPassword({commit,state},data){
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(resetCollegeUserPassword + '/' + data.reset_code ,data)
        .then(function(response){
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            //commit("SET_AUTH_STUDENT", data);
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
        }).catch(error=>{
          return error;
        });
    });
  },
  loginCollegeUser({ commit }, user) {
    var params = new URLSearchParams();
    localStorage.clear();
    commit("SET_LOADING", { color: "primary" });
    commit("UNSET_COLLEGE_USER_CURRENT_PRIVILEGE");
    params.append("username", user.username);
    params.append("password", user.password);
    return new Promise((resolve, reject) => {
      Axios.post(collegeUserLoginUrl, params)
        .then(function(response) {
          // console.log(response.data);
          var token = response.data.access_token;
          var expires = response.data.expires_in;
          var collegeUser = response.data.college;

          localStorage.setItem("guard", true);
          localStorage.setItem("token", token);
          localStorage.setItem("college-user", JSON.stringify(collegeUser));
          localStorage.setItem("cu-expires", expires);
          // localStorage.setItem("menu", JSON.stringify(menu));
          commit("SET_COLLEGE_USER_LOGGED_IN");
          commit("SET_AUTH_COLLEGE_USER", collegeUser);
          commit("SET_COLLEGE_USER_TOKEN", token);
          resolve();
        })
        .catch(function(error) {
          localStorage.removeItem("token");
          localStorage.removeItem("cu-expires");

          commit("UNSET_COLLEGE_USER_LOGGED_IN");
          commit("UNSET_AUTH_COLLEGE_USER");
          commit("UNSET_COLLEGE_USER_TOKEN");

          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  logoutCollegeUser({ commit, state }) {
    commit("SET_LOADING", {
      color: "primary"
    });
    let Authorization = `Bearer ${state.collegeUserToken}`;
    return new Promise((resolve, reject) => {
      // console.log(state)
      Axios.post(
        logoutCollegeUserUrl,
        {},
        {
          headers: {
            Authorization: Authorization
          }
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("cu-expires");
      localStorage.removeItem("college-user");
      localStorage.removeItem("guard");
      localStorage.removeItem("current-privilege");
      localStorage.clear();
      commit("UNSET_COLLEGE_USER_LOGGED_IN");
      commit("UNSET_AUTH_COLLEGE_USER");
      commit("UNSET_COLLEGE_USER_TOKEN");
      commit("UNSET_COLLEGE_USER_CURRENT_PRIVILEGE");
      commit("UNSET_LOADING");
      resolve();
    });
  },
  getCollegeUserProfile({ commit, state }) {
    commit("SET_LOADING", {
      color: "primary"
    });
    var params = new URLSearchParams();
    return new Promise((resolve, reject) => {
      Axios.get(getCollegeUserProfileUrl)
        .then(res => {
          commit("SET_COLLEGE_USER_PROFILE", res.data.data);
        })
        .catch(error => {
          // commit("UNSET_COLLEGE_USER_TOKEN");
        })
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
