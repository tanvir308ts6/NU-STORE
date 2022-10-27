import Axios from "axios";

import { SET_COLLEGE_LIST_DATA } from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

import { Collegeinfo_FetchUrl } from "../../api";

const state = {
  schema: {
    id: "",
    college_code: "",
    college_name: "",
    eiin: "",
    email: "",
    phone: "",
    mobile: "",
    password: "",
    web_url: "",
    fax: "",
    division_id: "",
    district_id: "",
    upazila_id: "",
    post_code: "",
    college_type: "",
    mgt_type: "",
    lat: "",
    long: "",
    lock: "",
    status: "",
    created_by: "",
    updated_by: "",
    deleted_by: "",
    created_at: "",
    updated_at: "",
    deleted_at: ""
  },
  datalist: []
};

const getters = {
  // get data lsit
  getCollegeListItem(state) {
    return state.datalist;
  },
  // get form schema
  getCollegeListSchema(state) {
    return state.schema;
  }
};
const mutations = {
  //set data
  [SET_COLLEGE_LIST_DATA](state, result) {
    state.datalist = result;
  }
};
const actions = {
  //all data
  fetchCollegeListData({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading Opening
      Axios.get(Collegeinfo_FetchUrl)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_COLLEGE_LIST_DATA", result);

          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  searchCollegeListData({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(Collegeinfo_FetchUrl, {
        params: searchParam
      })

        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log(response.data.data);
          commit("SET_COLLEGE_LIST_DATA", result);
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
  //after search data
  // searchCollegeListData({ commit }, searchParam) {
  //   console.log("search Action", searchParam);
  //   return new Promise((resolve, reject) => {
  //     commit("SET_LOADING", {
  //       color: "primary"
  //     });
  //     // loading  Opening
  //     Axios.get(Collegeinfo_FetchUrl, {
  //       params: searchParam
  //     })

  //       .then(function(response) {
  //         // console.log("search:  in then ??");
  //         commit("UNSET_LOADING"); // loading Closing
  //         var result = response.data.data;
  //         console.log(response.data.data);
  //         commit("SET_COLLEGE_LIST_DATA", result);
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
