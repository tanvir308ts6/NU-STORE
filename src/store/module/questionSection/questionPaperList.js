// axios
import Axios from "axios";

// apis
import { QuesEntry_FetchUrl } from "../../api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_QUES_ENTRY_DATA,
  ADD_QUES_ENTRY_DATA,
  SET_QUES_ENTRY_SCHEMA,
  UNSET_QUES_ENTRY_SCHEMA
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    college_code: "",
    subject_code: "",
    paper_code: "",
    center_code: "",
    qty: "",
    size: "",
    exam_code: "",
    session: "",
    exam_year: "",
    status: "",
    created_at: "",
    updated_at: "",
    deleted_at: ""
  },
  datalist: []
};

// getters
const getters = {
  // get data lsit
  getQuesEntryDataList(state) {
    return state.datalist;
  },
  // get form schema
  getQuesEntrySchema(state) {
    return state.schema;
  }
};

// mutations
const mutations = {
  // set data list
  [SET_QUES_ENTRY_DATA](state, result) {
    state.datalist = result;
  },
  // set item to datalist
  [ADD_QUES_ENTRY_DATA](state, jschema) {
    state.datalist.push(jschema);
  },
  // set action process
  [SET_ACTION_PROCESS](state) {
    state.action_process = true;
  },
  // unset action process
  [UNSET_ACTION_PROCESS](state) {
    state.action_process = false;
  },
  // set form schema
  [SET_QUES_ENTRY_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    //state.schema.exam_id = parseInt(state.schema.exam_id);
  },
  // unset form schema
  [UNSET_QUES_ENTRY_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      college_code: "",
      subject_code: "",
      paper_code: "",
      center_code: "",
      session: "",
      qty: "",
      size: "",
      exam_code: "",
      exam_year: "",
      status: "",
      created_at: "",
      updated_at: "",
      deleted_at: ""
    };
  }
};

const actions = {
  // get data list
  fetchQuesEntryData({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.get(QuesEntry_FetchUrl)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_QUES_ENTRY_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },
  // delete data
  deleteQuesEntryItem({ commit }, item) {
    console.log("delete ac", item);
    let url = `${QuesEntry_FetchUrl}/${item}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.delete(url)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: deleteMsg,
              color: "green"
            });
            resolve("done");
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
  // save data
  saveQuesEntryData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    data["status"] = 1;
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(QuesEntry_FetchUrl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("ADD_QUES_ENTRY_DATA", schema);
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
  //after search data
  searchQuestionPaperData({ commit }, searchParam) {
    console.log("search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(QuesEntry_FetchUrl, {
        params: searchParam
      })

        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log(response.data.data);
          commit("SET_QUES_ENTRY_DATA", result);
          resolve();
        })
        .catch(function(error) {
          console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  // edit/update data
  editQuesEntryData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    console.log("DATA ACTION ", data);
    //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${QuesEntry_FetchUrl}/${data.id}`;
    console.log(QuesEntry_FetchUrl + " bef url", url);

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
