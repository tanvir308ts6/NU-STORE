/* eslint-disable prettier/prettier */
import Axios from "axios";
import {
  Userinfo_FetchUrl,
  Userinfo_DeleteUrl,
  Userinfo_UpdateUrl,
  Userinfo_SaveUrl,
  InvigilatorProfileinfo_FetchUrl,
  invCountApi
} from "../../api";
import {
  SET_INVIGILATOR_DATA,
  ADD_INVIGILATOR_DATA,
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_INVIGILATOR_SCHEMA,
  UNSET_INVIGILATOR_SCHEMA,
} from "../../mutation-types";
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    name: "",
    email: "",
    mobile: "",
    nid_no: "",
    //user_id: "",
    //tmis_id: "",
    teacher_code: "",
    college_code: "",
    center_id: "",
    username: "",
    password: "",
    active: "",
    role_id: 4,
    user_type: 4,
  },
  datalist: [],
};

const getters = {
  getInvigilatorItem(state) {
    return state.datalist;
  },
  getInvigilatorSchema(state) {
    return state.schema;
  },
};
const mutations = {
  [SET_INVIGILATOR_DATA](state, result) {
    state.datalist = result;
  },
  [ADD_INVIGILATOR_DATA](state, jschema) {
    state.datalist.push(jschema);
  },
  [SET_ACTION_PROCESS](state) {
    state.action_process = true;
  },
  [UNSET_ACTION_PROCESS](state) {
    state.action_process = false;
  },
  [SET_INVIGILATOR_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    // state.schema.center_id = parseInt(state.schema.center_id);
  },
  [UNSET_INVIGILATOR_SCHEMA](state) {
    (state.schema.id = state.schema.id),
      (state.schema.name = ""),
      (state.schema.email = ""),
      (state.schema.mobile = ""),
      (state.schema.teacher_code = ""),
      (state.schema.college_code = ""),
      (state.schema.center_id = ""),
      (state.schema.username = ""),
      (state.schema.password = ""),
      (state.schema.nid_no = ""),
      (state.schema.active = "");
    state.schema.role_id = 4;
    state.schema.user_type = 4;
    //(state.schema.tmis_id = ""),
    //(state.schema.user_id = ""),
  },
};
const actions = {
     downnloadInviList({ commit }, searchParam) {
        commit("SET_LOADING", {
          color: "primary",
        });
        return new Promise((resolve, reject) => {
          Axios({
            url: Userinfo_FetchUrl,
            method: "GET",
            params: searchParam,
          })
            .then((response) => {
              commit("UNSET_LOADING"); // loading Closing
              let url = response.data.data;
              console.log(url);

              // showing on a new tab
              var fileLink = document.createElement("a"); //  Creating a new <a> tag dynamically
              fileLink.href = url; // assigning url to that
              fileLink.download = "InvigilatorList_" + Date.now() + ".pdf"; // giving it a name
              fileLink.target = "_blank"; // ensuring that it goes to the new tab
              //After all that is done
              document.body.appendChild(fileLink); // attaching the <a> tag to the document body
              fileLink.click(); // finally clicking it  .
            })
            .catch(function(error) {
              commit("UNSET_LOADING"); // loading Closing
              console.log("I am in error", error);
            });
        });
      },
  callInvigilatorData({ commit }, searchparam) {
    console.log("sp: in action @ callInvigilatorData");
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.get(Userinfo_FetchUrl, {
        params: searchparam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          console.log("sp :: inThen :: ", response);
          var result = response.data.data;
          console.log("callInvigilatorData ALL : ", result);
          commit("SET_INVIGILATOR_DATA", result);
          resolve(result);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  //for custom search in future requirement
  searchInvigilatorData({ commit }, searchParam) {
    console.log("INVLIST SEARC ACTION: ", searchParam);

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(Userinfo_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("DA... : ", result);
          commit("SET_INVIGILATOR_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
    searchInvigilatorCenterwiseCountData({ commit }, searchParam) {
    
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(invCountApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("DA... : ", result);
          commit("SET_INVIGILATOR_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  
  fetchInvigilatorProfileData({ commit }, searchParam) {
    var invigilator_id = searchParam.invigilator_id;

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      console.log("center profile called");
      Axios.get(InvigilatorProfileinfo_FetchUrl + "/" + invigilator_id)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          console.log("res-------", response);
          var result = response.data.data;
          commit("SET_INVIGILATOR_SCHEMA", result);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },

  deleteInvigilatorItem({ commit }, deleteditem) {
    console.log(" In action ", deleteditem);
    const deleteurl = `${Userinfo_DeleteUrl}/${deleteditem}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.delete(deleteurl)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            commit("SET_SNACKBAR", {
              msg: deleteMsg,
              color: "green",
            });
            //state.userlist.splice(deleteditem, 1);
            resolve("done");
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          console.log("in state : ", error);
          reject();
        });
    });
  },
  saveInvigilatorData({ commit }, schema) {
    console.log("action", schema);
    var param = new URLSearchParams();
    param.append("name", schema.name);
    param.append("email", schema.email);
    param.append("mobile", schema.mobile);
    param.append("nid_no", schema.nid_no);
    param.append("teacher_code", schema.teacher_code);
    param.append("college_code", schema.college_code);
    param.append("center_id", schema.center_id);
    param.append("username", schema.username);
    param.append("password", schema.password);
    param.append("exam_initiate_id", schema.exam_initiate_id);
    param.append("user_type", schema.user_type);
    param.append("role_id", schema.role_id);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.post(Userinfo_SaveUrl, param)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          //console.log("mitu", response.data)
          if (response.data.status == "success") {
            commit("ADD_INVIGILATOR_DATA", schema);
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green",
            });
            commit("UNSET_FORMNOTIFY");
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message,
            });
            //commit("SET_MESSAGE", response.data.msg);
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          console.log(error);
          reject();
        });
    });
  },

  editInvigilatorData({ commit }, schema) {
    console.log("action", schema);
    const updateurl = `${Userinfo_UpdateUrl}/${schema.item.id}`;
    // var param = new URLSearchParams();
    // param.append('id', schema.item.id);
    // param.append('name', schema.item.name);
    // param.append('email', schema.item.email);
    // param.append('mobile', schema.item.mobile);
    // param.append('nid_no', schema.item.nid_no);
    // param.append('teacher_code', schema.item.teacher_code);
    // // param.append("college_code", schema.item.college_code);
    // param.append('center_id', schema.item.center_id);
    // //param.append("user_id", schema.item.user_id);
    // param.append('username', schema.item.username);
    // param.append('password', schema.item.password);
    // param.append('active', schema.item.active);
    // param.append("created_at", schema.item.created_at);
    // param.append("updated_at", schema.item.updated_at);
    // param.append("deleted_at", schema.item.deleted_at);
    let data = schema.item;
    [
      "created_at",
      "updated_at",
      "deleted_at",
      "created_by",
      "deleted_by",
      "updated_by",
      "tims_id",
      "app_status",
    ].forEach((e) => delete data[e]);

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.put(updateurl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status == "success") {
            commit("SET_SNACKBAR", {
              msg: updateMsg,
              color: "green",
            });
            commit("UNSET_FORMNOTIFY");
            //state.userlist.splice(schema.item.user_id, 1, schema.item)
            resolve(response.data);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message,
            });
            reject();
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          console.log(error);
          reject();
        });
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
