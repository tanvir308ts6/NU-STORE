import Axios from "axios";
import {
  REG_STUDENT_DATA,
  REG_STUDENT_SEARCH_PARAM
} from "../../mutation-types";
import { ExamListApi, RegistrationBasics } from "../../api";
import { saveMsg } from "../../erpUtil";
import { failedMsg } from "../../erpUtil";

const state = {
  registerStudentList: [],
  schema: {
    std_id: "",
    reg_no: "",
    name: "",
    college_code: "",
    ac_session: "",
    degree_code: "",
    degree_group_code: "",
    subject_code: ""
  }
};

const getters = {
  getRegStudentData(state) {
    return state.registerStudentList;
  },
  getSearchData(state) {
    return state.schema;
  }
};

const mutations = {
  //get data from api
  [REG_STUDENT_DATA](state, result) {
    state.registerStudentList = result;
  },
  [REG_STUDENT_SEARCH_PARAM](state, result) {
    state.schema = result;
  }
};

const actions = {
  fetchRegStudentList({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(RegistrationBasics, { params: searchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          //console.log(response);
          commit("REG_STUDENT_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
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
