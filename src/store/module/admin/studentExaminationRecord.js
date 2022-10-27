// axios
import Axios from "axios";

// apis
import { StudentExaminationRecordApi } from "../../api";

// mutation types
import { SET_STUDENT_EXAM_RECORD_DATA } from "../../mutation-types";

const state = {
  schema: {
    id: "",
    examiner: "",
    mark_entry: "",
    mark_re_entry: "",
    script_qr_code: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
  },
  studentexamrecordlist: [],
};

// getters
const getters = {
  // get data lsit
  getStudentExamRecordList(state) {
    return state.studentexamrecordlist;
  },
};

// mutations
const mutations = {
  // set data list
  [SET_STUDENT_EXAM_RECORD_DATA](state, result) {
    state.studentexamrecordlist = result;
  },
};

const actions = {
  // get data list
  searchStudentExaminationRecord({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(StudentExaminationRecordApi, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data;
          commit("SET_STUDENT_EXAM_RECORD_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
