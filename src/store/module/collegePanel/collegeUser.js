import {
  baseURL,
  getExmMasterUrl,
  getDegreeWiseDegreeGroupUrl,
  getSubjectUrl,
  createCollegeUserUrl,
  getAllCollegeUserUrl,
  editCollegeUserUrl,
  deleteCollegeUserUrl,
  createCollegeUserPrivilegeUrl,
  getCollegeUserPrivilegeUrl,
  updateCollegeUserPrivilegeStatusUrl,
  CollegeUserChangePasswordUrl,
  CollegeChangePasswordUrl,
  collegeUserProfileUpdate
} from "../../api";
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";
import Axios from "axios";

import {
  SET_ALL_EXAM_MASTER,
  UNSET_ALL_EXAM_MASTER,
  SET_COLLEGE_USER_SCHEMA,
  UNSET_COLLEGE_USER_SCHEMA,
  SET_DEGREE_WISE_DEGREE_GROUP,
  UNSET_DEGREE_WISE_DEGREE_GROUP,
  SET_SUBJECT,
  UNSET_SUBJECT,
  SET_COLLEGE_USER,
  UNSET_COLLEGE_USER,
  INITIATE_PRIVILEGE,
  SET_COLLEGE_USER_PRIVILEGE,
  UNSET_COLLEGE_USER_PRIVILEGE
} from "../../mutation-types";

