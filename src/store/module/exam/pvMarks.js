import Axios from "axios";

import { SET_PRACTICALVIVAEXAM_DATA } from "@/store/mutation-types";

import { practicalVivaExam } from "@/store/api";

//state
const state = { datalist: [] };
// geters
const getters = {
  getPracticalVivaExam(state) {
    return state.datalist;
  }
};
// mutations
const mutations = {
  [SET_PRACTICALVIVAEXAM_DATA](state, result) {
    state.datalist = result;
  }
};
// Actions
const actions = {
  fetchPVMarks({ commit }) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" }); // loading Opening
      Axios.get(practicalVivaExam)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            var result = response.data.data;
            commit("SET_PRACTICALVIVAEXAM_DATA", result);
            resolve();
          } else {
            commit("SET_SNACKBAR", { msg: response.data.status, color: "red" });
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          console.log("in submitPVMarks error");
          commit("SET_SNACKBAR", {
            msg: "Email Not Send, Please recheck",
            color: "pink"
          });
          reject();
        });
    });
  },
  //after search data
  searchPVMarksData({ commit }, searchParam) {
    console.log("search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(practicalVivaExam, {
        params: searchParam
      })
        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_PRACTICALVIVAEXAM_DATA", result);
          commit("SET_SNACKBAR", {
            msg: "SUCCESSFUL SEARCH",
            color: "green"
          });
          resolve();
        })
        .catch(function(error) {
          // console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          commit("SET_SNACKBAR", {
            msg: "Email Not Send, Please recheck",
            color: "pink"
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
