import Axios from "axios";
import {
  SET_BED_PROF_FIRST_SEMESTER_FORM_DATA,
  SET_BED_PROF_SECOND_SEMESTER_FORM_DATA,
  SET_BED_PROF_THIRD_SEMESTER_FORM_DATA,
  GET_FEE_HEADS
} from "../../../mutation-types";
import {
  bedProfSemesterOne,
  bedProfSemesterTwo,
  bedProfSemesterThree,
  GetAllFeeHeads
} from "../../../api";
import { saveMsg } from "../../../erpUtil";
import { failedMsg } from "../../../erpUtil";

const state = {
  feeHeads: [],
  mastersPbl: [],

  schema_one: {
    //exam id
    exam_id: "",
    //regular student
    first_sem_regu_ac_session: "",
    elective_papers: "",
    //irregular student
    irregular_ac_session: "",
    irregular_exam_year: "",
    irregular_elective_papers: "",

    //session wise irregular
    irregular_fail_ac_session: "",
    irregular_fail_exam_year: "",
    irregular_fail_grade: "",
    //improvement student
    improve_ment_pass_sess: "",
    improve_pass_exam_year: "",
    improve_pass_paper: "",
    improve_pass_cgpa: "",
    improve_pass_grade: ""
  },
  schema_two: {
    //exam id
    exam_id: "",
    first_semester_exam_code: "8111",
    //regular student
    regular_ac_session: "",
    elective_papers: "",
    //irregular student
    irregular_ac_session: "",
    irregular_exam_year: "",
    irregular_elective_papers: "",
    //irregular student session wise
    irregular_fail_ac_session: "",
    irregular_fail_exam_year: "",
    irregular_fail_grade: "",
    //improvement student
    improve_ment_pass_sess: "",
    improve_pass_exam_year: "",
    improve_pass_paper: "",
    improve_pass_grade: "",
    improve_pass_cgpa: ""
  },

  schema_three: {
    //exam id
    exam_id: "",
    //regular student
    regular_ac_session: [],
    regular_grade: [],
    second_year_exam_code: "2202",
    //irregular student
    irregular_year: [],
    irregular_grade: [],
    //improvement student
    improve_ac_session: [],
    improve_year: [],
    improve_grade: []
  }
};

const getters = {
  bedFirstSemester(state) {
    return state.schema_one;
  },
  bedSecondSemester(state) {
    return state.schema_two;
  },
  bedThirdSemester(state) {
    return state.schema_three;
  }
};

const mutations = {
  //get data from api
  [GET_FEE_HEADS](state, result) {
    state.feeHeads = result;
  },
  [SET_BED_PROF_FIRST_SEMESTER_FORM_DATA](state, result) {
    state.schema_one = result;
  },
  [SET_BED_PROF_SECOND_SEMESTER_FORM_DATA](state, result) {
    state.schema_two = result;
  },
  [SET_BED_PROF_THIRD_SEMESTER_FORM_DATA](state, result) {
    state.schema_three = result;
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

  generateProbableBedProfFirstSem({ commit, state }, schema) {
    const data = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(bedProfSemesterOne, data)
        .then(function(response) {
          commit("UNSET_LOADING");
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
  },

  generateProbableBedProfSecSem({ commit, state }, schema) {
    const data = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(bedProfSemesterTwo, data)
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
  },

  generateProbableBedProfThirdSem({ commit, state }, schema) {
    const data = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(bedProfSemesterThree, data)
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
