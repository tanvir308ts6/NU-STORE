// axios
import Axios from "axios";

// apis
import { RoleDetailsApi } from "../../api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_ROLE_DETAILS_DATA,
  ADD_ROLE_DETAILS_DATA,
  SET_ROLE_DETAILS_SCHEMA,
  UNSET_ROLE_DETAILS_DATA_SCHEMA
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  schema: {
    role: "",
    menuData: []
  },
  roleDetailslist: []
};

// getters
const getters = {
  // get data lsit
  getRoleDetailsItems(state) {
    return state.roleDetailslist;
  },
  // get form schema
  getRoleDetailsSchema(state) {
    return state.schema;
  }
};

// mutations
const mutations = {
  // set data list
  [SET_ROLE_DETAILS_DATA](state, result) {
    state.roleDetailslist = result;

    state.roleDetailslist.forEach(element => {
      element.children.forEach(child => {
        if (child.write == "0") child.write = 0;
        if (child.write == "1") child.write = 1;
        if (child.read == "0") child.read = 0;
        if (child.read == "1") child.read = 1;
      });
    });
  },
  // set item to datalist
  [ADD_ROLE_DETAILS_DATA](state, jschema) {
    state.roleDetailslist.push(jschema);
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
  [SET_ROLE_DETAILS_SCHEMA](state, schemaData) {
    // sort here
    // let sortArray = schemaData.sort((a, b) => {
    //   const menu_id_A = a.menu_id;
    //   const menu_id_B = b.menu_id;
    //   let comparison = 0;
    //   if (menu_id_A > menu_id_B) {
    //     comparison = 1;
    //   } else if (menu_id_A < menu_id_B) {
    //     comparison = -1;
    //   }
    //   return comparison;
    // });

    state.schema.menuData = schemaData;
    //state.schema.role_id = parseInt(state.schema.role_id);
  },
  // unset form schema
  [UNSET_ROLE_DETAILS_DATA_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      role: "",
      menuData: []
    };
  }
};

const actions = {
  // get data list
  fetchRoleDetailsData({ commit }, id) {
    console.log(id);
    let url = `${RoleDetailsApi}?role=${id}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.get(url)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_ROLE_DETAILS_SCHEMA", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  // save data
  saveRoleDetailsData({ commit }, roleItem) {
    let url = `${RoleDetailsApi}?role=${roleItem.role}`;
    console.log(roleItem);
    let data = roleItem;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    data["status"] = 0;
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(url, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("ADD_ROLE_DETAILS_DATA", roleItem);
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
            //commit("UNSET_FORMNOTIFY");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            // commit("SET_FORMNOTIFY", {
            //     type: "error", // success, info, warning, error
            //     msg: response.data.message
            // });
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red"
          });
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
