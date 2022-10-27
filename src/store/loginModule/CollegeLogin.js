import Axios from "axios";

import {
  SET_COLLEGE_LOGGED_IN,
  SET_COLLEGE_TOKEN,
  SET_AUTH_COLLEGE,
  UNSET_AUTH_COLLEGE,
  UNSET_COLLEGE_LOGGED_IN,
  UNSET_COLLEGE_TOKEN,
  // SET_AUTH_COLLEGE_ACADEMIC_INFO,
  // UNSET_AUTH_COLLEGE_ACADEMIC_INFO
} from "../mutation-types";

import { collegeLoginUrl, collegeLogoutUrl } from "../api";
// initial state
const state = {
  CollegeLoggedIn: false,
  collegeToken: "",
  authCollege: {},
  // student_academic_info: {}
};

const getters = {
  // getAuthStudentToken(state) {
  //     let access_token = localStorage.getItem("college_token")
  //     state.studentToken = access_token
  //     return access_token;
  // },
  getAuthCollege(state) {
    let college = JSON.parse(localStorage.getItem("college"));
    state.authCollege = college;
    return state.authCollege ? state.authCollege : college;
  },
  getCollegeToken(state) {
    return state.collegeToken;
  },
};
const mutations = {
  [SET_COLLEGE_LOGGED_IN](state) {
    state.CollegeLoggedIn = true;
  },
  [UNSET_COLLEGE_LOGGED_IN](state) {
    state.CollegeLoggedIn = false;
  },
  [SET_AUTH_COLLEGE](state, college) {
    state.authCollege = college;
  },
  [UNSET_AUTH_COLLEGE](state) {
    state.authCollege = {};
  },
  [SET_COLLEGE_TOKEN](state, token) {
    state.collegeToken = token;
  },
  [UNSET_COLLEGE_TOKEN](state) {
    state.collegeToken = "";
  },
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
  authenticateCollege({ commit }, user) {
    var params = new URLSearchParams();
    localStorage.clear();
    commit("SET_LOADING", { color: "primary" });
    params.append("college_code", user.username);
    params.append("password", user.password);
    return new Promise((resolve, reject) => {
      Axios.post(collegeLoginUrl, params)
        .then(function(response) {
          // console.log(response.data);
          var token = response.data.access_token;
          var expires = response.data.expires_in;
          var college = response.data.college;

          localStorage.setItem("guard", true);
          localStorage.setItem("token", token);
          localStorage.setItem("college", JSON.stringify(college));
          localStorage.setItem("college-expires", expires);
          // localStorage.setItem("menu", JSON.stringify(menu));
          commit("SET_COLLEGE_LOGGED_IN");
          commit("SET_AUTH_COLLEGE", college);
          commit("SET_COLLEGE_TOKEN", token);
          resolve();
        })
        .catch(function(error) {
          localStorage.removeItem("token");
          localStorage.removeItem("college-expires");

          commit("UNSET_COLLEGE_LOGGED_IN");
          commit("UNSET_AUTH_COLLEGE");
          commit("UNSET_COLLEGE_TOKEN");

          reject();
        })
        .then((always) => {
          commit("UNSET_LOADING");
        });
    });
  },
  logoutCollege({ commit, state }) {
    commit("SET_LOADING", {
      color: "primary",
    });
    let Authorization = `Bearer ${state.collegeToken}`;
    return new Promise((resolve, reject) => {
      // console.log(state)
      Axios.post(
        collegeLogoutUrl,
        {},
        {
          headers: {
            Authorization: Authorization,
            token_name: "college_token",
          },
        }
      );
      localStorage.removeItem("college_token");
      localStorage.removeItem("college-expires");
      localStorage.removeItem("college");
      localStorage.removeItem("guard");
      localStorage.clear();

      commit("UNSET_COLLEGE_LOGGED_IN");
      commit("SET_AUTH_COLLEGE");
      commit("UNSET_COLLEGE_TOKEN");
      commit("UNSET_LOADING");
      resolve();
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
