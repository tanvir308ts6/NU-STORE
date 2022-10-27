// axios
import Axios from "axios";

// apis
import {
  graceMarkSummaryApi,
  graceMarkSummaryPdfApi,
  gracePassStdDetailsPdfApi,
} from "../../api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_GRACE_MARK_SUMMARY_DATA,
  ADD_GRACE_SUMMARY_DATA,
  SET_GRACE_SUMMARY_SCHEMA_DATA,
  UNSET_GRACE_SUMMARY_SCHEMA_DATA,
  SET_GRACE_PASS_STD_DATA,
  SET_GRACE_PASS_STD_SCHEMA,
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    exam_code: "",
    exam_year: "",
    exam_type: "",
    paper_code: "",
    grace_mark: "",
    total_student: "",
    target_student: "",
    current_pass_rate: "",
    overall_pass_rate: "",
    total_passed: "",
    total_failed: "31",
    lock: "",
    status: "",
    created_by: "",
    updated_by: "",
    deleted_by: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
  },
  datalist: [],
  gracePassstdList: [],
  gracePassstdSchema: {},
};

// getters
const getters = {
  // get data lsit
  getGraceSummaryList(state) {
    return state.datalist;
  },
  // get form schema
  getGraceMarkSchema(state) {
    return state.schema;
  },
  getGracePassstdList(state) {
    return state.gracePassstdList;
  },
  getGracePassstdSchema(state) {
    return state.gracePassstdSchema;
  },
};

// mutations
const mutations = {
  [SET_GRACE_PASS_STD_DATA](state, result) {
    state.gracePassstdList = result;
  },
  // set data list
  [SET_GRACE_MARK_SUMMARY_DATA](state, result) {
    state.datalist = result;
  },
  // set item to datalist
  [ADD_GRACE_SUMMARY_DATA](state, jschema) {
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
  [SET_GRACE_SUMMARY_SCHEMA_DATA](state, schemaData) {
    state.schema = schemaData;
    state.schema.degree_code = parseInt(state.schema.degree_code);
    //state.schema.course_code = parseInt(state.schema.course_code);
    state.schema.status = parseInt(state.schema.status);
  },
  [SET_GRACE_PASS_STD_SCHEMA](state, schemaData) {
    state.gracePassstdSchema = schemaData;
  },
  // unset form schema
  [UNSET_GRACE_SUMMARY_SCHEMA_DATA](state) {
    state.schema = {
      id: "",
      exam_code: "",
      exam_year: "",
      exam_type: "",
      paper_code: "",
      grace_mark: "",
      total_student: "",
      target_student: "",
      current_pass_rate: "",
      overall_pass_rate: "",
      total_passed: "",
      total_failed: "31",
      lock: "",
      status: "",
      created_by: "",
      updated_by: "",
      deleted_by: "",
      created_at: "",
      updated_at: "",
      deleted_at: "",
    };
  },
};

const actions = {
  // get data list
  fetchGraceSummaryData({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });

      Axios.get(graceMarkSummaryApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data.data;

          commit("SET_GRACE_MARK_SUMMARY_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },

  // delete data
  revertGraceItem({ commit }, item) {
    let data = item;
    console.log("DATA ACTION ", data);
    //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${graceMarkSummaryApi}/${data.id}`;
    console.log("revert");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.put(url, data)
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
  saveGraceMarkData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    data["status"] = 1;
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.post(graceMarkSummaryApi, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("ADD_GRACE_SUMMARY_DATA", schema);
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
  editGraceSummaryData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    console.log("DATA ACTION ", data);
    //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${graceMarkSummaryApi}/${data.id}`;
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
  approveGraceSummaryData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    console.log("DATA ACTION ", data);
    //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${graceMarkSummaryApi}/${data.id}`;
    console.log("aproved");

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.put(url, data)
        .then(function(response) {
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
  exportGraceSummary({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // download
    return new Promise((resolve, reject) => {
      Axios({
        url: graceMarkSummaryPdfApi,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log(url);

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "downloadStm_" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log("I am in error", error);
        });
    });
  },
  exportGracePassStdDetails({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise((resolve, reject) => {
      Axios({
        url: gracePassStdDetailsPdfApi,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "error") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            reject();
          } else {
                   let url = response.data.data;
                   console.log(url);

                   // showing on a new tab
                   var fileLink = document.createElement("a"); //  Creating a new <a> tag dynamically
                   fileLink.href = url; // assigning url to that
                   fileLink.download = "aftergracestd_" + Date.now() + ".pdf"; // giving it a name
                   fileLink.target = "_blank"; // ensuring that it goes to the new tab
                   //After all that is done
                   document.body.appendChild(fileLink); // attaching the <a> tag to the document body
                   fileLink.click(); // finally clicking it  .
                 }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log("I am in error", error);
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
        });
    });
  },
  fetchGracePassStdDetails({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });

      Axios.get(gracePassStdDetailsPdfApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.std_lists.data;
          commit("SET_GRACE_PASS_STD_SCHEMA", response.data);
          commit("SET_GRACE_PASS_STD_DATA", result);
          resolve(response.data.std_lists);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
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
