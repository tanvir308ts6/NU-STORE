import Axios from "axios";
import {
  collegeUserFFShowUrl,
  ffConfirmByCollegeUserUrl,
  cancelConfirmationUrl,
  cancelApplicationUrl,
  getCollegeUserWiseConfirmCandidateUrl
} from "../../api";
import {
  saveMsg,
  updateMsg,
  deleteMsg,
  failedMsg,
  sessionExpireMsg
} from "../../erpUtil";
import {
  UNSET_DATA_ENTRY_SCHEMA,
  SET_DATA_ENTRY_DETAILS,
  UNSET_DATA_ENTRY_DETAILS,
  SET_COLLEGE_USER_WISE_CANDIDATE,
  UNSET_COLLEGE_USER_WISE_CANDIDATE
} from "../../mutation-types";
const state = {
  dataEntrySchema: {
    reg_no: null,
    current_privilege: null
  },
  data_entry_details: [],
  user_wise_candidate: []
};
const getters = {
  getConfirmDataEntrySchema(state) {
    return state.dataEntrySchema;
  },
  getConfirmDataEntryDetails(state) {
    return state.data_entry_details;
  },
  getCollegeUserWiseConfirmCandidate(state) {
    return state.user_wise_candidate;
  }
};
const mutations = {
  [SET_DATA_ENTRY_DETAILS](state, data) {
    return (state.data_entry_details = data);
  },
  [UNSET_DATA_ENTRY_DETAILS](state) {
    return (state.data_entry_details = {});
  },
  [SET_COLLEGE_USER_WISE_CANDIDATE](state, data) {
    return (state.user_wise_candidate = data);
  },
  [UNSET_COLLEGE_USER_WISE_CANDIDATE](state) {
    return (state.user_wise_candidate = {});
  }
  // [UNSET_DATA_ENTRY_SCHEMA](state) {
  //     return state.dataEntrySchema = {
  //         reg_no: null
  //     }
  // }
};
const actions = {
  fetchDataEntryDetails: ({ commit, state }) => {
    let self = this;
    commit("SET_LOADING", {
      color: "primary"
    });
    commit("UNSET_DATA_ENTRY_DETAILS");
    return new Promise((resolve, reject) => {
      Axios.post(collegeUserFFShowUrl, state.dataEntrySchema)
        .then(response => {
          commit("SET_DATA_ENTRY_DETAILS", response.data.data);
          // commit("UNSET_DATA_ENTRY_SCHEMA");
        })
        .catch(error => {
          commit("UNSET_DATA_ENTRY_DETAILS");

          if (
            error.response.status != 401 &&
            error.response.statusText != "Unauthorized"
          ) {
            commit("SET_SNACKBAR", {
              msg: error.response.data.message,
              color: "red"
            });
            commit("SET_RETURN_MESSAGE", error.response.data.message);
          }
          reject(error);
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  ffConfirmByCollegeUser({ commit, state }) {
    commit("SET_LOADING", {
      color: "primary"
    });
    var params = new URLSearchParams();
    let url = ffConfirmByCollegeUserUrl;
    return new Promise((resolve, reject) => {
      Axios.post(url, state.data_entry_details)
        .then(response => {
          if (response.data.code == 200) {
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
        .catch(error => {
          // console.log(error);
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  cancelConfirmation({ commit, state }) {
    commit("SET_LOADING", {
      color: "primary"
    });
    var params = new URLSearchParams();
    // Object.assign(params, state.dataEntrySchema)
    // params.append("reg_no", state.dataEntrySchema.reg_no);
    // console.log(params)
    let url = cancelConfirmationUrl;
    Axios.post(url, state.dataEntrySchema)
      .then(response => {
        commit("SET_SNACKBAR", {
          msg: response.data.message,
          color: "green"
        });
      })
      .catch(error => {
        if (
          error.response.status != 401 &&
          error.response.statusText != "Unauthorized"
        ) {
          commit("SET_SNACKBAR", {
            msg: error.response.data.message,
            color: "red"
          });
          commit("SET_RETURN_MESSAGE", error.response.data.message);
        }
        reject(error);
      })
      .then(always => {
        commit("UNSET_LOADING");
      });
  },
  cancelApplication({ commit, state }) {
    commit("SET_LOADING", {
      color: "primary"
    });
    var params = new URLSearchParams();
    // Object.assign(params, state.dataEntrySchema)
    params.append("reg_no", state.dataEntrySchema.reg_no);
    // console.log(params)
    let url = cancelApplicationUrl;
    Axios.post(url, state.dataEntrySchema)
      .then(response => {
        commit("SET_SNACKBAR", {
          msg: response.data.message,
          color: "green"
        });
      })
      .catch(error => {
        if (
          error.response.status != 401 &&
          error.response.statusText != "Unauthorized"
        ) {
          commit("SET_SNACKBAR", {
            msg: error.response.data.message,
            color: "red"
          });
          commit("SET_RETURN_MESSAGE", error.response.data.message);
        }
        reject(error);
      })
      .then(always => {
        commit("UNSET_LOADING");
      });
  },
  getCollegeUserWiseConfirmCandidate({ commit, state }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    var params = new URLSearchParams();
    return new Promise((resolve, reject) => {
      Axios.post(getCollegeUserWiseConfirmCandidateUrl, data)
        .then(response => {
          commit("SET_COLLEGE_USER_WISE_CANDIDATE", response.data.data);
          resolve(response.data);
        })
        .catch(error => {
          commit("UNSET_COLLEGE_USER_WISE_CANDIDATE");
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
