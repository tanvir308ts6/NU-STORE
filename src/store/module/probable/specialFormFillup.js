import Axios from "axios";
import { saveMsg, updateMsg, failedMsg } from "../../erpUtil";

import {
  GET_PBL_STUDENT_INFO,
  SET_ADMIN_FORM_FILLUP_SUBJECT,
  UN_SET_ADMIN_FORM_FILLUP_SUBJECT
} from "../../mutation-types";

import {
  getPblStudent,
  adminFormFillupSubject,
  formFillUpByAdminUrl
} from "../../api";

const state = {
  studentInfo: {},
  schema: {
    form_fill_up_id: null,
    confirm_subjects: [],
    student_info: {
      mobile: null
    }
  },
  admin_form_fill_up_subject: []
};

const getters = {
  getPblStudentInfo(state) {
    return state.studentInfo;
  },
  getAdminFormFillUpSubject(state) {
    return state.admin_form_fill_up_subject;
  },
  formFillUpConfirmByAdmin(state) {
    return state.schema;
  }
};

const mutations = {
  [GET_PBL_STUDENT_INFO](state, result) {
    state.studentInfo = result;
  },
  [SET_ADMIN_FORM_FILLUP_SUBJECT](state, result) {
    state.admin_form_fill_up_subject = result;
  },
  [UN_SET_ADMIN_FORM_FILLUP_SUBJECT](state) {
    state.admin_form_fill_up_subject = [];
  }
};

const actions = {
  getPblStudentInfo({ commit }, schema) {
    commit("UN_SET_ADMIN_FORM_FILLUP_SUBJECT");
    let data = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(getPblStudent, { params: data })
        .then(function(response) {
          console.log(response);
          let result = response.data.data;
          commit("GET_PBL_STUDENT_INFO", result);
          resolve(response.data);
          commit("UNSET_LOADING");
        })
        .catch(function(error) {
          commit("SET_SNACKBAR", {
            msg: error.response.data.message,
            color: "red"
          });
          commit("GET_PBL_STUDENT_INFO");
          commit("UNSET_LOADING");
          //reject();
        });
    });
  },
  getAdminFormFillUpSubject({ commit, state }, schema) {
    // const self = this
    let data = schema;
    // console.log(url)
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      //commit("UN_SET_ADMIN_FORM_FILLUP_SUBJECT");
      Axios.get(adminFormFillupSubject, { params: data })
        .then(function(response) {
          let result = response.data.data;
          localStorage.setItem(
            "admin_form_fill_up_subject",
            JSON.stringify(response.data)
          );
          commit("SET_ADMIN_FORM_FILLUP_SUBJECT", result);
          //commit("UN_SET_ADMIN_FORM_FILLUP_SUBJECT");

          resolve(response.data.data);
        })
        .catch(function(error) {
          commit("UN_SET_ADMIN_FORM_FILLUP_SUBJECT");
          localStorage.removeItem("admin_form_fill_up_subject");
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },

  formFillUpConfirmAdmin({ commit, state }, formData) {
    let url = `${formFillUpByAdminUrl}`;
    // console.log(formData)
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(url, formData)
        .then(function(response) {
          localStorage.removeItem("admin_form_fill_up_subject");
          if (response.data.status === "success") {
            commit("UN_SET_ADMIN_FORM_FILLUP_SUBJECT");
            commit("SET_SNACKBAR", {
              msg: saveMsg,
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
          reject();
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
