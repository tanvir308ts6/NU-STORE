import Axios from "axios";
import {
  AnsDistribution_FetchUrl,
  AnsDistribution_DeleteUrl,
  AnsDistribution_UpdateUrl,
  AnsDistribution_SaveUrl
} from "../../api";
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_ANSDISTRIBUTION_DATA,
  ADD_ANSDISTRIBUTION_DATA,
  SET_ANSDISTRIBUTION_SCHEMA,
  UNSET_ANSDISTRIBUTION_SCHEMA
} from "../../mutation-types";
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    script_qty: "",
    teacher_id: "",
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
  getAnsScriptDistribution(state) {
    return state.datalist;
  },
  getAnsScriptDistributionSchema(state) {
    return state.schema;
  }
};
const mutations = {
  [SET_ANSDISTRIBUTION_DATA](state, result) {
    state.datalist = result;
  },
  [ADD_ANSDISTRIBUTION_DATA](state, schema) {
    state.datalist.push(schema);
  },
  [SET_ACTION_PROCESS](state) {
    state.action_process = true;
  },
  [UNSET_ACTION_PROCESS](state) {
    state.action_process = false;
  },
  [SET_ANSDISTRIBUTION_SCHEMA](state, schemaData) {
    state.schema = schemaData;
  },
  [UNSET_ANSDISTRIBUTION_SCHEMA](state) {
    (state.schema.id = ""),
      (state.schema.script_qty = ""),
      (state.schema.teacher_id = ""),
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
  callAnsScriptDistributionData({ commit, state }) {
    return new Promise(function(resolve, reject) {
      Axios.get(AnsDistribution_FetchUrl)
        .then(function(response) {
          var result = response.data.data;
          commit("SET_ANSDISTRIBUTION_DATA", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  saveAnsScriptDistributionData({ commit }, schema) {
    var param = new URLSearchParams();
    param.append("script_qty", schema.script_qty);
    param.append("teacher_id", schema.teacher_id);
    param.append("date", schema.date);
    param.append("exam_id", schema.exam_id);
    param.append("subject_id", schema.subject_id);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" }); // loading Opening
      Axios.post(AnsDistribution_SaveUrl, param)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            commit("ADD_ANSDISTRIBUTION_DATA", schema);
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
  editAnsScriptDistributionData({ commit, state }, schema) {
    const updateurl = `${AnsDistribution_UpdateUrl}/${schema.id}`;
    var param = new URLSearchParams();
    param.append("id", schema.id);
    param.append("script_qty", schema.script_qty);
    param.append("teacher_id", schema.teacher_id);
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
  deleteAnsScriptDistributionItem({ commit }, deletedId) {
    console.log(" In action ", deletedId);
    const deleteurl = `${AnsDistribution_DeleteUrl}/${deletedId}`;
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
