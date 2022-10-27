// axios
import Axios from "axios";

// apis
import { ResultLogicApi, ResultTypeApi } from "../../api";
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// mutation types
import {
  SET_RESULT_LOGIC_DATA,
  SET_RESULT_TYPE_DATA,
  ADD_RESULT_TYPE_DATA,
  SET_RESULT_TYPE_SCHEMA,
  UNSET_RESULT_TYPE_SCHEMA,
  ADD_RESULT_LOGIC_DATA,
  SET_RESULT_LOGIC_SCHEMA,
  UNSET_RESULT_LOGIC_SCHEMA,
} from "../../mutation-types";

const state = {
  schema: {
    id: "",
    exam_code: "",
    exam_year: "",
    exam_initiate_id: "",
    result_type_name: "",
    result_type: "",
    all_passed: "",
    passed_count: null,
    failed_count: "",
    absent_count: "",
    is_withheld: null,
    is_reported: null,
    is_cancelled: null,
    is_incourse_withheld: null,
    created_at: "",
    updated_at: "",
    deleted_at: "",
  },
  typeSchema: {
    id: "",
    result_type: "",
    result_type_name: "",
    created_at: "",
    updated_at: "",
    result_type_id: "",
    status: false,
  },
  resultLogicData: [],
  resulttypedata: [],
};

// getters
const getters = {
  // get data lsit
  getResultLogicData(state) {
    return state.resultLogicData;
  },
  getResultLogicSchema(state) {
    return state.schema;
  },
  getResultTypeData(state) {
    return state.resulttypedata;
  },
  getResultTypeSchema(state) {
    return state.typeSchema;
  },
};

// mutations
const mutations = {
  // set data list
  [SET_RESULT_LOGIC_DATA](state, result) {
    state.resultLogicData = result;
  },
  [SET_RESULT_TYPE_DATA](state, result) {
    state.resulttypedata = result;
  },
  [ADD_RESULT_LOGIC_DATA](state, jschema) {
    state.resultLogicData.push(jschema);
  },
  // set form schema
  [SET_RESULT_LOGIC_SCHEMA](state, schemaData) {
    state.schema = schemaData;
  },
  // unset form schema
  [UNSET_RESULT_LOGIC_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      exam_code: "",
      exam_year: "",
      exam_initiate_id: "",
      result_type_name: "",
      result_type: "",
      all_passed: "",
      passed_count: null,
      failed_count: "",
      absent_count: "",
      is_withheld: null,
      is_reported: null,
      is_cancelled: null,
      is_incourse_withheld: null,
      created_at: "",
      updated_at: "",
      deleted_at: "",
    };
  },
  [ADD_RESULT_TYPE_DATA](state, jschema) {
    state.resulttypedata.push(jschema);
  },
  // set form schema
  [SET_RESULT_TYPE_SCHEMA](state, schemaData) {
    state.typeSchema = schemaData;
  },
  // unset form schema
  [UNSET_RESULT_TYPE_SCHEMA](state) {
    state.typeSchema = {
      id: state.schema.id,
      result_type: "",
      result_type_name: "",
      created_at: "",
      updated_at: "",
      result_type_id: "",
      status: "",
    };
  },
};

const actions = {
  // get data list
  searchResultLogicData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(ResultLogicApi, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data.data;
          console.log("result", result);
          commit("SET_RESULT_LOGIC_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  // delete data
  deleteResultLogicItem({ commit }, item) {
    let url = `${ResultLogicApi}/${item}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.delete(url)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: deleteMsg,
              color: "green",
            });
            resolve("done");
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
  // save data
  saveResultLogicData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.post(ResultLogicApi, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("ADD_RESULT_LOGIC_DATA", data);
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green",
            });
            commit("UNSET_FORMNOTIFY");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message,
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
  // edit or update data
  editResultLogicData({ commit }, schema) {
    let data = schema;
    console.log("DATA ACTION ", data);
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    const url = `${ResultLogicApi}/${data.id}`;
    console.log(" bef url", url);

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.put(url, data)
        .then(function(response) {
          console.log("after response edit", response.data);
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: updateMsg,
              color: "green",
            });
            commit("UNSET_FORMNOTIFY");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message,
            });
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          console.log(error);
          reject();
        });
    });
  },
  ///result type.......
  //get result type
  searchResultTypeData({ commit }) {
    return new Promise(function(resolve, reject) {
      Axios.get(ResultTypeApi)
        .then(function(response) {
          var result = response.data.data;
          console.log("result", result);
          commit("SET_RESULT_TYPE_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  // delete data
  deleteResultTypeItem({ commit }, item) {
    let url = `${ResultTypeApi}/${item}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.delete(url)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: deleteMsg,
              color: "green",
            });
            resolve("done");
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
  // save data
  saveResultTypeData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.post(ResultTypeApi, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("ADD_RESULT_TYPE_DATA", data);
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green",
            });
            commit("UNSET_FORMNOTIFY");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message,
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
  // edit or update data
  editResultTypeData({ commit }, schema) {
    let data = schema;
    console.log("DATA ACTION ", data);
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    const url = `${ResultTypeApi}/${data.id}`;
    console.log(" bef url", url);

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.put(url, data)
        .then(function(response) {
          console.log("after response edit", response.data);
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: updateMsg,
              color: "green",
            });
            commit("UNSET_FORMNOTIFY");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message,
            });
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          console.log(error);
          reject();
        });
    });
  },
  exportResultLogic({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise((resolve, reject) => {
      Axios({
        url: ResultLogicApi,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log(url);

          // showing on a new tab
          var fileLink = document.createElement("a"); //  Creating a new <a> tag dynamically
          fileLink.href = url; // assigning url to that
          fileLink.download = "gradingSystem_" + Date.now() + ".pdf"; // giving it a name
          fileLink.target = "_blank"; // ensuring that it goes to the new tab
          //After all that is done
          document.body.appendChild(fileLink); // attaching the <a> tag to the document body
          fileLink.click(); // finally clicking it  .
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log("I am in error", error);
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
