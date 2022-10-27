import Axios from "axios";

import { SET_TRANSCRIPT_DATA } from "../../mutation-types";

import { Transcript_FetchUrl } from "../../api";

const state = {
  schema: {
    id: "",
    reg_no: "",
    name: "",
    exam_name: "",
    exam_title: "",
    college_name: "",
    college_code: "",
    session: "",
    year: "",
    total: ""
  },
  datalist: []
};

const getters = {
  getTranscriptItemm(state) {
    return state.datalist;
  }
};
const mutations = {
  [SET_TRANSCRIPT_DATA](state, result) {
    state.datalist = result;
  }
};
const actions = {
  //all data
  fetchTranscriptData({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading Opening
      Axios.get(Transcript_FetchUrl)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_TRANSCRIPT_DATA", result);
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
  searchTranscript({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(Transcript_FetchUrl, {
        params: searchParam
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log(response.data.data);
          commit("SET_TRANSCRIPT_DATA", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
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
