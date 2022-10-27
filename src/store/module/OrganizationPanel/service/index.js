import Axios from "axios";
import { saveMsg, updateMsg } from "../../../erpUtil";
import { failedMsg } from "../../../erpUtil";

import { GET_ORG_CV_DATA } from "../../../mutation-types";
import { organizationCVlist, generatePaySlip } from "../../../api";

const state = {
  cv_list: []
};

const getters = {
  getCVData(state) {
    return state.cv_list;
  }
};

const mutations = {
  [GET_ORG_CV_DATA](state, result) {
    state.cv_list = result;
  }
};

const actions = {
  fetchCvData({ state, commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(organizationCVlist)
        .then(function(response) {
          state.cv_list = response.data.data;
          let result = response.data.data;
          //console.log(response);
          commit("GET_ORG_CV_DATA", result);
          resolve(response.data.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        })
        .then(() => {
          commit("UNSET_LOADING");
        });
    });
  },
  generatePaySlip({ commit }, data) {
    commit("SET_LOADING", {
      color: "primary"
    });
    // var params = new URLSearchParams();
    let url = `${generatePaySlip}`;
    return new Promise((resolve, reject) => {
      Axios.get(url, data)
        .then(response => {
          console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "orgPaySlip.pdf"); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch(() => {
          reject();
        })
        .then(() => {
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
