import Axios from "axios";
import { saveMsg, updateMsg } from "../../erpUtil";
import { failedMsg } from "../../erpUtil";

import {
  GET_CERTIFICATE_VERIFICATION_DATA,
  GET_CERTIFICATE_VERIFICATION_STUDENTS,
  GET_ORGANIZATION_DATA
} from "../../mutation-types";
import {
  certificateVerificationList,
  cvStudentList,
  organizationList,
  studentRemark,
  removeRequestStudent,
  removeStudentAt,
  updateRequest
} from "../../api";

const state = {
  schema: [],
  schemaCvStudents: [],
  schemaOrg: []
};

const getters = {
  getSchemaCvList(state) {
    return state.schema;
  },
  getSchemaCvStudentList(state) {
    return state.schemaCvStudents;
  },

  getOrganizationList(state) {
    return state.schemaOrg;
  }
};

const mutations = {
  [GET_CERTIFICATE_VERIFICATION_DATA](state, result) {
    state.schema = result;
  },
  [GET_CERTIFICATE_VERIFICATION_STUDENTS](state, result) {
    state.schemaCvStudents = result;
  },
  [GET_ORGANIZATION_DATA](state, result) {
    state.schemaOrg = result;
  }
};

const actions = {
  fetchCertificateVerificationData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(certificateVerificationList, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(response);
          commit("GET_CERTIFICATE_VERIFICATION_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  fetchCvStudentData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(cvStudentList, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(response);
          commit("GET_CERTIFICATE_VERIFICATION_STUDENTS", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  fetchOrganizationData({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(organizationList)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(response);
          commit("GET_ORGANIZATION_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  removeStudentAt({ commit, state }, data) {
    const url = `${removeStudentAt}/${data.id}`;
    // console.log(url);
    Axios.delete(url);
  },

  removeStudent({ commit, state }, data) {
    const url = `${removeRequestStudent}/${data.id}`;
    // console.log(url);
    Axios.delete(url);
  },

  updateStatusCv({ commit }, schema) {
    let data = schema;
    const url = `${certificateVerificationList}/${data.id}`;

    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.put(url, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          // console.log(response.data.data);
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
        .catch(function() {
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

  sendRemark({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(studentRemark, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
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
  updateCVRequestAction({ commit }, data) {
    const json = JSON.stringify(data);
    var params = new URLSearchParams();
    params.append("data", json);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.post(updateRequest, params)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
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
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        });
      // console.log(data);
    });
  }
  /*exportExamCommitteeDetail({commit, state}, schema) {
     const search = schema;
     return new Promise(function (resolve, reject) {
     commit("SET_LOADING", {color: "primary"});
     Axios({
     url: exportExamCommittee,
     method: 'GET',
     responseType: 'arraybuffer',
     params: search
     }).then(response => {
     commit("UNSET_LOADING"); // loading Closing

     if (response.data) {
     const fileURL = window.URL.createObjectURL(new Blob([response.data]));
     const fileLink = document.createElement("a");
     fileLink.href = fileURL;
     fileLink.setAttribute(
     "download",
     "ec_" + Date.now() + ".pdf"
     );
     document.body.appendChild(fileLink);
     fileLink.click();
     } else {
     commit("SET_SNACKBAR", {
     msg: 'Data not found',
     color: "red"
     });
     reject();
     }


     }).catch(error => {
     console.log(error);
     });
     });
     },*/
};

export default {
  state,
  getters,
  actions,
  mutations
};
