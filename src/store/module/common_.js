import Axios from "axios";

import {
  SET_LOGGED_IN,
  UNSET_LOGGED_IN,
  SET_MESSAGE,
  UNSET_MESSAGE,
  SET_AUTH_USER,
  UNSET_AUTH_USER
} from "../mutation-types";

import { loginUrl } from "../api";
/*import {
  failedMsg, loadMsg, saveMsg, updateMsg, deleteMsg
}from '../erpUtil'*/

// initial state

const state = {
  loggedIn: false,
  otp_status: false,
  authUser: {
    user_id: 0,
    user_name: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: ""
  }
};
const getters = {
  getLoggedIn(state) {
    return state.loggedIn;
  },
  getUserId(state) {
    return state.user_id;
  },
  getAuthUser(state) {
    return state.authUser;
  },
  getMessage(state) {
    return state.message;
  }
};
// mutations
const mutations = {
  [SET_LOGGED_IN](state, id) {
    state.user_id = id;
    state.loggedIn = true;
  },
  [UNSET_LOGGED_IN](state) {
    state.user_id = 0;
    (state.loggedIn = false),
      (state.otp_status = false),
      (state.deviceStatus = false),
      (state.authUser = {
        user_id: 0,
        user_name: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        mobile: ""
      });
  },
  [SET_AUTH_USER](state, user) {
    state.authUser = user;
  },
  [SET_MESSAGE](state, Msg) {
    state.message = Msg;
  },
  [UNSET_MESSAGE](state) {
    state.message = "";
  }
};
// Actions
const actions = {
  authenticateUser({ commit }, { user }) {
    var params = new URLSearchParams();
    params.append("email", user.email);
    params.append("password", user.password);
    params.append("type", user.type_id);

    return new Promise((resolve, reject) => {
      Axios.post(loginUrl, params)
        .then(function(response) {
          //console.log(response)
          if (response.data.status == "success") {
            commit("SET_LOGGED_IN", response.data.user.user_id);
            commit("SET_AUTH_USER", response.data.user);
            //SessionStorage.set("user_id", response.data.data.user_id);
            //SessionStorage.set("profile", profile);
            commit("UNSET_MESSAGE");
            resolve();
          } else {
            //toastMessage('negative', failedMsg)
            commit("SET_MESSAGE", response.data.msg);
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          //toastMessage('negative', failedMsg)
          commit("UNSET_LOGGED_IN");
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
