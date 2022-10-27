/* eslint-disable prettier/prettier */
import Axios from 'axios';

import {
  SET_RESULT_PUBLISHED_NOTE_DATA,
  SET_USER_TYPE_DATA,
  UNSET_RESULT_PUBLISHED_NOTE_DATA,
  RESCRUTINY_DASHBOARD_SUM_DATA,
} from "../../mutation-types";

import {
  ResultPublishedNoteApi,
  ResultPublishedApi,
  ExportResultPublishedApi,
  RescrutinyDashboardSummaryApi,
  RescrutinyDashboardDLApi,
} from "../../api";

const state = {
  schema: {
    created_at: "",
    created_by: "",
    exam_code: "",
    exam_initiate_id: "",
    id: "",
    is_approved: "",
    role_id: "",
    type: 1,
    updated_at: "",
    updated_by: "",
    year: "",
    approval_details: [
      {
        approval_state_id: "",
        comment: "",
        created_at: "",
        created_by: "",
        forwarded_role_id: "",
        id: "",
        parent_id: "",
        role_id: "",
        updated_at: "",
        user_id: "",
      },
      {
        approval_state_id: "",
        comment: "",
        created_at: "",
        created_by: "",
        forwarded_role_id: "",
        id: "",
        parent_id: "",
        role_id: "",
        updated_at: "",
        user_id: "",
      },
    ],
    // note: {
    //   to: '',
    //   initiate_note: 'signed by IT now pass it to deputy controller.....',
    //   dep_controller_note: ' Approved by deputy Controller ......',
    //   controller_note: 'Approved by Controller ..........',
    //   vc_note: '',
    // },
  },
  datalist: [],
  typelist: [{}],
  rescrutinyschema:    {},
};
const getters = {
  // get data lsit
  getResultNoteData(state) {
    return state.schema;
  },
  getData(state) {
    console.log("scma d", state.datalist);
    return state.datalist;
  },
  getTypeData(state) {
    return state.typelist;
  },
  getRescrutinyDashboardData(state) {
    return state.rescrutinyschema;
  },
};
// mutations
const mutations = {
  [SET_RESULT_PUBLISHED_NOTE_DATA](state, result) {
    //console.log('mu', result);
    state.schema = result[0];
  },
  [UNSET_RESULT_PUBLISHED_NOTE_DATA](state) {
    console.log("muha");
    state.schema = {};
  },
  [SET_USER_TYPE_DATA](state, result) {
    state.typelist = result;
  },
  [RESCRUTINY_DASHBOARD_SUM_DATA](state, result) {
    state.rescrutinyschema = result;
  },
};
// Actions
const actions = {
  // get data list
  getNoteData({ commit }, searchParam) {
    //console.log('ddsdsd');
    return new Promise(function (resolve, reject) {
       commit("SET_LOADING", { color: "primary" }); // loading Opening
      Axios.get(ResultPublishedNoteApi, {
        params: searchParam,
      })
        .then(function (response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("...", result);
          commit("SET_RESULT_PUBLISHED_NOTE_DATA", result);
          // return state.datalist;
          resolve(response.data.data);
        })
        .catch(function (error) {
          commit("UNSET_LOADING"); // loading Closing
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  //get user type
  getUserType({ commit }, searchParam) {
    //console.log('.........ddsdsd');
    return new Promise(function(resolve, reject) {
      Axios.get(ResultPublishedNoteApi, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data.user_types;
          console.log("... type", result);
          commit("SET_USER_TYPE_DATA", result);
          // return state.datalist;
          resolve(response.data.user_types);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  sendNote({ commit }, note) {
    console.log("in sendNote Action", note);
    // var params = new URLSearchParams();
    // params.append('to', JSON.stringify(note.to));
    // params.append('initiate_note', note.initiate_note);
    // params.append('dep_controller_note', note.dep_controller_note);
    // params.append('controller_note', note.controller_note);
    // params.append('vc_note', note.vc_note);

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.post(ResultPublishedNoteApi, note, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            console.log("in action sendNote");
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
        .catch(function(error) {
          commit("UNSET_LOADING");
          commit("SET_SNACKBAR", {
            msg: "Note Not Send, Please recheck",
            color: "pink",
          });
          reject(error);
        });
    });
  },
  publishedNote({ commit }, note) {
    console.log("in sendNote Action", note);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.post(ResultPublishedApi, note, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            console.log("in action sendNote", response);
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
        .catch(function(error) {
          commit("UNSET_LOADING");
          commit("SET_SNACKBAR", {
            msg: "Note Not Send, Please recheck",
            color: "pink",
          });
          reject(error);
        });
    });
  },
  exportNotes({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise((resolve, reject) => {
      Axios({
        url: ExportResultPublishedApi,
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
          fileLink.download = "approvalNotes_" + Date.now() + ".pdf"; // giving it a name
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
  searchRescrutinyDashboardData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" }); // loading Opening
      Axios.get(RescrutinyDashboardSummaryApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("RESCRUTINY_DASHBOARD_SUM_DATA", result);
          console.log("...recru", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  exportRescrutinySummary({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // download
    return new Promise((resolve, reject) => {
      Axios({
        url: RescrutinyDashboardDLApi,
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
};

export default {
    state,
    getters,
    actions,
    mutations,
};