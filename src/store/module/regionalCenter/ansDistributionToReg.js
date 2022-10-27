import Axios from "axios";
import {
  AnsDistributionToReg_FetchUrl,
  AnsDistributionToReg_SaveUrl,
  AnsDistributionToReg_DeleteUrl,
  AnsDistributionToReg_UpdateUrl
} from "../../api";
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_ANS_DISTRIBUTION_TO_REG_DATA,
  ADD_ANS_DISTRIBUTION_TO_REG_DATA,
  SET_ANS_DISTRIBUTION_TO_REG_SCHEMA,
  UNSET_ANS_DISTRIBUTION_TO_REG_SCHEMA
} from "../../mutation-types";
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    script_qty: "",
    date: "",
    regional_center_id: "",
    center_id: "",
    exam_id: "",
    comments: ""
    /*status: "",
    created_by: "",
    updated_by: "",
    deleted_by: "",
    created_at: "",
    updated_at: ""*/
  },
  datalist: []
};
const getters = {
  getAnsDistributionToReg(state) {
    return state.datalist;
  },
  getAnsDistributionToRegSchema(state) {
    return state.schema;
  }
};
const mutations = {
  [SET_ANS_DISTRIBUTION_TO_REG_DATA](state, result) {
    state.datalist = result;
  },
  [ADD_ANS_DISTRIBUTION_TO_REG_DATA](state, schema) {
    state.datalist.push(schema);
  },
  [SET_ACTION_PROCESS](state) {
    state.action_process = true;
  },
  [UNSET_ACTION_PROCESS](state) {
    state.action_process = false;
  },
  [SET_ANS_DISTRIBUTION_TO_REG_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    state.schema.exam_id = parseInt(state.schema.exam_id);
  },
  [UNSET_ANS_DISTRIBUTION_TO_REG_SCHEMA](state) {
    (state.schema.id = state.schema.id),
      (state.schema.script_qty = ""),
      (state.schema.date = ""),
      (state.schema.regional_center_id = ""),
      (state.schema.center_id = ""),
      (state.schema.exam_id = ""),
      (state.schema.comments = "");
    //     (state.schema.status = ""),
    //     (state.schema.created_at = ""),
    //     (state.schema.updated_at = ""),
    //     (state.schema.deleted_at = ""),
    //     (state.schema.created_by = ""),
    //     (state.schema.updated_by = ""),
    //     (state.schema.deleted_by = "");
  }
};
const actions = {
  fetchAnsDistributionToRegData({ commit, state }) {
    return new Promise(function(resolve, reject) {
      Axios.get(AnsDistributionToReg_FetchUrl)
        .then(function(response) {
          var result = response.data.data;
          commit("SET_ANS_DISTRIBUTION_TO_REG_DATA", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  saveAnsDistributionToRegData({ commit }, schema) {
    var param = new URLSearchParams();
    param.append("script_qty", schema.script_qty);
    param.append("date", schema.date);
    param.append("regional_center_id", schema.regional_center_id);
    param.append("center_id", schema.center_id);
    param.append("exam_id", schema.exam_id);
    //param.append("status", schema.status);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(AnsDistributionToReg_SaveUrl, param)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            commit("ADD_ANS_DISTRIBUTION_TO_REG_DATA", schema);
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
  editAnsDistributionToRegData({ commit, state }, schema) {
    const updateurl = `${AnsDistributionToReg_UpdateUrl}/${schema.id}`;
    var param = new URLSearchParams();
    param.append("id", schema.id);
    param.append("script_qty", schema.script_qty);
    param.append("date", schema.date);
    param.append("regional_center_id", schema.regional_center_id);
    param.append("center_id", schema.center_id);
    param.append("exam_id", schema.exam_id);
    // param.append("status", schema.status);
    // param.append("created_at", schema.created_at);
    // param.append("updated_at", schema.updated_at);
    // param.append("deleted_at", schema.deleted_at);
    // param.append("created_by", schema.created_by);
    // param.append("updated_by", schema.updated_by);
    // param.append("deleted_by", schema.deleted_by);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
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
  deleteAnsDistributionToRegItem({ commit }, deletedId) {
    console.log(" In action ", deletedId);
    const deleteurl = `${AnsDistributionToReg_DeleteUrl}/${deletedId}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
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
