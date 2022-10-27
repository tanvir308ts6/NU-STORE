import Axios from "axios";
import { studentFormFillUpOptionsUrl } from "../../api";
import { student_token } from "../../erpUtil";
import {
  GET_STUDENT_FORM_FILL_UP_OPTIONS,
  UNSET_STUDENT_FORM_FILL_UP_OPTIONS
} from "../../mutation-types";
let token = localStorage.getItem("student_token");
if (token) {
  // Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  Axios.defaults.headers.common["token_name"] = student_token;
}
const state = {
  form_fill_up_options: []
};
const getters = {
  getStudentFormFillUpOptions(state) {
    return state.form_fill_up_options;
  }
};
const mutations = {
  [GET_STUDENT_FORM_FILL_UP_OPTIONS](state, result) {
    state.form_fill_up_options = result;
  },
  [UNSET_STUDENT_FORM_FILL_UP_OPTIONS](state) {
    state.form_fill_up_options = [];
  }
};
const actions = {
  fetchStudentFormFillUpOptions({ commit, state }, authStudent) {
    const self = this;
    let url = `${studentFormFillUpOptionsUrl}/${authStudent.std_id}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(url, {
        headers: {
          token_name: student_token
        }
      })
        .then(function(response) {
          let result = response.data.data;
          commit("GET_STUDENT_FORM_FILL_UP_OPTIONS", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_STUDENT_FORM_FILL_UP_OPTIONS");
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
