// axios
import Axios from "axios";

// apis
import { CenBsCollFromRegApi, bsCollInCenter } from "../../api";

// mutation types
import {
  SET_MESSAGE,
  UNSET_MESSAGE,
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_CEN_BS_COLL_FROM_REG_DATA,
  ADD_CEN_BS_COLL_FROM_REG_DATA,
  SET_CEN_BS_COLL_FROM_REG_SCHEMA,
  UNSET_CEN_BS_COLL_FROM_REG_SCHEMA
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg } from "../../erpUtil";

// state../../notifyUtil
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
    exam_id: "",
    reg_center_code: "",
    center_code: "",
    main_packet_size: "",
    main_quantity: "",
    extra_packet_size: "",
    extra_quantity: "",
    total_packet: "",
    comment: null,
    sender_id: "",
    exam_initiate_id: "",
    exam_code: "",
    year: "",
    user_id: "",
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
  getCenBsCollFromRegDataList(state) {
    return state.datalist;
  },
  // get form schema
  getCenBsCollFromRegSchema(state) {
    return state.schema;
  },
  // get message
  getCenBsCollFromRegMessage(state) {
    return state.message;
  }
};

// mutations
const mutations = {
  // set data list
  [SET_CEN_BS_COLL_FROM_REG_DATA](state, result) {
    state.datalist = result;
  },
  // set item to datalist
  [ADD_CEN_BS_COLL_FROM_REG_DATA](state, jschema) {
    state.datalist.push(jschema);
  },
  // set message
  [SET_MESSAGE](state, Msg) {
    state.message = Msg;
  },
  // unset message
  [UNSET_MESSAGE](state) {
    state.message = "";
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
  [SET_CEN_BS_COLL_FROM_REG_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    state.schema.reg_center_code = schemaData.reg_center_code.toString();
  },
  // unset form schema
  [UNSET_CEN_BS_COLL_FROM_REG_SCHEMA](state) {
    Object.keys(state.schema).forEach(param => {
      state.schema[param] = "";
    });
  }
};

const actions = {
  // get data list
  callCenBsCollFromRegData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      // let url = `${CenBsCollFromRegApi}?limit=${limit.limit}&page=${limit.page}&search=${limit.search}`;
      Axios.get(bsCollInCenter, {
        // srp
        params: searchParam
      })
        .then(function(response) {
          if (response.data.status == "error") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            commit("SET_CEN_BS_COLL_FROM_REG_DATA", []);
            reject();
          } else {
            var result = response.data.data;
            commit("SET_CEN_BS_COLL_FROM_REG_DATA", result);
            resolve(response.data);
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  // delete data
  deleteCenBsCollFromRegItem({ commit, state }, item) {
    let url = `${CenBsCollFromRegApi}/${item}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" });
      Axios.delete(url)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action Delete");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            resolve(response.data.message);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
              timeout: 10000
            });
            reject(response.data.message);
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          commit("SET_SNACKBAR", {
            msg: "Data Did Not Delete, Please recheck",
            color: "pink"
          });
          reject(error);
        });
    });
  },
  // save data
  saveCenBsCollFromRegData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    data["status"] = 0;
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" });
      Axios.post(CenBsCollFromRegApi, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action save");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            resolve(response.data.message);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
              timeout: 10000
            });
            reject(response.data.message);
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          commit("SET_SNACKBAR", {
            msg: "Data Did Not save, Please recheck",
            color: "pink"
          });
          reject(error);
        });
    });
  },
  // edit/update data
  editCenBsCollFromRegData({ commit, state }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${CenBsCollFromRegApi}/${data.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" });
      Axios.put(url, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status === "success") {
            commit("SET_MESSAGE", updateMsg);
            resolve();
          } else {
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
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
