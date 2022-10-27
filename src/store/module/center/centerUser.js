import Axios from "axios";
import {
  CenterUserinfo_FetchUrl,
  CenterUserinfo_SaveUrl,
  CenterUserinfo_DeleteUrl,
  CenterUserinfo_UpdateUrl,
  CenterUserListExportURL
} from "../../api";
import {
  SET_CENTER_USER_DATA,
  ADD_CENTER_USER_DATA,
  SET_MESSAGE,
  UNSET_MESSAGE,
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_CENTER_USER_SCHEMA,
  UNSET_CENTER_USER_SCHEMA
} from "../../mutation-types";
//import { saveMsg, updateMsg, deleteMsg } from "../erpUtil";

const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    name: "",
    email: "",
    password: "",
    username: "",
    user_type: "2",
    center_list_id: "",
    active: ""
  },
  datalist: []
};

const getters = {
  getCenterUserItem(state) {
    return state.datalist;
  },
  getCenterUserSchema(state) {
    return state.schema;
  },
  getCenterUserMessage(state) {
    return state.message;
  }
};
const mutations = {
  [SET_CENTER_USER_DATA](state, result) {
    state.datalist = result;
  },
  [ADD_CENTER_USER_DATA](state, jschema) {
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
  [SET_CENTER_USER_SCHEMA](state, schemaData) {
    state.schema = schemaData;
    state.schema.center_list_id = parseInt(schemaData.center_list_id);
  },
  [UNSET_CENTER_USER_SCHEMA](state) {
    (state.schema.id = state.schema.id),
      (state.schema.name = ""),
      (state.schema.email = ""),
      (state.schema.password = ""),
      (state.schema.username = ""),
      (state.schema.center_list_id = ""),
      (state.schema.created_at = ""),
      (state.schema.updated_at = ""),
      (state.schema.deleted_at = ""),
      (state.schema.created_by = ""),
      (state.schema.updated_by = ""),
      (state.schema.deleted_by = "");
  }
};
const actions = {
  searchCenterUserList({ commit }, searchParam) {
    console.log(JSON.stringify(searchParam));
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });

      Axios.get(CenterUserinfo_FetchUrl, {
        params: searchParam
      })

        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // console.log(JSON.stringify(response.data.data));

          commit("SET_CENTER_USER_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },

  // callCenterUserData({ commit, state }, payLoad) {
  //   // var token =
  //   //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuNTNcL05VXC9udUJhY2tlbmRcL3B1YmxpY1wvYXBpXC9sb2dpbiIsImlhdCI6MTU2OTkwNjYyOCwiZXhwIjoxNTY5OTEwMjI4LCJuYmYiOjE1Njk5MDY2MjgsImp0aSI6IjVuMEVuVE1IRThSYVRtQnMiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEiLCJpZCI6MSwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifQ.S25oXq0Mes4b4rwFx-E5smmkrqeFUJclavqxDcEAogc";
  //   // var option = {
  //   //   headers: {
  //   //     Authorization: `Bearer ${token}`
  //   //   }
  //   // };
  //   //api/auth/center-user?center_id=1
  //   console.log("payload", payLoad);
  //   let url = `${CenterUserinfo_FetchUrl + payLoad.center_id_url}&limit=${
  //     payLoad.limit.limit
  //   }&page=${payLoad.limit.page}&search=${payLoad.limit.search}`;
  //   console.log("action center_id", payLoad.center_id_url);
  //   return new Promise(function(resolve, reject) {
  //     commit("SET_LOADING", {
  //       color: "primary",
  //     });
  //     Axios.get(url)
  //       .then(function(response) {
  //         commit("UNSET_LOADING");
  //         console.log("retruned data ", response.data);
  //         var result = response.data.data;
  //         commit("SET_CENTER_USER_DATA", result);
  //         resolve(response.data);
  //       })
  //       .catch(function(error) {
  //         console.log(error);
  //         reject();
  //       });
  //   });
  // },
  exportCenterUserList({ commit }) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios({
        url: CenterUserListExportURL,
        method: "GET",
        responseType: "arraybuffer"
      })
        .then(response => {
          commit("UNSET_LOADING"); // loading Closing
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute(
            "download",
            "CenterUserList_" + Date.now() + ".pdf"
          );
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log("I am in error", error);
        });
    });
  },

  deleteCenterUserItem({ commit, state }, deleteditem) {
    console.log(" In action ", deleteditem);
    const deleteurl = `${CenterUserinfo_DeleteUrl}/${deleteditem}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.delete(deleteurl)
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
  saveCenterUserData({ commit }, schema) {
    var param = new URLSearchParams();

    param.append("name", schema.name);
    param.append("email", schema.email);
    param.append("password", schema.password);
    param.append("username", schema.username);
    param.append("user_type", schema.user_type);
    param.append("center_list_id", schema.center_list_id);
    console.log("param ", JSON.stringify(schema));

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.post(CenterUserinfo_SaveUrl, param)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action save");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            commit("UNSET_FORMNOTIFY");
            resolve(response.data.message);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
              timeout: 10000
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message
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

  editCenterUserData({ commit, state }, schema) {
    console.log("action edit data ", schema);
    const updateurl = `${CenterUserinfo_UpdateUrl}/${schema.item.id}`;
    var param = new URLSearchParams();
    param.append("id", schema.item.id);
    param.append("name", schema.item.name);
    param.append("email", schema.item.email);
    param.append("password", schema.item.password);
    param.append("username", schema.item.username);
    param.append("user_type", schema.item.user_type);
    param.append("center_list_id", schema.item.center_list_id);
    // param.append("created_at", schema.item.created_at);
    // param.append("updated_at", schema.item.updated_at);
    // param.append("deleted_at", schema.item.deleted_at);
    // param.append("created_by", schema.item.created_by);
    // param.append("updated_by", schema.item.updated_by);
    // param.append("deleted_by", schema.item.deleted_by);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary"
      });
      Axios.put(updateurl, param)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action edit");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green"
            });
            resolve(response.data.message);
            commit("UNSET_FORMNOTIFY");
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
              timeout: 10000
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message
            });
            reject(response.data.message);
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          commit("SET_SNACKBAR", {
            msg: "Data Did Not edit, Please recheck",
            color: "pink"
          });
          reject(error);
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
