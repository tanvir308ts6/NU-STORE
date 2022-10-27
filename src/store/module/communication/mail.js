import Axios from "axios";
import Vue from "vue";

import {
  SET_LOGGED_IN,
  UNSET_LOGGED_IN,
  SET_MESSAGE,
  UNSET_MESSAGE,
  SET_AUTH_USER,
  UNSET_AUTH_USER
} from "../../mutation-types";

import { EmailApi } from "../../api";

const state = {};
const getters = {};
// mutations
const mutations = {};
// Actions
const actions = {
  sendMail({ commit }, mail) {
    console.log("in sendMail Action", mail);

    var params = new URLSearchParams();
    params.append("to", JSON.stringify(mail.to));
    params.append("subject", mail.subject);
    params.append("body", mail.body);
    params.append("sms_to", mail.sms_to);
    params.append("sms_mody", mail.sms_mody);

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" }); // loading Opening
      Axios.post(EmailApi, mail)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            console.log("in action sendMail");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            resolve(response.data.message);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
              timeout: 10000
            });
            reject(response.data.message);
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          commit("SET_SNACKBAR", {
            msg: "Email Not Send, Please recheck",
            color: "pink"
          });
          reject(error);
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
