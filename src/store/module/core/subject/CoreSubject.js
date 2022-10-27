import Axios from "axios";
import {
  GET_SUBJECT_DATA,
  SET_SUBJECT_FORM_DATA
} from "../../../mutation-types";
import { SubjectDataApi, SubjectByDegree } from "../../../api";
import { saveMsg, updateMsg } from "../../../erpUtil";
import { failedMsg } from "../../../erpUtil";

const state = {
  subjectList: [],
  schema: {
    id: "",
    degree_code: "",
    degree_group_code: "",
    subject_code: "",
    subject_name: "",
    status: 1
  }
};

const getters = {
  getSubjectData(state) {
    return state.subjectList;
  },
  getSchemaData(state) {
    return state.schema;
  }
};

const mutations = {
  [GET_SUBJECT_DATA](state, result) {
    state.subjectList = result;
  },

  [SET_SUBJECT_FORM_DATA](state, result) {
    state.schema = result;
  }
};

const actions = {
  fetchSubjectList({ commit }, SearchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(SubjectDataApi, { params: SearchParam })
        .then(function(response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_SUBJECT_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },

  subjectByDegree({ commit }, SearchParam) {
    return new Promise(function (resolve, reject) {
      commit("SET_LOADING", { color: "primary" });
      Axios.get(SubjectByDegree, { params: SearchParam })
        .then(function (response) {
          commit("UNSET_LOADING");
          let result = response.data.data;
          commit("GET_SUBJECT_DATA", result);
          resolve(response.data);
        })
        .catch(function (error) {
          commit("UNSET_LOADING");
          console.log(error);
          reject();
        });
    });
  },

  // save data
  saveSubjectData({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(SubjectDataApi, data)
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

  updateSubjectData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    const url = `${SubjectDataApi}/${data.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.put(url, data)
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
