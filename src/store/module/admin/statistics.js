import Axios from "axios";

import { SET_TOTAL_STATUS_IN } from "../../mutation-types";

import { AdminStatistics } from "../../api";

const state = {
  totalStatus: {
    centers: -1,
    exainers: -1,
    invigilators: -1,
    regCenters: -1,
    users: -1,
  },
};
const getters = {
  getTotalStatus(state) {
    return state.totalStatus;
  },
};
// mutations
const mutations = {
  [SET_TOTAL_STATUS_IN](state, response) {
    // console.log("in SET_TOTAL_STATUS_IN", response);
    state.totalStatus = response;
  },
};
// Actions
const actions = {
  collectTotalStatistics({ commit }) {
    // console.log("in CollectTotalStatistics");

    // var params = new URLSearchParams();
    // params.append("email", authUser.email);
    // params.append("password", authUser.password);

    return new Promise((resolve, reject) => {
      // console.log("in CollectTotalStatistics in promise");
      Axios.get(AdminStatistics)
        .then(function(response) {
          // console.log("in CollectTotalStatistics in then");
          // console.log("response.data", response.data);

          if (response.data.status == "success") {
            // console.log("success");
            commit("SET_TOTAL_STATUS_IN", response.data.data);
            resolve(response);
          } else {
            // console.log("error");
            //toastMessage('negative', failedMsg)
            // commit("SET_MESSAGE", response.data.msg);
            reject();
          }

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
