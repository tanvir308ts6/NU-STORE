import Axios from "axios";
import {
  practicalVivaExam_FetchUrl,
  practicalVivaExam_DeleteUrl,
  practicalVivaExam_UpdateUrl,
  practicalVivaExam_SaveUrl
} from "../../api";
import {
  SET_MESSAGE,
  UNSET_MESSAGE,
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_PRACTICALVIVAEXAM_DATA,
  ADD_PRACTICALVIVAEXAM_DATA,
  SET_PRACTICALVIVAEXAM_SCHEMA,
  UNSET_PRACTICALVIVAEXAM_SCHEMA
} from "../../mutation-types";
import { saveMsg, updateMsg, deleteMsg } from "../../erpUtil";
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    exam_name: "",
    exam_date: "",
    center_id: "",
    center_name: "",
    college_code: "",
    created_by: "",
    updated_by: "",
    deleted_by: "",
    created_at: "",
    updated_at: ""
  },
  datalist: []
};
const getters = {
  // getPracticalVivaExam(state) {
  //   return state.datalist;
  // },
  getPracticalVivaExamSchema(state) {
    return state.schema;
  },
  getPracticalVivaExamMessage(state) {
    return state.message;
  }
};
const mutations = {
  [SET_PRACTICALVIVAEXAM_DATA](state, result) {
    state.datalist = result;
  },
  [ADD_PRACTICALVIVAEXAM_DATA](state, schema) {
    state.datalist.push(schema);
  },
  [SET_MESSAGE](state, Msg) {
    state.message = Msg;
  },
  [UNSET_MESSAGE](state) {
    state.message = "";
  },
  [SET_ACTION_PROCESS](state) {
    state.action_process = true;
  },
  [UNSET_ACTION_PROCESS](state) {
    state.action_process = false;
  },
  [SET_PRACTICALVIVAEXAM_SCHEMA](state, schemaData) {
    state.schema = schemaData;
  },
  [UNSET_PRACTICALVIVAEXAM_SCHEMA](state) {
    (state.schema.id = ""),
      (state.schema.exam_name = ""),
      (state.schema.exam_date = ""),
      (state.schema.center_id = ""),
      (state.schema.center_name = ""),
      (state.schema.college_code = ""),
      (state.schema.created_at = ""),
      (state.schema.updated_at = ""),
      (state.schema.deleted_at = ""),
      (state.schema.created_by = ""),
      (state.schema.updated_by = ""),
      (state.schema.deleted_by = "");
  }
};
const actions = {
  callPracticalVivaExamData({ commit, state }) {
    return new Promise(function(resolve, reject) {
      Axios.get(practicalVivaExam_FetchUrl)
        .then(function(response) {
          var result = response.data.data;
          commit("SET_PRACTICALVIVAEXAM_DATA", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  savePracticalVivaExamData({ commit }, schema) {
    var param = new URLSearchParams();
    param.append("exam_name", schema.exam_name);
    param.append("exam_date", schema.exam_date);
    param.append("center_id", schema.center_id);
    param.append("center_name", schema.center_name);
    param.append("college_code", schema.college_code);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      Axios.post(practicalVivaExam_SaveUrl, param)
        .then(function(response) {
          if (response.data.status == "success") {
            commit("ADD_PRACTICALVIVAEXAM_DATA", schema);
            commit("SET_MESSAGE", saveMsg);
            resolve();
          } else {
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  editPracticalVivaExamData({ commit, state }, schema) {
    const updateurl = `${practicalVivaExam_UpdateUrl}/${schema.id}`;
    var param = new URLSearchParams();
    param.append("id", schema.id);
    param.append("exam_name", schema.exam_name);
    param.append("exam_date", schema.exam_date);
    param.append("center_id", schema.center_id);
    param.append("center_name", schema.center_name);
    param.append("college_code", schema.college_code);
    param.append("created_at", schema.created_at);
    param.append("updated_at", schema.updated_at);
    param.append("deleted_at", schema.deleted_at);
    param.append("created_by", schema.created_by);
    param.append("updated_by", schema.updated_by);
    param.append("deleted_by", schema.deleted_by);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      Axios.put(updateurl, param)
        .then(function(response) {
          if (response.data.status == "success") {
            commit("SET_MESSAGE", updateMsg);
            resolve();
          } else {
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  deletePracticalVivaExamItem({ commit }, deletedId) {
    console.log(" In action ", deletedId);
    const deleteurl = `${practicalVivaExam_DeleteUrl}/${deletedId}`;
    return new Promise((resolve, reject) => {
      Axios.delete(deleteurl)
        .then(function(response) {
          if (response.data.status == "success") {
            commit("SET_MESSAGE", deleteMsg);
            resolve("done");
          } else {
            reject();
          }
        })
        .catch(function(error) {
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
