import Axios from "axios";
import {
  BlankScriptDistribution_FetchUrl,
  BlankScriptDistribution_DeleteUrl,
  BlankScriptDistribution_UpdateUrl,
  BlankScriptDistribution_SaveUrl
} from "../../api";
import {
  SET_BLANK_SCRIPT_DISTRIBUTE_DATA,
  ADD_BLANK_SCRIPT_DISTRIBUTE_DATA,
  SET_MESSAGE,
  UNSET_MESSAGE,
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_BLANK_SCRIPT_DISTRIBUTE_SCHEMA,
  UNSET_BLANK_SCRIPT_DISTRIBUTE_SCHEMA
} from "../../mutation-types";
import { saveMsg, updateMsg, deleteMsg } from "../../erpUtil";

const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    main_qty: "",
    loose_qty: "",
    center_id: "",
    date: "",
    exam_id: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
    created_by: "",
    updated_by: "",
    deleted_by: ""
  },
  datalist: []
};

const getters = {
  getBlankScriptDistributeItem(state) {
    return state.datalist;
  },
  getBlankScriptDistributeSchema(state) {
    return state.schema;
  },
  getBlankScriptDistributeMessage(state) {
    return state.message;
  }
};
const mutations = {
  [SET_BLANK_SCRIPT_DISTRIBUTE_DATA](state, result) {
    state.datalist = result;
  },
  [ADD_BLANK_SCRIPT_DISTRIBUTE_DATA](state, jschema) {
    state.datalist.push(jschema);
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
  [SET_BLANK_SCRIPT_DISTRIBUTE_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    state.schema.exam_id = parseInt(state.schema.exam_id);
    state.schema.center_id = parseInt(state.schema.center_id);
  },
  [UNSET_BLANK_SCRIPT_DISTRIBUTE_SCHEMA](state) {
    (state.schema.id = ""),
      (state.schema.main_qty = ""),
      (state.schema.loose_qty = ""),
      (state.schema.center_id = ""),
      (state.schema.date = ""),
      (state.schema.exam_id = ""),
      (state.schema.created_at = ""),
      (state.schema.updated_at = ""),
      (state.schema.deleted_at = ""),
      (state.schema.created_by = ""),
      (state.schema.updated_by = ""),
      (state.schema.deleted_by = "");
  }
};
const actions = {
  callBlankScriptDistributeData({ commit, state }) {
    // var token =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuNTNcL05VXC9udUJhY2tlbmRcL3B1YmxpY1wvYXBpXC9sb2dpbiIsImlhdCI6MTU2OTkwNjYyOCwiZXhwIjoxNTY5OTEwMjI4LCJuYmYiOjE1Njk5MDY2MjgsImp0aSI6IjVuMEVuVE1IRThSYVRtQnMiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEiLCJpZCI6MSwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifQ.S25oXq0Mes4b4rwFx-E5smmkrqeFUJclavqxDcEAogc";
    // var option = { headers: { Authorization: `Bearer ${token}` } };

    return new Promise(function(resolve, reject) {
      Axios.get(BlankScriptDistribution_FetchUrl)
        .then(function(response) {
          //console.log("response that came", response )
          var result = response.data.data;
          //console.log("result", result )
          commit("SET_BLANK_SCRIPT_DISTRIBUTE_DATA", result);
          //handle success
          return state.datalist;
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },

  deleteBlankScriptDistributeItem({ commit, state }, deleteditem) {
    console.log(" In action ", deleteditem);
    const deleteurl = `${BlankScriptDistribution_DeleteUrl}/${deleteditem}`;
    return new Promise((resolve, reject) => {
      Axios.delete(deleteurl)
        .then(function(response) {
          if (response.data.status == "success") {
            commit("SET_MESSAGE", deleteMsg);
            //state.userlist.splice(deleteditem, 1);
            resolve("done");
          } else {
            //commit("SET_MESSAGE", response.data.msg);
            reject();
          }
        })
        .catch(function(error) {
          console.log("in state : ", error);
          reject();
        });
    });
  },
  saveBlankScriptDistributetData({ commit }, schema) {
    var param = new URLSearchParams();
    param.append("main_qty", schema.main_qty);
    param.append("loose_qty", schema.loose_qty);
    param.append("center_id", schema.center_id);
    param.append("date", schema.date);
    param.append("exam_id", schema.exam_id);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      Axios.post(BlankScriptDistribution_SaveUrl, param)
        .then(function(response) {
          //console.log("mitu", response.data)
          if (response.data.status == "success") {
            commit("ADD_BLANK_SCRIPT_DISTRIBUTE_DATA", schema);
            commit("SET_MESSAGE", saveMsg);
            console.log("saveMsg", saveMsg);
            resolve();
          } else {
            //commit("SET_MESSAGE", response.data.msg);
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },

  editBlankScriptDistributeData({ commit, state }, schema) {
    const updateurl = `${BlankScriptDistribution_UpdateUrl}/${schema.item.id}`;
    var param = new URLSearchParams();
    param.append("id", schema.item.id);
    param.append("main_qty", schema.item.main_qty);
    param.append("loose_qty", schema.item.loose_qty);
    param.append("center_id", schema.item.center_id);
    param.append("date", schema.item.date);
    param.append("exam_id", schema.item.exam_id);
    // param.append("created_at", schema.item.created_at);
    // param.append("updated_at", schema.item.updated_at);
    // param.append("deleted_at", schema.item.deleted_at);
    // param.append("created_by", schema.item.created_by);
    // param.append("updated_by", schema.item.updated_by);
    // param.append("deleted_by", schema.item.deleted_by);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      Axios.put(updateurl, param)
        .then(function(response) {
          if (response.data.status == "success") {
            commit("SET_MESSAGE", updateMsg);
            //state.userlist.splice(schema.item.user_id, 1, schema.item)
            resolve();
          } else {
            //commit("SET_MESSAGE", response.data.msg);
            reject();
          }
        })
        .catch(function(error) {
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
