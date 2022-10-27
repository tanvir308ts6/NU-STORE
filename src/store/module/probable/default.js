import Axios from "axios";
import {
  SET_PROBABLE_SLOT_SCHEMA,
  GET_SLOT_AC_SESSION,
  GET_RESULT_TYPE,
  GET_EXAM_ACTIVITY_STATUS
} from "../../mutation-types";
import {
  generateProbableCriteriaUrl,
  getSlotAcSession,
  getResultType,
  examActivityStatus
} from "../../api";
import {
  saveMsg,
  updateMsg,
  deleteMsg,
  failedMsg,
  sessionExpireMsg
} from "../../erpUtil";

const state = {
  acSession: [],
  schema: {
    exam_id: "",
    regular_ac_session: "",
    irregular_ac_session: "",
    irregular_exam_year: "",
    irregular_grade: "",
    irregular_mark: "",
    improve_session: "",
    improve_exam_year: "",
    improve_grade: "",
    improve_mark: "",
    // irregular: [{}],
    // improvement: [{}]
    irregular: [],
    improvement: []
  },
  resultType: "",
  examActivityStatus: []
};

const getters = {
  getSlotAcSession(state) {
    return state.acSession;
  },
  probableSlotSchema(state) {
    return state.schema;
  },
  getExamActivityStatus(state) {
    return state.examActivityStatus;
  }
};

const mutations = {
  [SET_PROBABLE_SLOT_SCHEMA](state) {
    state.schema = {
      exam_id: "",
      regular_ac_session: "",
      irregular_ac_session: "",
      irregular_exam_year: "",
      irregular_grade: "",
      irregular_mark: "",
      improve_session: "",
      improve_exam_year: "",
      improve_grade: "",
      improve_mark: "",
      // irregular: [{}],
      // improvement: [{}]
      irregular: [],
      improvement: []
    };
  },
  [GET_SLOT_AC_SESSION](state, result) {
    state.acSession = result;
  },
  [GET_RESULT_TYPE](state, result) {
    state.resultType = result;
  },
  [GET_EXAM_ACTIVITY_STATUS](state, result) {
    state.examActivityStatus = result;
  }
};

const actions = {
  getSlotAcSession({ commit, state }, schema) {
    const search = schema;
    return new Promise(function (resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(getSlotAcSession, { params: search })
        .then(function (response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(result);
          commit("GET_SLOT_AC_SESSION", result);
          resolve();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  getResultType({ commit }, schema) {
    let data = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(getResultType, { params: data })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_RESULT_TYPE", result);
          resolve(result);
        })
        .catch(function(error) {
          commit("GET_RESULT_TYPE");
          //commit("UNSET_LOADING");
          //reject();
        });
    });
  },
  generateProbableCriteria({ commit, state }, schema) {
    const data = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" }); // loading Opening
      Axios.post(generateProbableCriteriaUrl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
            commit("SET_PROBABLE_SLOT_SCHEMA");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: failedMsg,
              color: "red"
            });
            resolve();
          }
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
  getExamActivityStatus({ commit }, schema) {
    let data = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(examActivityStatus, { params: data })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_EXAM_ACTIVITY_STATUS", result);
          resolve(result);
        })
        .catch(function(error) {
          commit("GET_EXAM_ACTIVITY_STATUS");
          commit("UNSET_LOADING");
          //reject();
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
