import Axios from "axios";

import { SET_IN_COURSE_PV_WANTING_DATA, SET_IN_COURSE_PV_PAP_DATA, SET_IN_COURSE_PV_SUB_DATA } from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

import { IncoursePVWantingListApi, IncoursePVSubjectListApi, IncoursePVPaperListApi, IncoursePVMarkSaveApi } from "../../api";

const state = {
  schema: {
    id: "",
    reg_no: "",
    student_name: "",
    collge_code: "",
    college_name: "",
    exam_roll: "",
    exam_initiate_id: "",
    exam_code: "",
    exam_name: "",
    mandatory_papers: "",
    optional_papers: "",
    improvement_papers: "",
    start_date: "",
    end_date: "",
    student_confirm_status: "",
    student_confirmed_at: "",
    teacher_confirm_status: "",
    teacher_confirmed_at: "",
    teacher_confirmed_by: "",
    details: [],
  },
  datalist: [],
  incoursePVPap: [],
  incoursePVSub: [],
};

const getters = {
  // get data lsit
  getInCoursePVWantingList(state) {
    return state.datalist;
  },
  // get form schema
  // getInCourseListSchema(state) {
  //   return state.schema;
  // },
  getIncoursePVSub(state) {
    return state.incoursePVSub;
  },
  getIncoursePVPap(state) {
    return state.incoursePVPap;
  },
};
const mutations = {
  //set data
  [SET_IN_COURSE_PV_WANTING_DATA](state, result) {
    state.datalist = result;
  },

  [SET_IN_COURSE_PV_SUB_DATA](state, result) {
    state.incoursePVSub = result;
  },
  [SET_IN_COURSE_PV_PAP_DATA](state, result) {
    state.incoursePVPap = result;
  },
};
const actions = {
  //all data
  fetchInCoursePVWantingListData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.get(IncoursePVWantingListApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_IN_COURSE_PV_WANTING_DATA", result);

          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  //after search data
  searchInCoursePVListData({ commit }, searchParam) {
    console.log(JSON.stringify(searchParam));
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // console.log("FormFillUpAllUrl:", FormFillUpAllUrl);
      // loading  Opening
      Axios.get(IncoursePVWantingListApi, {
        params: searchParam,
      })

        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // console.log(JSON.stringify(response.data.data));
          commit("SET_IN_COURSE_PV_WANTING_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },

  //sub
  fetchInCoursePVSubData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(IncoursePVSubjectListApi, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data.data;

          commit("SET_IN_COURSE_PV_SUB_DATA", result);
          resolve(result);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  //pap
  fetchInCoursePVPapData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(IncoursePVPaperListApi, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data.data;

          commit("SET_IN_COURSE_PV_PAP_DATA", result);
          resolve(result);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  //submit mark
  submitInCoursePVMarks({ commit }, pvMarks) {
    // console.log("mitu submit v mark", pvMarks);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" }); // loading Opening
      Axios.post(IncoursePVMarkSaveApi, pvMarks)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.message === "Mark uploaded successfully! But skipped 1 scripts") {
            console.log("error");
            commit("SET_SNACKBAR", {
              msg: "invalid marks unchaged",
              color: "red",
            });
          }
          resolve(response.data.message);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          console.log("in submit error");
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
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
