/* eslint-disable prettier/prettier */
import Axios from "axios";
import { ReionalCenterApi, RegCenListExportURL } from "../../api";
import {
  SET_REGIONAL_CENTER_DATA,
  ADD_REGIONAL_CENTER_DATA,
  SET_MESSAGE,
  UNSET_MESSAGE,
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_REGIONAL_CENTER_SCHEMA,
  UNSET_REGIONAL_CENTER_SCHEMA,
} from "../../mutation-types";
import {
  // saveMsg,
  // updateMsg,
  // deleteMsg,
  failedMsg,
} from "../../erpUtil";

const state = {
  message: "",
  action_process: false,
  schema: {
    id: "",
    center_name: "",
    college_code: "",
    address: "",
    phone: "",
    email: "",
    mobile: "",
    status: "",

    // // password: "",
    // // username: "",
    // user_type: "3",
    // regional_center_id: "",
    // // confirmedPassword: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
    created_by: "",
    updated_by: "",
    deleted_by: "",
  },
  datalist: [],
};

const getters = {
  getRegionalCentertItem(state) {
    return state.datalist;
  },
  getRegionalCenterSchema(state) {
    return state.schema;
  },
  getRegionalCenterMessage(state) {
    return state.message;
  },
};
const mutations = {
  [SET_REGIONAL_CENTER_DATA](state, result) {
    state.datalist = result;
  },
  [ADD_REGIONAL_CENTER_DATA](state, jschema) {
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
  [SET_REGIONAL_CENTER_SCHEMA](state, schemaData) {
    state.schema = schemaData;
  },
  [UNSET_REGIONAL_CENTER_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      center_name: "",
      college_code: "",
      address: "",
      phone: "",
      email: "",
      mobile: "",
      status: "",

      // // password: "",
      // // username: "",
      // regional_center_id: "",
      // // confirmedPassword: "",
      // // created_at: "",
      // // updated_at: "",
      deleted_at: "",
      created_by: "",
      updated_by: "",
      deleted_by: "",
      created_at: "",
      updated_at: "",
    };
  },
};
const actions = {
  downloadRegionalCenterNew({ commit }, searchParam) {
        commit("SET_LOADING", {
          color: "primary",
        });
        return new Promise((resolve, reject) => {
          Axios({
            url: ReionalCenterApi,
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
              fileLink.download = "centerList_" + Date.now() + ".pdf"; // giving it a name
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
  exportRegCenterList({ commit }) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios({
        url: RegCenListExportURL,
        method: "GET",
        responseType: "arraybuffer",
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute(
            "download",
            "RegCenterList_" + Date.now() + ".pdf"
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
  fetchRegionalCenterProfileData({ commit }) {
    //get user type
    var user = JSON.parse(localStorage.getItem("user"));
    console.log("reg center profile called", user);
    var reg_center_id = user.regional_center.id;

    return new Promise((resolve, reject) => {
      Axios.get(ReionalCenterApi + "/" + reg_center_id)
        .then(function(response) {
          console.log("res-------", response);
          var result = response.data.data;
          commit("SET_REGIONAL_CENTER_SCHEMA", result);

          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  callRegionalCenterData({ commit }, limit) {
    // var token =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuNTNcL05VXC9udUJhY2tlbmRcL3B1YmxpY1wvYXBpXC9sb2dpbiIsImlhdCI6MTU2OTkwNjYyOCwiZXhwIjoxNTY5OTEwMjI4LCJuYmYiOjE1Njk5MDY2MjgsImp0aSI6IjVuMEVuVE1IRThSYVRtQnMiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEiLCJpZCI6MSwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifQ.S25oXq0Mes4b4rwFx-E5smmkrqeFUJclavqxDcEAogc";
    // var option = { headers: { Authorization: `Bearer ${token}` } };
    // let url = `${ReionalCenterApi}?limit=${limit.limit}&page=${limit.page}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.get(ReionalCenterApi, { params: limit })
        .then(function(response) {
          commit("UNSET_LOADING");
          //console.log("response that came", response )
          var result = response.data.data;
          //console.log("result", result )
          commit("SET_REGIONAL_CENTER_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING");
          // handle error
          console.log(error);
          reject();
        });
    });
  },
  saveRegionalCenterData({ commit }, schema) {
    console.log(".....");
    console.log(JSON.stringify(schema));
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    console.log("action after", data);
    // var param = new URLSearchParams();
    // param.append("name", schema.name);
    // param.append("email", schema.email);
    // // param.append("password", schema.password);
    // // param.append("username", schema.username);
    // param.append("user_type", schema.user_type);
    // param.append("regional_center_id", schema.regional_center_id);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.post(ReionalCenterApi, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action save");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green",
            });
            commit("UNSET_FORMNOTIFY");
            resolve(response.data.message);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
              timeout: 10000,
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message,
            });
            reject(response.data.message);
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
  deleteRegionalCenterItem({ commit, state }, deleteditem) {
    console.log(" In action ", deleteditem);
    const deleteurl = `${ReionalCenterApi}/${deleteditem}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.delete(deleteurl)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action delete");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green",
            });
            resolve(response.data.message);
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
          reject();
        });
    });
  },

  editRegionalCentertData({ commit }, schema) {
    console.log("action before", schema);
    let data = schema.item;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    const updateurl = `${ReionalCenterApi}/${data.id}`;
    // var param = new URLSearchParams();
    // param.append("id", schema.item.id);
    // param.append("name", schema.item.name);
    // param.append("email", schema.item.email);
    // // param.append("password", schema.item.password);
    // // param.append("username", schema.item.username);
    // param.append("regional_center_id", schema.item.regional_center_id);
    // // param.append("mobile", schema.item.mobile);
    // // param.append("center_list_id", schema.item.center_list_id);
    // // param.append("username", schema.item.username);
    // // param.append("password", schema.item.password);
    // param.append("created_at", schema.item.created_at);
    // param.append("updated_at", schema.item.updated_at);
    // param.append("deleted_at", schema.item.deleted_at);
    // param.append("created_by", schema.item.created_by);
    // param.append("updated_by", schema.item.updated_by);
    // param.append("deleted_by", schema.item.deleted_by);

    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      console.log("action after", data);
      Axios.put(updateurl, data)
        .then(function(response) {
          commit("UNSET_LOADING");
          if (response.data.status == "success") {
            console.log("in action edit");
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green",
            });
            commit("UNSET_FORMNOTIFY");
            resolve(response.data.message);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
              timeout: 10000,
            });
            commit("SET_FORMNOTIFY", {
              type: "error", // success, info, warning, error
              msg: response.data.message,
            });
            reject(response.data.message);
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
