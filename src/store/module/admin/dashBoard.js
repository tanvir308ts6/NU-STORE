import Axios from "axios";

import { SET_DASHBOARD_DATA } from "../../mutation-types";

import { adminDashboardUrl } from "../../api";

const state = {
  totalStatus: {
    total_center: "",
    total_invigilator: "",
    total_user: "",
    total_regional_center: "",
    exams_status: [],
  },
};
const getters = {
  getDashboardData(state) {
    return state.totalStatus;
  },
};
// mutations
const mutations = {
  [SET_DASHBOARD_DATA](state, response) {
    state.totalStatus = response;
  },
};
// Actions
const actions = {
  getDashData({ commit }) {
    return new Promise((resolve, reject) => {
      Axios.get(adminDashboardUrl)
        .then(function(response) {
          console.log("res", response);
          var result = response.data.data;
          commit("SET_DASHBOARD_DATA", result);
          resolve();
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