const state = {
  schema: {
    name: null,
    college_code: null,
    degree_code: null,
    degree_group_code: null,
    subject_code: null,
    exam_initiate_id: null,
    exam_code: null,
    mobile: null,
    email: null,
    username: null,
    password: null
  },
  privilege_schema: {
    exam_initiate_id: null,
    degree_code: null,
    degree_group_code: null,
    subject_code: null
  },
  all_exam_master: [],
  degree_group: [],
  subject: [],
  college_user: [],
  assign_privilege: [{}],
  user_privilege: []
};
const getters = {
  getBaseUrl() {
    return baseURL;
  },
  getAllExmMaster(state) {
    return state.all_exam_master;
  },
  getCollegeUserSchema(state) {
    return state.schema;
  },
  getPrivilegeSchema(state) {
    return state.privilege_schema;
  },
  getAssignPrivilege(state) {
    return state.assign_privilege;
  },
  getDegreeGroup(state) {
    return state.degree_group;
  },
  getSubject(state) {
    return state.subject;
  },
  getAllCollegeUser(state) {
    return state.college_user;
  },
  getCollegeUserPrivilege(state) {
    return state.user_privilege;
  }
};
const mutations = {
  [SET_ALL_EXAM_MASTER](state, result) {
    state.all_exam_master = result;
  },
  [UNSET_ALL_EXAM_MASTER](state) {
    state.all_exam_master = [];
  },
  [SET_DEGREE_WISE_DEGREE_GROUP](state, result) {
    state.degree_group = result;
  },
  [UNSET_DEGREE_WISE_DEGREE_GROUP](state) {
    state.degree_group = [];
  },
  [SET_SUBJECT](state, result) {
    state.subject = result;
  },
  [UNSET_SUBJECT](state) {
    state.subject = [];
  },
  [SET_COLLEGE_USER](state, result) {
    state.college_user = result;
  },
  [UNSET_COLLEGE_USER](state) {
    state.college_user = [];
  },
  [SET_COLLEGE_USER_SCHEMA](state, result) {
    state.schema = result;
  },
  [UNSET_COLLEGE_USER_SCHEMA](state) {
    state.schema = {
      name: null,
      college_code: null,
      degree_code: null,
      degree_group_code: null,
      subject_code: null,
      exam_initiate_id: null,
      exam_code: null,
      mobile: null,
      email: null,
      username: null,
      password: null
    };
  },
  [INITIATE_PRIVILEGE](state) {
    state.assign_privilege = [{}];
  },
  [SET_COLLEGE_USER_PRIVILEGE](state, data) {
    state.user_privilege = data;
  },
  [UNSET_COLLEGE_USER_PRIVILEGE](state) {
    state.user_privilege = [];
  }
};
const actions = {
  getExmMaster({ commit }) {
    commit("SET_LOADING", {
      color: "primary"
    });
    return new Promise((resolve, reject) => {
      Axios.get(getExmMasterUrl)
        .then(response => {
          var result = response.data.data;
          commit("SET_ALL_EXAM_MASTER", result);
          resolve(response.data);
        })
        .catch(() => {
          commit("UNSET_ALL_EXAM_MASTER");
          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
  getDegreeWiseDegreeGroup({ commit, state }) {
    commit("SET_LOADING", {
      color: "primary"
    });
    return new Promise((resolve, reject) => {
      let params = state.schema;
      Axios.get(getDegreeWiseDegreeGroupUrl, { params: params })
        .then(response => {
          var result = response.data.data;
          commit("SET_DEGREE_WISE_DEGREE_GROUP", result);
          resolve(response.data);
        })
        .catch(() => {
          commit("UNSET_DEGREE_WISE_DEGREE_GROUP");
          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
  getSubject({ commit, state }) {
    commit("SET_LOADING", {
      color: "primary"
    });
    return new Promise((resolve, reject) => {
      let params = state.schema;
      Axios.get(getSubjectUrl, { params: params })
        .then(response => {
          var result = response.data.data;
          commit("SET_SUBJECT", result);
          resolve(response.data);
        })
        .catch(() => {
          commit("UNSET_SUBJECT");
          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
  createCollegeUser({ commit, state }) {
    commit("SET_LOADING", {
      color: "primary"
    });
    return new Promise((resolve, reject) => {
      let params = state.schema;
      Axios.post(createCollegeUserUrl, params)
        .then(response => {
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: failedMsg,
              color: "red"
            });
            reject();
          }
        })
        .catch(() => {
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
  editCollegeUser({ commit, state }) {
    commit("SET_LOADING", {
      color: "primary"
    });
    return new Promise((resolve, reject) => {
      let params = state.schema;
      Axios.put(editCollegeUserUrl, params)
        .then(response => {
          // var result = response.data.data;
          // commit("SET_COLLEGE_USER", result);
          resolve(response.data);
        })
        .catch(() => {
          // commit("UNSET_COLLEGE_USER")
          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
  deleteCollegeUser({ commit }, collegeUserId) {
    commit("SET_LOADING", {
      color: "primary"
    });
    return new Promise((resolve, reject) => {
      let url = `${deleteCollegeUserUrl}/${collegeUserId}`;
      Axios.delete(url)
        .then(response => {
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: deleteMsg,
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
        .catch(() => {
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
  getAllCollegeUser({ commit }, search) {
    commit("SET_LOADING", {
      color: "primary"
    });
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams();
      params.append("search", search);
      Axios.post(getAllCollegeUserUrl, params)
        .then(response => {
          var result = response.data.data;
          commit("SET_COLLEGE_USER", result);
          resolve(response.data);
        })
        .catch(() => {
          commit("UNSET_COLLEGE_USER");
          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
  createCollegeUserPrivilege({ commit, state }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    return new Promise((resolve, reject) => {
      Axios.post(createCollegeUserPrivilegeUrl, {
        college_user_id: data.id,
        privilege: state.assign_privilege
      })
        .then(() => {
          // commit("SET_COLLEGE_USER", result);
          resolve();
        })
        .catch(() => {
          // commit("UNSET_COLLEGE_USER")
          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
  updateCollegeUserPrivilegeStatus({ commit }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    return new Promise((resolve, reject) => {
      console.log(updateCollegeUserPrivilegeStatusUrl);
      var params = new URLSearchParams();
      params.append("id", data.id);
      params.append("status", data.status);
      Axios.post(updateCollegeUserPrivilegeStatusUrl, params)
        .then(response => {
          commit("SET_SNACKBAR", {
            msg: response.data.message,
            color: "green"
          });
          resolve(response);
        })
        .catch(() => {
          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
  getCollegeUserPrivilege({ commit }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams();
      params.append("college_user_id", data.id);
      Axios.get(getCollegeUserPrivilegeUrl, {
        params: params
      })
        .then(response => {
          var result = response.data.data;
          commit("SET_COLLEGE_USER_PRIVILEGE", result);
          resolve(response.data);
        })
        .catch(() => {
          commit("UNSET_COLLEGE_USER_PRIVILEGE");
          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
  profileUpdateCollegeUser({ commit }, profile) {
    console.log(profile);
    var params = new FormData();
    params.append("name", profile.name);
    params.append("username", profile.username);
    params.append("email", profile.email);
    params.append("mobile", profile.mobile);
    params.append("photo_url", profile.photo_url);
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(collegeUserProfileUpdate, params)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status === "success") {
            commit("SET_AUTH_STUDENT", response.data.data);
            commit("SET_SNACKBAR", {
              msg: updateMsg,
              color: "green"
            });
            resolve();
          } else {
            commit("UNSET_LOADING");
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
  CollegeUserChangePassword({ commit }, data) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(CollegeUserChangePasswordUrl, data)
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
  CollegeChangePassword({ commit }, data) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(CollegeChangePasswordUrl, data)
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
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
