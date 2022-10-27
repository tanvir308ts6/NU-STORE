// axios
import Axios from "axios";

// apis
import { ExamCommitteeApi } from "../../api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_EXAM_COMMITTEE_DATA,
  ADD_EXAM_COMMITTEE_DATA,
  SET_EXAM_COMMITTEE_SCHEMA,
  UNSET_EXAM_COMMITTEE_SCHEMA
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    name: "",
    year: "",
    exam_code: "",
    status: 1,
    members: [{}]
  },
  datalist: []
};

// getters
const getters = {
  // get data lsit
  getExamCommitteeList(state) {
    return state.datalist;
  },
  // get form schema
  getExamCommitteeSchema(state) {
    return state.schema;
  }
};

// mutations
const mutations = {
  // set data list
  [SET_EXAM_COMMITTEE_DATA](state, result) {
    state.datalist = result;
  },
  //set item to datalist
  [ADD_EXAM_COMMITTEE_DATA](state, jschema) {
    state.datalist.push(jschema);
  },
  // set message
  // [SET_MESSAGE](state, Msg) {
  //   state.message = Msg;
  // },
  // unset message
  // [UNSET_MESSAGE](state) {
  //   state.message = "";
  // },
  // set action process
  [SET_ACTION_PROCESS](state) {
    state.action_process = true;
  },
  // unset action process
  [UNSET_ACTION_PROCESS](state) {
    state.action_process = false;
  },
  // set form schema
  [SET_EXAM_COMMITTEE_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    //state.schema.exam_code = schemaData.exam_code.toString();
    state.schema.center_id = parseInt(state.schema.center_id);
    //state.schema.year = parseInt(state.schema.year);
  },
  // unset form schema
  [UNSET_EXAM_COMMITTEE_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      name: "",
      year: "",
      exam_code: "",
      status: "1",
      members: []
    };
  }
};

const actions = {
  // get data list
  callExamCommitteeData({ commit, state }, limit) {
    return new Promise(function(resolve, reject) {
      let url = `${ExamCommitteeApi}?limit=${limit.limit}&page=${limit.page}&search=${limit.search}`;
      Axios.get(url)
        .then(function(response) {
          var result = response.data.data;
          console.log("getSchema comes", response.data.data);
          commit("SET_EXAM_COMMITTEE_DATA", result);
          // return state.datalist;
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  // delete data
  deleteExamCommitteeItem({ commit, state }, item) {
    console.log("delete called");
    let url = `${ExamCommitteeApi}/${item}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.delete(url)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action delete");
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
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          console.log("in state : ", error);
          reject();
        });
    });
  },
  // save data
  saveExamCommitteeData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    data["status"] = 0;
    // commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.post(ExamCommitteeApi, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action save");
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
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          console.log("in state : ", error);
          reject();
        });
    });
  },
  // edit/update data
  editExamCommitteeData({ commit, state }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${ExamCommitteeApi}/${data.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.put(url, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action edit");
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
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          console.log("in state : ", error);
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
