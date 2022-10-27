import Axios from "axios";
let student_token = localStorage.getItem("student_token");
if (student_token) {
  Axios.defaults.headers.common["Authorization"] = "Bearer " + student_token;
}
import {
  SET_STUDENT_FORM_FILL_UP_Subject,
  UNSET_STUDENT_FORM_FILL_UP_Subject,
  UNSET_STUDENT_FORM_FILL_UP_OPTIONS,
  GET_STUDENT_FORM_FILL_UP_FEES,
  GET_Form_Fill_Up_Student_Confirmed_Details,
  UNSET_Form_Fill_Up_Student_Confirmed_Details,
  GET_FORM_FILL_UP_FEE_HISTORY,
  UNSET_FORM_FILL_UP_FEE_HISTORY,
  GET_PAIR_PAPER_DATA
} from "../../mutation-types";
import {
  studentFormFillUpSubjectUrl,
  formFillUpByStudentUrl,
  calculateFeePerStudent,
  getFormFillUpStudentConfirmedDetailsUrl,
  getStudentFormFillUpFeeHistoryUrl,
  pairPaperData
} from "../../api";
const state = {
  schema: {
    form_fill_up_id: null,
    confirm_subjects: [],
    student_info: {
      mobile: null
    }
  },
  student_form_fill_up_subject: [],
  pair_paper_data: {},
  student_form_fill_up_fees: [],
  student_form_fill_up_confirmed_data: {},
  student_form_fill_up_fee_history: {}
};
const getters = {
  getStudentFormFillUpSubject(state) {
    return state.student_form_fill_up_subject;
  },
  getPairPaperData(state) {
    return state.pair_paper_data;
  },
  formFillUpConfirmByStudent(state) {
    return state.schema;
  },
  getStudentFormFillUpFees(state) {
    return state.student_form_fill_up_fees;
  },
  getStudentConfirmedData(state) {
    return state.student_form_fill_up_confirmed_data;
  },
  getStudentFormFillUpFeeHistory(state) {
    return state.student_form_fill_up_fee_history;
  }
};
const mutations = {
  [SET_STUDENT_FORM_FILL_UP_Subject](state, result) {
    state.student_form_fill_up_subject = result;
  },
  [GET_PAIR_PAPER_DATA](state, result) {
    state.pair_paper_data = result;
  },
  [UNSET_STUDENT_FORM_FILL_UP_Subject](state) {
    state.student_form_fill_up_subject = [];
  },
  [GET_STUDENT_FORM_FILL_UP_FEES](state, data) {
    state.student_form_fill_up_fees = data;
  },
  [GET_Form_Fill_Up_Student_Confirmed_Details](state, data) {
    state.student_form_fill_up_confirmed_data = data;
  },
  [UNSET_Form_Fill_Up_Student_Confirmed_Details](state) {
    state.student_form_fill_up_confirmed_data = {};
  },
  [GET_FORM_FILL_UP_FEE_HISTORY](state, data) {
    state.student_form_fill_up_fee_history = data;
  },
  [UNSET_FORM_FILL_UP_FEE_HISTORY](state) {
    state.student_form_fill_up_fee_history = {};
  }
};
const actions = {
  calculateFeePerStudent({ commit, state }, options) {
    let url = calculateFeePerStudent;
    return new Promise(async function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      await Axios.post(url, options)
        .then(res => {
          commit("GET_STUDENT_FORM_FILL_UP_FEES", res.data.data);
          resolve(res.data.data);
        })
        .catch(error => {
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  getStudentFormFillUpSubject({ commit, state }, form_fill_up_id) {
    // const self = this
    let url = `${studentFormFillUpSubjectUrl}/${form_fill_up_id}`;
    // console.log(url)
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(url)
        .then(function(response) {
          let result = response.data.data;
          localStorage.setItem(
            "student_form_fill_up_subjects",
            JSON.stringify(result)
          );
          commit("SET_STUDENT_FORM_FILL_UP_Subject", result);
          commit("UNSET_STUDENT_FORM_FILL_UP_OPTIONS");

          resolve(response);
        })
        .catch(function(error) {
          commit("UNSET_STUDENT_FORM_FILL_UP_Subject");
          localStorage.removeItem("student_form_fill_up_subjects");
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  getPairPaperData({ commit, state }, formData) {
    commit("SET_LOADING", { color: "primary" });
    return new Promise(async function(resolve, reject) {
      const resp = await Axios.get(pairPaperData, formData)
        .then(function(response) {
          let result = response.data.data;
          commit("GET_PAIR_PAPER_DATA", result);
          resolve(response);
        })
        .catch(function(error) {
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  formFillUpConfirmByStudent({ commit, state }, formData) {
    let url = `${formFillUpByStudentUrl}`;
    // console.log(formData)
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(url, formData)
        .then(function(response) {
          commit("UNSET_STUDENT_FORM_FILL_UP_Subject");
          localStorage.removeItem("student_form_fill_up_subjects");
          resolve();
        })
        .catch(function(error) {
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  getFormFillUpStudentConfirmedDetails({ commit, state }, form_fill_up_id) {
    let url = `${getFormFillUpStudentConfirmedDetailsUrl}/${form_fill_up_id}`;
    var params = new URLSearchParams();
    params.append("form_fill_up_id", form_fill_up_id);
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(url, params)
        .then(function(response) {
          commit(
            "GET_Form_Fill_Up_Student_Confirmed_Details",
            response.data.data
          );
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_Form_Fill_Up_Student_Confirmed_Details");
          reject();
        })
        .then(always => {
          commit("UNSET_LOADING");
        });
    });
  },
  getStudentFormFillUpFeeHistory({ commit, state }, form_fill_up_id) {
    let url = `${getStudentFormFillUpFeeHistoryUrl}/${form_fill_up_id}`;
    var params = new URLSearchParams();
    params.append("form_fill_up_id", form_fill_up_id);
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(url, params)
        .then(function(response) {
          commit("GET_FORM_FILL_UP_FEE_HISTORY", response.data.data);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_FORM_FILL_UP_FEE_HISTORY");
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
