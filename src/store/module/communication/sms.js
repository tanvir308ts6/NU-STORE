import Axios from "axios";

import {
  SET_LOGGED_IN,
  UNSET_LOGGED_IN,
  SET_MESSAGE,
  UNSET_MESSAGE,
  SET_AUTH_USER,
  UNSET_AUTH_USER
} from "../../mutation-types";

import { SMSApi } from "../../api";

const state = {};
const getters = {};
// mutations
const mutations = {};
// Actions
const actions = {
  sendSMS({ commit }, sms) {
    console.log("in sendMail Action", sms);

    var params = new URLSearchParams();
    params.append("phone", sms.phone);
    params.append("body", sms.body);

    return new Promise((resolve, reject) => {
      Axios.post(SMSApi, params)
        .then(function(response) {
          console.log("in sendMail Action -> then");
          console.log(response);
          if (response.data.status == "success") {
            resolve(response.data.message);
          } else {
            reject(response.data.message);
          }
        })
        .catch(function(error) {
          console.log("in sendMail Action -> Error");
          console.log(error);
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
