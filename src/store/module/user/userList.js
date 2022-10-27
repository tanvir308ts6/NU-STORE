// axios
import Axios from "axios";

// apis
import { UserApi } from "@/store/api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_USER_DATA,
  ADD_USER_DATA,
  SET_USER_SCHEMA,
  UNSET_USER_SCHEMA
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    user_type: "",
    regional_center_id: "",
    center_list_id: "",
    username: "",
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
    roleDetails: {}
  },
  datalist: []
};

// getters
const getters = {
  // get data lsit
  getUserDataList(state) {
    return state.datalist;
  },
  // get form schema
  getUserSchema(state) {
    return state.schema;
  }
};

// mutations
const mutations = {
  // set data list
  [SET_USER_DATA](state, result) {
    state.datalist = result;
    // state.datalist.roleDetails.forEach(e => {
    //   if (e.roleDetails = null) e.roleDetails.role_id = 0;
    //   // e.roleDetails.forEach(r=>{
    //   //   if(r.role_id=null) r.role_id=
    //   // })
    // });
  },
  // set item to datalist
  [ADD_USER_DATA](state, jschema) {
    state.datalist.push(jschema);
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
  [SET_USER_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    //console.log("center schema", schemaData)
    try {
      state.schema.roleDetails.role_id = parseInt(
        state.schema.roleDetails.role_id
      );
    } catch (ex) {
      console.log("user role parse error", ex);
      state.schema.roleDetails.role_id = "";
    }
    try {
      state.schema.user_type = parseInt(state.schema.user_type);
      //else state.schema.user_type = "";
    } catch (ex) {
      console.log("user type parse error", ex);
    }
    try {
      state.schema.center_list_id =
        state.schema.center_list_id > 0
          ? parseInt(state.schema.center_list_id)
          : "";
    } catch (ex) {
      console.log("center parse error", ex);
    }
    try {
      state.schema.regional_center_id =
        state.schema.regional_center_id > 0
          ? parseInt(state.schema.regional_center_id)
          : "";
    } catch (ex) {
      console.log("regional parese error ", ex);
    }
  },
  // unset form schema
  [UNSET_USER_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      user_type: "",
      regional_center_id: "",
      center_list_id: "",
      username: "",
      name: "",
      email: "",
      password: "",
      confirmedPassword: "",
      created_at: "",
      updated_at: "",
      deleted_at: "",
      roleDetails: {
        role_id: "",
        exam_code: "",
        start_date: "",
        end_date: "",
        status: ""
      }
    };
  }
};

const actions = {
  // get data list
  fetchUserData({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      // loading  Opening
      Axios.get(UserApi, {
        params: searchParam
      })

        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log(response.data.data);
          commit("SET_USER_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  // fetchUserData({
  //   commit
  // }, limit) {
  //   let url = `${UserApi}?limit=${limit.limit}&page=${limit.page}&user_type=${limit.user_type}&search=${limit.search}`;
  //   return new Promise(function (resolve, reject) {
  //     commit("SET_LOADING", {
  //       color: "primary"
  //     }); // loading Opening
  //     Axios.get(url)
  //       .then(function (response) {
  //         commit("UNSET_LOADING"); // loading Closing
  //         var result = response.data.data;
  //         commit("SET_USER_DATA", result);
  //         resolve(response.data);
  //       })
  //       .catch(function (error) {
  //         commit("UNSET_LOADING"); // loading Closing
  //         // handle error
  //         console.log(error);
  //         reject();
  //       });
  //   });
  // },
  // delete data
  deleteUserItem({ commit }, item) {
    let url = `${UserApi}/${item}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.delete(url)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: deleteMsg,
              color: "green"
            });
            resolve("done");
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
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
  },
  // save data
  saveUserData({ commit }, schema) {
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    data["status"] = 0;
    commit("SET_ACTION_PROCESS");
    console.log("ACTION DATA ", data);

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.post(UserApi, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("ADD_USER_DATA", schema);
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green"
            });
            commit("UNSET_FORMNOTIFY");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message
            });
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
  },
  // edit/update data
  editUserData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${UserApi}/${data.id}`;
    console.log("edit e url", url);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      }); // loading Opening
      Axios.put(url, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: updateMsg,
              color: "green"
            });
            commit("UNSET_FORMNOTIFY");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red"
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
