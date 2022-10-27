import Axios from "axios";
import { saveMsg, updateMsg, failedMsg } from "../../erpUtil";

import {
  GET_NOTICE_LIST,
  UN_SET_NOTICE_LIST,
  GET_SINGLE_NOTICE
} from "../../mutation-types";

import { noticeDataApi } from "../../api";

const state = {
  noticeList: [],
  schema: {
    id: "",
    title: "",
    attachment: "",
    from_date: "",
    to_date: "",
    student_panel: "",
    college_panel: "",
    college_user_panel: "",
    center_panel: "",
    examineer_panel: "",
    status: ""
  }
};

const getters = {
  getInstNoticeList(state) {
    return state.noticeList;
  },
  getSingleNotice(state) {
    return state.schema;
  }
};

const mutations = {
  [GET_NOTICE_LIST](state, result) {
    state.noticeList = result;
  },
  [UN_SET_NOTICE_LIST](state) {
    state.noticeList = [];
  },
  [GET_SINGLE_NOTICE](state, result) {
    state.schema = result;
  }
};

const actions = {
  getInstNoticeList({ commit }, schema) {
    let data = schema;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(noticeDataApi, { params: data })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_NOTICE_LIST", result);
          resolve();
        })
        .catch(function(error) {
          commit("UN_SET_NOTICE_LIST");
          commit("UNSET_LOADING");
          //reject();
        });
    });
  },

  submitNotice({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(noticeDataApi, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          reject();
        });
    });
  },

  updateNotice({ commit }, schema) {
    let data = schema;
    //const url = `${noticeDataApi}/${data.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.put(noticeDataApi + "/" + data.id, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: updateMsg,
              color: "green"
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          console.log(error);
          reject();
        });
    });
  },

  deleteNotice({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    const url = `${noticeDataApi}/${data.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.delete(url, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
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
