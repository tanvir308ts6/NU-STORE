import Axios from "axios";
// import {
//   GET_RESCRUTINY_DATA,

// } from "../../mutation-types";
import { changePasswordUrl } from "../../api";
import { failedMsg } from "../../erpUtil";

const state = {
  schema: [],
  paperList: [],
};

const getters = {
  // getRescrunityExamList(state) {
  //   return state.schema;
  // },
};

const mutations = {
  //   [GET_RESCRUTINY_DATA](state, result) {
  //     state.schema = result;
  //   },
};

const actions = {
  ChangePassword({ commit }, data) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(changePasswordUrl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green",
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
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
