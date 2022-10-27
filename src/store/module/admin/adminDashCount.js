import Axios from "axios";

import { SET_TOTAL_ADMIN_STATUS_IN } from "../../mutation-types";

import { AdminStatisticsApi } from "../../api";

const state = {
  totalStatus: {
    total_center: "",
    total_invigilator: "",
    total_user: "",
    total_regional_center: ""
    // question: {
    //     total_questions: ""
    // },
    // blank_script: {
    //     total_collection: ""
    // },
    // answer_script: {
    //     total_distribution: ""
    // },
    // loose_script: {
    //     total_distribution: ""
    // }
  }
};
const getters = {
  getTotalAdminStatistics(state) {
    return state.totalStatus;
  }
};
// mutations
const mutations = {
  [SET_TOTAL_ADMIN_STATUS_IN](state, response) {
    // console.log("in SET_TOTAL_STATUS_IN", response);
    state.totalStatus = response;
  }
};
// Actions
const actions = {
  collectTotalAdminStatistics({ commit }) {
    // console.log("in CollectTotalStatistics");

    // var params = new URLSearchParams();
    // params.append("email", authUser.email);
    // params.append("password", authUser.password);

    return new Promise((resolve, reject) => {
      // console.log("in CollectTotalStatistics in promise");
      Axios.get(AdminStatisticsApi)
        .then(function(response) {
          // console.log("in CollectTotalStatistics in then");
          // console.log("response.data", response.data);
          // console.log("success");
          console.log("res", response);
          var result = response.data.data;
          commit("SET_TOTAL_ADMIN_STATUS_IN", result);
          resolve();

          // var token = response.data.token;
          // var expires = response.data.expires;
          // localStorage.setItem("token", token);
          // localStorage.setItem("expires", expires);

          // commit("SET_LOGGED_IN");
          // commit("SET_AUTH_USER", {
          //   email: authUser.email,
          //   password: authUser.password
          // });
          // commit("SET_USER_TOKEN", token);
          // resolve();
        })
        .catch(function(error) {
          // localStorage.setItem("token", "");
          // localStorage.setItem("expires", "");

          // commit("UNSET_LOGGED_IN");
          // commit("UNSET_AUTH_USER");/
          // commit("UNSET_USER_TOKEN");
          // console.log("in CollectTotalStatistics in error", error);
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
