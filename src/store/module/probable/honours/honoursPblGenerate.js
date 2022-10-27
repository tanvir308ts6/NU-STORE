import Axios from "axios";
import {
  SET_HONOURS_PART_ONE_FORM_DATA,
  SET_HONOURS_PART_TWO_FORM_DATA,
  SET_HONOURS_PART_THREE_FORM_DATA,
  GET_FEE_HEADS
} from "../../../mutation-types";
import {
  honoursPartOne,
  honoursPartTwo,
  honoursPartThree,
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
    regular_ac_session: "",
    //irregular student
    irregular_ac_session: "",
    irregular_exam_year: "",
    irregular_grade: "",
    //improvement student
    improve_session: "",
    improve_exam_year: "",
    improve_grade: "",
    irregular: [{}],
    improvement: [{}]
  },
  schema_two: {
    //exam id
    exam_id: "",
    //regular student
    regular_ac_session: "",
    regular_grade: "",
    first_year_exam_code: "2201",
    //irregular student
    irregular_ac_session: "",
    irregular_exam_2ndyear: "",
    second_year_irregular_promoted_grade: "",
    //improvement student
    improve_ac_session: "",
    improve_year: "",
    improve_grade: ""
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
  // getFeeHeads(state) {
  //     return state.feeHeads;
  // },

  honoursFirstYear(state) {
    return state.schema_one;
  },
  honoursSecondYear(state) {
    return state.schema_two;
  },
  honoursThirdYear(state) {
    return state.schema_three;
  }
};

const mutations = {
  //get data from api
  [GET_FEE_HEADS](state, result) {
    state.feeHeads = result;
  },
  [SET_HONOURS_PART_ONE_FORM_DATA](state, result) {
    state.schema_one = result;
  },
  [SET_HONOURS_PART_TWO_FORM_DATA](state, result) {
    state.schema_two = result;
  },
  [SET_HONOURS_PART_THREE_FORM_DATA](state, result) {
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

  generateProbableHonoursPartOne({ commit, state }, schema) {
    const data = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(honoursPartOne, data)
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

  generateProbableHonoursPartTwo({ commit, state }, schema) {
    const data = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(honoursPartTwo, data)
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

  generateProbableHnsPartThree({ commit, state }, schema) {
    const data = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(honoursPartThree, data)
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
