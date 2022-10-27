import Axios from "axios";

import { RollGenerateUrl } from "@/store/api";
import { SET_ROLL_GEN_SUMMARY_DATA } from "../../mutation-types";
const state = {
  summaryData: {}
};

const getters = {
  getRollGenSummaryData(state) {
    return state.summaryData;
  }
};
const mutations = {
  [SET_ROLL_GEN_SUMMARY_DATA](state, result) {
    state.summaryData = result;
  }
};
const actions = {
  //all data
  startRollGenerate({ commit }, rollGenParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading Opening
      Axios.post(RollGenerateUrl, rollGenParam)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data.data;
          // console.log("in startRollGenerate response: ", response.data);
          commit("SET_SNACKBAR", {
            msg: "Roll Generated Successfully",
            color: "green"
          });
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          commit("SET_SNACKBAR", {
            msg: "Roll Generated Processed failed",
            color: "green"
          });
          reject();
        });
    });
  },
  fetchRollGenSummaryData({ commit }, rollGenParam) {
    if (rollGenParam != undefined) {
      rollGenParam.subject_code = "";
      rollGenParam.college_code = "";
    }

    console.log("here :: ", rollGenParam);
    return new Promise(function(resolve, reject) {
      Axios.get(RollGenerateUrl, {
        params: rollGenParam
      })
        .then(function(response) {
          var result = response.data;
          // console.log("in startRollGenerate response: ", response.data);
          commit("SET_ROLL_GEN_SUMMARY_DATA", result);
          console.log(result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          commit("SET_SNACKBAR", {
            msg: "Roll Generated Processed failed",
            color: "green"
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
