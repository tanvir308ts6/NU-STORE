// axios
import Axios from "axios";

// apis
import { RoleGrantApi, UserWiseRolesApi } from "../../api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_ROLE_GRANT_DATA,
  ADD_REG_BS_COLL_FROM_NU_DATA,
  SET_ROLE_GRANT_SCHEMA,
  UNSET_ROLE_GRANT_SCHEMA
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    user_id: "",
    role_id: "",
    start_date: "",
    end_date: "",
    user_name: "",
    role_name: "",
    exam_code: ""

    // created_at: "",
    // updated_at: "",
    // deleted_at: ""
  },
  datalist: []
};

// getters
const getters = {
  // get data lsit
  getRoleGrantList(state) {
    return state.datalist;
  },
  // get form schema
  getRoleGrantSchema(state) {
    return state.schema;
  },
  getRoleId(state) {
    return state.schema.role_id;
  }
  // // get message
  // getRegBsCollFromNuMessage(state) {
  //   return state.message;
  // }
};

// mutations
const mutations = {
  // set data list
  [SET_ROLE_GRANT_DATA](state, result) {
    state.datalist = result;
  },
  // set item to datalist
  // [ADD_REG_BS_COLL_FROM_NU_DATA](state, jschema) {
  //   state.datalist.push(jschema);
  // },
  // set message
  // [SET_MESSAGE](state, Msg) {
  //   state.message = Msg;
  // },
  // unset message
  // [UNSET_MESSAGE](state) {
  //   state.message = "";
  // },
  // set action process
  [SET_ACTION_PROCESS](state) {
    state.action_process = true;
  },
  // unset action process
  [UNSET_ACTION_PROCESS](state) {
    state.action_process = false;
  },
  // set form schema
  [SET_ROLE_GRANT_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    state.schema.user_id = parseInt(state.schema.user_id);
    // state.schema.role_id = parseInt(state.schema.role_id);
  },
  // unset form schema
  [UNSET_ROLE_GRANT_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      user_id: "",
      role_id: "",
      start_date: "",
      end_date: "",
      status: "",
      user_name: "",
      exam_code: "",
      created_at: "",
      updated_at: "",
      deleted_at: ""
    };
  }
};

const actions = {
  // get data list
  callRoleGrantData({ commit, state }, limit) {
    let url = `${RoleGrantApi}?limit=${limit.limit}&page=${limit.page}&search=${limit.search}`;
    return new Promise(function(resolve, reject) {
      Axios.get(url)
        .then(function(response) {
          var result = response.data.data;
          commit("SET_ROLE_GRANT_DATA", result);
          // return state.datalist;
          resolve(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  // delete data
  deleteRoleGrantItem({ commit, state }, item) {
    let url = `${RoleGrantApi}/${item}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.delete(url)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action delete");
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
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          console.log("in state : ", error);
          reject();
        });
    });
  },
  // save data
  saveRoleGrantData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    data["status"] = 1;
    // commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      console.log("ghggg");
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.post(RoleGrantApi, data)
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
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          console.log("in state : ", error);
          reject();
        });
    });
  },
  // edit/update data
  editRoleGrantData({ commit, state }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${RoleGrantApi}/${data.id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.put(url, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action edit");
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
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
          console.log("in state : ", error);
          reject();
        });
    });
  },
  getUserWiseRoleList({ commit, state }, user) {
    let url = `${UserWiseRolesApi}=${user}`;
    console.log("url ", url);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.get(url).then(function(response) {
        commit("UNSET_LOADING");
        console.log(response.data.data);

        if (response.data.status == "success") {
          var rolesID = [];
          response.data.data.forEach(item => rolesID.push(item.id));
          state.schema.role_id = rolesID;

          resolve();
        } else {
          reject(response.data.message);
        }
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
