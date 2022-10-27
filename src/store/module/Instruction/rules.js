import Axios from "axios";
import { saveMsg, updateMsg, failedMsg } from "../../erpUtil";

import {
    GET_RULES_LIST,
    UN_SET_RULES_LIST,
    GET_SINGLE_RULES
} from "../../mutation-types";

import { rulesDataApi } from "../../api";

const state = {
    rulesList :[],
    schema: {
        id: "",
        rule: "",
        expire_date: "",
        student_panel: "",
        college_panel: "",
        college_user_panel: "",
        center_panel: "",
        degree_code: "",
        degree_group_code: "",
        subject_code: "",
        status: ""
      }
};

const getters = {
    getInstRulesList(state){
        return state.rulesList;
    },
    getSingleRules(state) {
        return state.schema;
    }
};

const mutations = {
    [GET_RULES_LIST](state, result){
        state.rulesList = result;
    },
    [UN_SET_RULES_LIST](state){
        state.rulesList = [];
    },
    [GET_SINGLE_RULES](state, result) {
        state.schema = result;
      }
};

const actions = {
    getInstRulesList({ commit }, schema) {
        return new Promise(function(resolve, reject) {
          commit("UN_SET_RULES_LIST");
          commit("SET_LOADING", { color: "primary" });
          Axios.get(rulesDataApi)
            .then(function(response) {
              commit("UNSET_LOADING");
              let result = response.data.data;
              commit("GET_RULES_LIST", result);
              resolve();
            })
            .catch(function(error) {
              commit("UNSET_LOADING");
              //reject();
            });
        });
    },

    submitRule({ commit }, schema) {
        let data = schema;
        return new Promise((resolve, reject) => {
          commit("SET_LOADING", {
            color: "primary"
          }); // loading Opening
          Axios.post(rulesDataApi, data)
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

    updateRule({ commit }, schema) {
        let data = schema;
        //const url = `${rulesDataApi}/${data.id}`;
        return new Promise((resolve, reject) => {
            commit("SET_LOADING", {
            color: "primary"
            }); // loading Opening
            Axios.put(rulesDataApi + '/'+ data.id, data)
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

    deleteRule({ commit }, schema) {
      commit("SET_ACTION_PROCESS");
      let data = schema;
      const url = `${rulesDataApi}/${data.id}`;
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