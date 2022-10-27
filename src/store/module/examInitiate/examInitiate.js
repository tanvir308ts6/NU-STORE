/* eslint-disable prettier/prettier */
// axios
import Axios from "axios";

// apis
import {
  ExamInitiateApi
} from "../../api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_EXAM_INITIATE_DATA,
  ADD_EXAM_INITIATE_DATA,
  SET_EXAM_INITIATE_SCHEMA,
  UNSET_EXAM_INITIATE_SCHEMA,
} from "../../mutation-types";

// utilities
import {
  saveMsg,
  updateMsg,
  deleteMsg,
  failedMsg
} from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    exam_code: "",
    exam_name: "",
    exam_type: "",
    session: "",
    exam_type_name: "",
    year: "",
  },
  datalist: [],
};

// getters
const getters = {
  // get data lsit
  getExamInitiateList(state) {
    return state.datalist;
  },
  // get form schema
  getExamInitiateSchema(state) {
    return state.schema;
  },
};

// mutations
const mutations = {
  // set data list
  [SET_EXAM_INITIATE_DATA](state, result) {
    state.datalist = result;
  },
  //set item to datalist
  [ADD_EXAM_INITIATE_DATA](state, jschema) {
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
  [SET_EXAM_INITIATE_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    state.schema.exam_type = parseInt(schemaData.exam_type);
    //state.schema.exam_code = schemaData.exam_code.toString();
  },
  // unset form schema
  [UNSET_EXAM_INITIATE_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      exam_code: "",
      exam_name: "",
      exam_type: "",
      session: "",
      exam_type_name: "",
      year: "",
    };
  },
};

const actions = {
  // get data list
  callExamInitiateData({
    commit
  }, searchParam) {
    console.log("searchParam callExamInitiateData:", searchParam);

    return new Promise(function (resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.get(ExamInitiateApi, {
          params: searchParam
        })
        .then(function (response) {
          commit("UNSET_LOADING");
          var result = response.data.data;
          //   console.log("getSchema comes", response.data.data);
          commit("SET_EXAM_INITIATE_DATA", result);
          // return state.datalist;
          resolve(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  // delete data
  deleteExamInitiateItem({
    commit,
    state
  }, item) {
    console.log("delete called");
    let url = `${ExamInitiateApi}/${item}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.delete(url)
        .then(function (response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action delete");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green",
            });
            resolve(response.data.message);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
              timeout: 10000,
            });
            reject(response.data.message);
          }
        })
        .catch(function (error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          console.log("in state : ", error);
          reject();
        });
    });
  },
  // save data
  saveExamInitiateData({
    commit
  }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    data["status"] = 1;
    // commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.post(ExamInitiateApi, data)
        .then(function (response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action save");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green",
            });
            resolve(response.data.message);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
              timeout: 10000,
            });
            reject(response.data.message);
          }
        })
        .catch(function (error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          console.log("in state : ", error);
          reject();
        });
    });
  },
  // edit/update data
  editExamInitiateData({
    commit,
    state
  }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    const url = `${ExamInitiateApi}/${data.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.put(url, data)
        .then(function (response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action edit");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green",
            });

            resolve(response.data.message);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
              timeout: 10000,
            });
            reject(response.data.message);
          }
        })
        .catch(function (error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          console.log("in state : ", error);
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