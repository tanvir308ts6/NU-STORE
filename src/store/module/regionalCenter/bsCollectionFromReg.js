import Axios from "axios";
import {
  BsCollectionFromReg_FetchUrl,
  BsCollectionFromReg_SaveUrl,
  BsCollectionFromReg_DeleteUrl,
  BsCollectionFromReg_UpdateUrl
} from "../../api";
import {
  SET_MESSAGE,
  UNSET_MESSAGE,
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_BS_COLLECT_FROM_REG_DATA,
  ADD_BS_COLLECT_FROM_REG_DATA,
  SET_BS_COLLECT_FROM_REG_SCHEMA,
  UNSET_BS_COLLECT_FROM_REG_SCHEMA
} from "../../mutation-types";
import { saveMsg, updateMsg, deleteMsg } from "../../erpUtil";
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    main_qty: "",
    loose_qty: "",
    date: "",
    regional_center_id: "",
    center_id: "",
    exam_id: ""
    //reg_bs_dist_to_cen_id: null,
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
  getBsCollectionFromReg(state) {
    return state.datalist;
  },
  getBsCollectionFromRegSchema(state) {
    return state.schema;
  },
  getBsCollectionFromRegMessage(state) {
    return state.message;
  }
};
const mutations = {
  [SET_BS_COLLECT_FROM_REG_DATA](state, result) {
    state.datalist = result;
  },
  [ADD_BS_COLLECT_FROM_REG_DATA](state, schema) {
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
  [SET_BS_COLLECT_FROM_REG_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    state.schema.exam_id = parseInt(state.schema.exam_id);
  },
  [UNSET_BS_COLLECT_FROM_REG_SCHEMA](state) {
    (state.schema.id = ""),
      (state.schema.main_qty = ""),
      (state.schema.loose_qty = ""),
      (state.schema.date = ""),
      (state.schema.regional_center_id = ""),
      (state.schema.center_id = ""),
      (state.schema.exam_id = "");
    //     (state.schema.reg_bs_dist_to_cen_id = ""),
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
  fetchBsCollectionFromRegData({ commit, state }) {
    return new Promise(function(resolve, reject) {
      Axios.get(BsCollectionFromReg_FetchUrl)
        .then(function(response) {
          var result = response.data.data;
          commit("SET_BS_COLLECT_FROM_REG_DATA", result);
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  saveBsCollectionFromRegData({ commit }, schema) {
    var param = new URLSearchParams();
    param.append("main_qty", schema.main_qty);
    param.append("loose_qty", schema.loose_qty);
    param.append("date", schema.date);
    param.append("regional_center_id", schema.regional_center_id);
    param.append("center_id", schema.center_id);
    param.append("exam_id", schema.exam_id);
    // param.append("reg_bs_dist_to_cen_id", schema.reg_bs_dist_to_cen_id);
    //param.append("status", schema.status);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      Axios.post(BsCollectionFromReg_SaveUrl, param)
        .then(function(response) {
          if (response.data.status == "success") {
            commit("ADD_BS_COLLECT_FROM_REG_DATA", schema);
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
  editBsCollectionFromRegData({ commit, state }, schema) {
    const updateurl = `${BsCollectionFromReg_UpdateUrl}/${schema.id}`;
    var param = new URLSearchParams();
    param.append("id", schema.id);
    param.append("main_qty", schema.main_qty);
    param.append("loose_qty", schema.loose_qty);
    param.append("date", schema.date);
    param.append("regional_center_id", schema.regional_center_id);
    param.append("center_id", schema.center_id);
    param.append("exam_id", schema.exam_id);
    // param.append("reg_bs_dist_to_cen_id", schema.reg_bs_dist_to_cen_id);
    // param.append("status", schema.status);
    // param.append("created_at", schema.created_at);
    // param.append("updated_at", schema.updated_at);
    // param.append("deleted_at", schema.deleted_at);
    // param.append("created_by", schema.created_by);
    // param.append("updated_by", schema.updated_by);
    // param.append("deleted_by", schema.deleted_by);

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
  deleteBsCollectionFromRegItem({ commit }, deletedId) {
    console.log(" In action ", deletedId);
    const deleteurl = `${BsCollectionFromReg_DeleteUrl}/${deletedId}`;
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
