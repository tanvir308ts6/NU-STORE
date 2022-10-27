import Axios from "axios";
import {
  AnsCollection_FetchUrl,
  AnsCollection_DeleteUrl,
  AnsCollection_UpdateUrl,
  AnsCollection_SaveUrl
} from "../../api";
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_ANSCOLLECTION_DATA,
  ADD_ANSCOLLECTION_DATA,
  SET_ANSCOLLECTION_SCHEMA,
  UNSET_ANSCOLLECTION_SCHEMA
} from "../../mutation-types";
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    script_qty: "",
    center_id: "",
    date: "",
    exam_id: "",
    subject_id: "",
    created_by: "",
    updated_by: "",
    deleted_by: "",
    created_at: "",
    updated_at: ""
  },
  datalist: []
};
const getters = {
  getAnsScriptCollection(state) {
    return state.datalist;
  },
  getAnsScriptCollectionSchema(state) {
    return state.schema;
  }
};
const mutations = {
  [SET_ANSCOLLECTION_DATA](state, result) {
    state.datalist = result;
  },
  [ADD_ANSCOLLECTION_DATA](state, schema) {
    state.datalist.push(schema);
  },
  [SET_ACTION_PROCESS](state) {
    state.action_process = true;
  },
  [UNSET_ACTION_PROCESS](state) {
    state.action_process = false;
  },
  [SET_ANSCOLLECTION_SCHEMA](state, schemaData) {
    state.schema = schemaData;
  },
  [UNSET_ANSCOLLECTION_SCHEMA](state) {
    (state.schema.id = ""),
      (state.schema.script_qty = ""),
      (state.schema.center_id = ""),
      (state.schema.date = ""),
      (state.schema.exam_id = ""),
      (state.schema.subject_id = ""),
      (state.schema.created_at = ""),
      (state.schema.updated_at = ""),
      (state.schema.deleted_at = ""),
      (state.schema.created_by = ""),
      (state.schema.updated_by = ""),
      (state.schema.deleted_by = "");
  }
};
const actions = {
  callAnsScriptCollectionData({ commit, state }) {
    return new Promise(function(resolve, reject) {
      Axios.get(AnsCollection_FetchUrl)
        .then(function(response) {
          var result = response.data.data;
          commit("SET_ANSCOLLECTION_DATA", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  saveAnsScriptCollectionData({ commit }, schema) {
    var param = new URLSearchParams();
    param.append("script_qty", schema.script_qty);
    param.append("center_id", schema.center_id);
    param.append("date", schema.date);
    param.append("exam_id", schema.exam_id);
    param.append("subject_id", schema.subject_id);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" }); // loading Opening
      Axios.post(AnsCollection_SaveUrl, param)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            commit("ADD_ANSCOLLECTION_DATA", schema);
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: failedMsg,
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
  editAnsScriptCollectionData({ commit, state }, schema) {
    const updateurl = `${AnsCollection_UpdateUrl}/${schema.id}`;
    var param = new URLSearchParams();
    param.append("id", schema.id);
    param.append("script_qty", schema.script_qty);
    param.append("center_id", schema.center_id);
    param.append("date", schema.date);
    param.append("exam_id", schema.exam_id);
    param.append("subject_id", schema.subject_id);
    param.append("created_at", schema.created_at);
    param.append("updated_at", schema.updated_at);
    param.append("deleted_at", schema.deleted_at);
    param.append("created_by", schema.created_by);
    param.append("updated_by", schema.updated_by);
    param.append("deleted_by", schema.deleted_by);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" }); // loading Opening
      Axios.put(updateurl, param)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            commit("SET_SNACKBAR", {
              msg: updateMsg,
              color: "green"
            });
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: failedMsg,
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
  deleteAnsScriptCollectionItem({ commit }, deletedId) {
    console.log(" In action ", deletedId);
    const deleteurl = `${AnsCollection_DeleteUrl}/${deletedId}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" }); // loading Opening
      Axios.delete(deleteurl)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            commit("SET_SNACKBAR", {
              msg: deleteMsg,
              color: "green"
            });
            resolve("done");
          } else {
            commit("SET_SNACKBAR", {
              msg: failedMsg,
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
