import Axios from "axios";

import { SET_REGISTRATION_LIST_DATA } from "../../mutation-types";

import { RegistrationListApi } from "../../api";

const state = {
  schema: {
    id: "",
    reg_no: "",
    admission_roll: "",
    name: "",
    name_bn: "",
    father_name: "",
    father_name_bn: "",
    mother_name: "",
    mother_name_bn: "",
    session_year: "",
    session_year_expire: "",
    degree_code: "",
    degree_group_code: "",
    college_code: "",
    college_name: "",
    subject_code: "",
    exam_code: "",
    exam_name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    student_type: "",
    gender: "",
    photo_url: "",
    admission_score: "",
    merit_position: "",
    created_by: "",
    updated_by: "",
    deleted_by: "",
    created_at: "",
    updated_at: ""
  },
  datalist: []
};

const getters = {
  getRegistrationListItem(state) {
    return state.datalist;
  }
};
const mutations = {
  [SET_REGISTRATION_LIST_DATA](state, result) {
    state.datalist = result;
  }
};
const actions = {
  //all data
  fetchRegistrationListData({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading Opening
      Axios.get(RegistrationListApi)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_REGISTRATION_LIST_DATA", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          reject();
        });
    });
  },
  //after search data
  searchRegistrationList({ commit }, searchParam) {
    //console.log(JSON.stringify(searchParam));
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });

      Axios.get(RegistrationListApi, {
        params: searchParam
      })

        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // console.log(JSON.stringify(response.data.data));
          commit("SET_REGISTRATION_LIST_DATA", result);
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
  // searchRegistrationList({ commit }, searchParam) {
  //   console.log("search Action --->", searchParam);
  //   return new Promise((resolve, reject) => {
  //     commit("SET_LOADING", {
  //       color: "primary"
  //     });
  //     // loading  Opening
  //     Axios.get(RegistrationListApi, {
  //       params: searchParam
  //     })

  //       .then(function(response) {
  //         // console.log("search:  in then ??");
  //         commit("UNSET_LOADING"); // loading Closing
  //         var result = response.data.data;
  //         console.log(response.data.data);
  //         commit("SET_REGISTRATION_LIST_DATA", result);
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
