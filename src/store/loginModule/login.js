/* eslint-disable prettier/prettier */
import Axios from "axios";

import {
  SET_LOGGED_IN,
  UNSET_LOGGED_IN,
  SET_AUTH_USER,
  UNSET_AUTH_USER,
  SET_USER_TOKEN,
  UNSET_USER_TOKEN,
  SET_LOGGEDIN_EXAM,
  SET_LOGGEDIN_DEGREE,
  SET_LOGGEDIN_YEAR,
  SET_LOGGEDIN_EXAM_NAME,
  UNSET_ALL_LOGIN_STATE,
  SET_EXAM_INITIATE_ID,
  SET_LOGGEDIN_EXAM_TYPE,
  SET_ASSIGNED_EXAMS,
  SET_CURRENT_CENTER_AS_ALLOC,
  UNSET_CURRENT_CENTER_AS_ALLOC,
  SET_CORRECT_CENTER_STATUS,
  UNSET_CORRECT_CENTER_STATUS,
} from "../mutation-types";

import { loginUrl, centerAllocCentersApi } from "../api";
/*import {
  failedMsg, loadMsg, saveMsg, updateMsg, deleteMsg
}from '../erpUtil'*/

// initial state
const state = {
  loggedIn: false,
  loggedInExam: {
    code: "",
  },
  loggedInDegree: {
    code: "",
  },
  loggedInYear: {
    year: "",
  },
  userToken: "",
  authUser: {},
  response: "",
  exam_initiate_id: 1,
  loggedInExamType: 1,
  assignedExamList: [],
  centerAsAlloc: {},
  correctCenterStatus: true,
  loggedInExamName:{
    exam_name:"",
  },
  // authUserType: JSON.parse(localStorage.getItem("user")).type || ""
};
const getters = {
  getLoggedIn(state) {
    return state.loggedIn;
  },

  getAuthUser(state) {
    console.log("getAuthUser", state.authUser);
    return state.authUser;
  },

  getAuthUserID(state) {
    return state.authUser.id;
  },
  getAuthUserExamInitiates(state) {
    return state.authUser.exam_initiates;
  },
  getAuthUserType(state, getters) {
    // console.log("user in getAuthUserType", state.user);
    return state.authUser.type;
  },
  getAuthUserTypeID(state) {
    // console.log("am I here ??  --- >");
    let user = state.authUser;
    let type = "~";
    switch (parseInt(user.type)) {
      case 1:
        type = "admin";
        break;
      case 2:
        type = "center";
        break;
      case 3:
        type = "regional_center";
        break;
      case 4:
        type = "invigilator";
        break;
      case 5:
        type = "examiner";
        break;
      case 6:
        type = "nu";
        break;
      case 7:
        type = "rescrutiner";
        break;
      case 8:
        type = "programmer";
        break;
      case 9:
        type = "ict_director";
        break;
      case 10:
        type = "controller";
        break;
      case 11:
        type = "vc";
        break;
      case 12:
        type = "pro_vc";
        break;
    }
    // console.log("type  --- >", type);
    // console.log("user[type].id  --- >", user[type].id);
    return user[type].id;
  },
  //exam and year
  getLoggedInExam(state) {
    return state.loggedInExam;
  },
  getLoggedInDegree(state) {
    return state.loggedInDegree;
  },
  getLoggedInYear(state) {
    return state.loggedInYear;
  },
  getLoggedIneExamName(state) {
    return state.loggedInExamName;
  },
  getExamInitiateId(state) {
    return state.exam_initiate_id;
  },
  getLoggedInExamType(state) {
    return state.loggedInExamType;
  },
  getAssignedExamList(state) {
    return state.assignedExamList;
  },
  getCenterAsAlloc(state) {
    return state.centerAsAlloc;
  },
  getCorrectCenterStatus(state) {
    return state.correctCenterStatus;
  },
};
// mutations
const mutations = {
  [SET_LOGGED_IN](state) {
    state.loggedIn = true;
  },
  [UNSET_LOGGED_IN](state) {
    state.loggedIn = false;
  },
  [SET_USER_TOKEN](state, token) {
    state.userToken = token;
  },
  [UNSET_USER_TOKEN](state) {
    state.userToken = "";
  },
  [SET_AUTH_USER](state, authuser) {
    state.authUser = authuser;
  },
  [UNSET_AUTH_USER](state) {
    state.authUser = {
      password: "",
      email: "",
    };
  },

  [UNSET_ALL_LOGIN_STATE](state) {
    state.loggedIn = false;
    state.loggedInExam = {
      code: "",
    };
    state.loggedInDegree = {
      code: "",
    };
    state.loggedInYear = {
      year: "",
    };
    state.userToken = "";
    state.authUser = {};
  },
  //
  [SET_LOGGEDIN_EXAM](state, loggedInExam) {
    // console.log("SP: ***** am I here");
    localStorage.setItem("loggedInExam", JSON.stringify(loggedInExam));
    state.loggedInExam = loggedInExam;
  },
  [SET_LOGGEDIN_DEGREE](state, loggedInDegree) {
    // console.log("SP: ***** am I here");
    localStorage.setItem("loggedInDegree", JSON.stringify(loggedInDegree));
    state.loggedInDegree = loggedInDegree;
  },
  [SET_LOGGEDIN_YEAR](state, loggedInYear) {
    localStorage.setItem("loggedInYear", JSON.stringify(loggedInYear));
    state.loggedInYear = loggedInYear;
  },
  [SET_LOGGEDIN_EXAM_NAME](state, loggedInExamName) {
    localStorage.setItem("loggedInExamName", JSON.stringify(loggedInExamName));
    state.loggedInExamName = loggedInExamName;
    console.log("loggedInExamName",loggedInExamName.exam_name);
  },
  
  [SET_EXAM_INITIATE_ID](state, exam_initiate_id) {
    state.exam_initiate_id = exam_initiate_id;
    // console.log("ini id ",exam_initiate_id)
  },

  [SET_LOGGEDIN_EXAM_TYPE](state, type) {
    state.loggedInExamType = type;
  },
  [SET_ASSIGNED_EXAMS](state, exams) {
    state.assignedExamList = exams;
  },
  [SET_CURRENT_CENTER_AS_ALLOC](state, data) {
    state.centerAsAlloc = data;
  },
  [UNSET_CURRENT_CENTER_AS_ALLOC](state, data) {
    state.centerAsAlloc = {};
  },
  [SET_CORRECT_CENTER_STATUS](state) {
    state.correctCenterStatus = true;
  },
  [UNSET_CORRECT_CENTER_STATUS](state) {
    state.correctCenterStatus = false;
  },
};
// Actions
const actions = {
  authenticateUser({ commit, state }, authUser) {
    // console.log("in authenticateUser", authUser);
    // console.log("YES its called");
    var params = new URLSearchParams();
    params.append("email", authUser.email);
    params.append("password", authUser.password);
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise((resolve, reject) => {
      // console.log("okokok", loginUrl);
      Axios.post(loginUrl, params)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(response.data);
          var token = response.data.token;
          var expires = response.data.expires;
          var user = response.data.user;
          var exams = response.data.exams;
          var menu = response.data.menu;

          if (parseInt(user.type) === 1) {
            user.admin = {
              id: 1,
            };
          }

          // console.log("sp sp sp user", user);
          // console.log("menu", menu);
          localStorage.setItem("guard", true);
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          console.log("login local stor", JSON.stringify(user));
          localStorage.setItem("exams", JSON.stringify(exams));
          // localStorage.setItem("expires", expires);
          localStorage.setItem("menu", JSON.stringify(menu));
          commit("SET_LOGGED_IN");
          commit("SET_AUTH_USER", user);
          commit("SET_USER_TOKEN", token);

          try {
            commit("SET_ASSIGNED_EXAMS", exams);
            //Check if exam initiates data available
            // console.log("sp:: exam_initiates", user.exam_initiates);
            if (user.exam_initiates.length > 0) {
              // console.log("sp:: in if :: exam_initiates", user.exam_initiates);
              commit("SET_LOGGEDIN_EXAM", {
                code: user.exam_initiates[0].exam_code,

              });
              commit("SET_LOGGEDIN_DEGREE", {
                code: user.exam_initiates[0].exam.degree_code,
              });
              commit("SET_LOGGEDIN_YEAR", {
                year: user.exam_initiates[0].exam_year,
              });
              commit("SET_LOGGEDIN_EXAM_NAME", {
                exam_name: user.exam_initiates[0].exam_name,
              });
              commit("SET_EXAM_INITIATE_ID", user.exam_initiates[0].id);
              commit(
                "SET_LOGGEDIN_EXAM_TYPE",
                parseInt(user.exam_initiates[0].exam_type)
              );
                          // console.log(" iniit id ...", state.exam_initiate_id);
            } else {
              commit("SET_LOGGEDIN_YEAR", {
                year: "",
              });
              commit("SET_LOGGEDIN_DEGREE", {
                code: "",
              });
              commit("SET_LOGGEDIN_EXAM", {
                code: "",
              });
            }
          } catch (ex) {
            console.log("EDD", ex);
          }
          // commit("SET_USER_EXAMS", exams);
          resolve();
        })
        .catch(function(error) {
          console.log("error", error);
          localStorage.setItem("token", "");
          localStorage.setItem("expires", "");

          commit("UNSET_LOGGED_IN");
          commit("UNSET_AUTH_USER");
          commit("UNSET_USER_TOKEN");

          reject();
        });
    });
  },
  logoutUser({ commit, state }) {
    return new Promise((resolve) => {
      localStorage.setItem("token", "");
      localStorage.setItem("expires", "");
      localStorage.setItem("menu", "");
      localStorage.setItem("user", "");
      localStorage.setItem("guard", "");
      localStorage.setItem("exams", "");
      localStorage.clear();
      // commit("UNSET_LOGGED_IN");
      // commit("UNSET_AUTH_USER");
      // commit("UNSET_USER_TOKEN");
      commit("UN_SET_EXAM_DATA");
      commit("UN_SET_ALL_YEARS");
      commit("UNSET_ALL_LOGIN_STATE");
      commit("UNSET_ALL_STUDENT_LIST_DATA");

      resolve();
    });
  },
  getAuthUserTypeID({ commit }) {
    return new Promise((resolve) => {
      // console.log("am I here ??  --- >");
      let user = JSON.parse(localStorage.getItem("user"));
      let type = "~";
      switch (parseInt(user.type)) {
        case 1:
          type = "admin";
          break;
        case 2:
          type = "center";
          break;
        case 3:
          type = "regional_center";
          break;
        case 4:
          type = "invigilator";
          break;
        case 5:
          type = "examiner";
          break;
        case 6:
          type = "nu";
          break;
        case 7:
          type = "rescrutiner";
          break;
        case 8:
          type = "programmer";
          break;
        case 9:
          type = "ict_director";
          break;
        case 10:
          type = "controller";
          break;
        case 11:
          type = "vc";
          break;
        case 12:
          type = "pro_vc";
          break;
        case 21:
          type = "examiner";
          break;
        case 22:
          type = "systemanalyst";
          break;
      }
      // console.log("type  --- >", type);
      //console.log('user[type].id  --- >', user[type].id);
      // if (user.id == 29) {
      //     resolve(user.id);
      // }
      console.log("...m", user);
      resolve(user[type].id);
    });
  },
  getAuthUserType({ commit }) {
    return new Promise((resolve) => {
      // console.log("am I here ??  --- >");
      let user = JSON.parse(localStorage.getItem("user"));
      console.log("...", user.type);
      resolve(parseInt(user.type));
    });
  },

  setCorrectCenter({ commit, state }, payload) {
    console.log("payload +-+-+ :: ac", payload);
    return new Promise(function(resolve, reject) {
      Axios.get(centerAllocCentersApi, {
        params: payload,
      })
        .then(function(response) {
          try {
            console.log(" here sp here: ", response.data.data);
            var result = response.data.data;
            state.authUser.center.center_code = -1;
            state.authUser.center.practical_center_code = -1;
            state.authUser.center.viva_center_code = -1;
            // commit("SET_CURRENT_CENTER_AS_ALLOC", result);
            // console.log("response--", result);
            console.log("state.authUser::", state.authUser);
            if (response.data.data.length != 0) {
              result.forEach((ele) => {
                if (parseInt(ele.type) == 1) {
                  // console.log("in 1");
                  state.authUser.center.center_code = ele.center_code;
                  console.log("1.state.authUser", state.authUser);
                  localStorage.setItem("user", JSON.stringify(state.authUser));
                }
                if (parseInt(ele.type) == 2) {
                  // console.log("in 2");
                  state.authUser.center.practical_center_code = ele.center_code;
                  state.authUser.center.center_code = ele.center_code; //temporary solution
                  // console.log("2.state.authUser", state.authUser);
                  localStorage.setItem("user", JSON.stringify(state.authUser));
                }
                if (parseInt(ele.type) == 3) {
                  // console.log("in 3");
                  state.authUser.center.viva_center_code = ele.center_code;
                  // console.log("3.state.authUser", state.authUser);
                  localStorage.setItem("user", JSON.stringify(state.authUser));
                }
              });
            } else {
              state.authUser.center.center_code = -1;
              state.authUser.center.practical_center_code = -1;
              state.authUser.center.viva_center_code = -1;
              localStorage.setItem("user", JSON.stringify(state.authUser));
            }

            console.log("state.authUser::", state.authUser);
          } catch (er) {
            console.log("error in setCorrectCenter");
          }

          resolve();
        })
        .catch(function(error) {
          // handle error
          //   console.log(error);
          state.authUser.center.center_code = -1;
          state.authUser.center.practical_center_code = -1;
          state.authUser.center.viva_center_code = -1;
          localStorage.setItem("user", JSON.stringify(state.authUser));
          // console.log("state.authUser::", state.authUser);
          reject();
        });
    });
  },

  // exam
};

export default {
  state,
  getters,
  actions,
  mutations,
};
