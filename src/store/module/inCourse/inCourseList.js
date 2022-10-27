import Axios from "axios";

import { SET_IN_COURSE_DATA } from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

import { IncourseApi } from "../../api";

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
    details: []
  },
  datalist: []
};

const getters = {
  // get data lsit
  getInCourseListItem(state) {
    return state.datalist;
  },
  // get form schema
  getInCourseListSchema(state) {
    return state.schema;
  }
};
const mutations = {
  //set data
  [SET_IN_COURSE_DATA](state, result) {
    state.datalist = result;
    console.log("data ", state.datalist);
  }

  //set data
};
const actions = {
  //all data
  fetchInCourseListData({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading Opening
      Axios.get(IncourseApi)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_IN_COURSE_DATA", result);

          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  //after search data
  searchInCourseListData({ commit }, searchParam) {
    console.log(JSON.stringify(searchParam));
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // console.log("FormFillUpAllUrl:", FormFillUpAllUrl);
      // loading  Opening
      Axios.get(IncourseApi, {
        params: searchParam
      })

        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // console.log(JSON.stringify(response.data.data));
          commit("SET_IN_COURSE_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  }
  // searchInCourseListData({ commit }, searchParam) {
  //   console.log("search Action", searchParam);
  //   return new Promise((resolve, reject) => {
  //     commit("SET_LOADING", {
  //       color: "primary"
  //     });
  //     // loading  Opening
  //     Axios.get(IncourseApi, {
  //       params: searchParam
  //     })

  //       .then(function(response) {
  //         // console.log("search:  in then ??");
  //         commit("UNSET_LOADING"); // loading Closing
  //         var result = response.data.data;
  //         console.log(response.data.data);
  //         commit("SET_IN_COURSE_DATA", result);
  //         resolve();
  //       })
  //       .catch(function(error) {
  //         console.log("searchFormFillup: in catch ??");
  //         commit("UNSET_LOADING"); // loading Closing
  //         console.log(error);
  //         reject();
  //       });
  //   });
  // }
};

export default {
  state,
  getters,
  actions,
  mutations
};
