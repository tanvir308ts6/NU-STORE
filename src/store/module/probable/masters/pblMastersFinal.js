import Axios from "axios";
import {
  GET_EXAM_YEAR,
  GET_AC_SESSION,
  SET_MASTERS_FORM_DATA,
  GET_FEE_HEADS
} from "../../../mutation-types";
import {
  GenerateProbableMasters,
  GetAllAcSession,
  GetAllExam,
  GetAllFeeHeads,
  updateExmMasterFeeUrl
} from "../../../api";
import { deleteMsg, saveMsg } from "../../../erpUtil";
import { failedMsg } from "../../../erpUtil";

const state = {
  acSession: [],
  examYear: [],
  feeHeads: [],
  mastersPbl: [],

  pblFormData: {
    //exam id
    exam_id: "",
    //regular student
    regular_ac_session: "",
    reg_std_remarks: "",
    //irregular student
    irregular_ac_session: "",
    irregular_exam_year: "",
    irr_std_remarks: "",
    //improvement student session wise
    improve_fail_ac_session: "",
    improve_fail_exam_year: "",
    improve_fail_grade: "",
    improve_fail_remarks: "",
    //improvement exam wise
    improve_fail_fixed_exam_year: "",
    improve_fail_fixed_grade: "",
    improve_fail_fixed_remarks: "",
    //improvement already pass
    improve_pass_exam_year: "",
    improve_pass_cgpa: "",
    improve_pass_grade: "",
    improve_pass_paper: "",
    improve_pass_remarks: ""
  }
};

const getters = {
  getAcSession(state) {
    return state.acSession;
  },
  getExamYear(state) {
    return state.examYear;
  },
  getFeeHeads(state) {
    return state.feeHeads;
  },
  initFromData(state) {
    return state.pblFormData;
  }
};

const mutations = {
  //get data from api
  [GET_AC_SESSION](state, result) {
    state.acSession = result;
  },
  [GET_EXAM_YEAR](state, result) {
    state.examYear = result;
  },
  [GET_FEE_HEADS](state, result) {
    state.feeHeads = result;
  },
  [SET_MASTERS_FORM_DATA](state, result) {
    state.pblFormData = result;
  }
};

const actions = {
  fetchExmFeeHeads({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(GetAllFeeHeads)
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_FEE_HEADS", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  fetchAcSessionData({ commit }) {
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
          // handle error
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

  generateProbableMasters({ commit, state }, schema) {
    const data = schema;

    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening

      Axios.post(GenerateProbableMasters, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          console.log(response);
          if (response.data.code == 200) {
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
          // console.log(error.response);
          if (error.response.data.code == 400) {
            commit("SET_SNACKBAR", {
              msg: error.response.data.message,
              color: "green"
            });
          } else {
            commit("SET_SNACKBAR", {
              msg: failedMsg,
              color: "red"
            });
          }

          reject();
        });
    });
  },

  updateExmMasterFee({ commit, state }, schema) {
    const data = schema;

    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening

      Axios.post(updateExmMasterFeeUrl, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          console.log(response);
          if (response.data.status === "success") {
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
