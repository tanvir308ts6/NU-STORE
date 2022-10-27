/* eslint-disable prettier/prettier */
import Axios from "axios";
import { gradingSystemApi, RegCenListExportURL } from "../../api";
import {
  SET_GRADING_SYSTEM_DATA,
  ADD_GRADINMG_SYSTEM_DATA,
  
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_GRADINMG_SYSTEM_SCHEMA,
  UNSET_GRADINMG_SYSTEM_SCHEMA,
} from "../../mutation-types";
import {

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
  getGradingSystemItem(state) {
    return state.datalist;
  }, 
  getGradingSystemSchema(state) {
    return state.schema;
  },
  // getRegionalCenterMessage(state) {
  //   return state.message;
  // },
 
};
const mutations = {
  [SET_GRADING_SYSTEM_DATA](state, result) {
    state.datalist = result;
  },
  [ADD_GRADINMG_SYSTEM_DATA](state, jschema) {
    state.datalist.push(jschema);
  },

  [SET_ACTION_PROCESS](state) {
    state.action_process = true;
  },
  [UNSET_ACTION_PROCESS](state) {
    state.action_process = false;
  },
  [SET_GRADINMG_SYSTEM_SCHEMA](state, schemaData) {
    state.schema = schemaData;
  },
  [UNSET_GRADINMG_SYSTEM_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      mark_from: "",
      mark_to: "",
      grade_point_from: "",
      grade_point_to: "",
      letter_grade: "",
      grade_point: "",
      fail_letter_grade: "",
      fail_grade_point: "",
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
  callGradingSystemData({ commit }, searchParam) {
    console.log("INVLIST SEARC ACTION: ", searchParam);

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.get(gradingSystemApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data.data;
          console.log("DA... : ", result);
          commit("SET_GRADING_SYSTEM_DATA", result);
          resolve(response.data.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },

  saveGradingSystemData({ commit }, schema) {
                                              console.log(".....");
                                              console.log(
                                                JSON.stringify(schema)
                                              );
                                              let data = schema;
                                              [
                                                "created_at",
                                                "updated_at",
                                                "deleted_at",
                                              ].forEach((e) => delete data[e]);
                                              console.log("action after", data);

                                              commit("SET_ACTION_PROCESS");
                                              return new Promise(
                                                (resolve, reject) => {
                                                  commit("SET_LOADING", {
                                                    color: "primary",
                                                  });
                                                  Axios.post(
                                                    gradingSystemApi,
                                                    data
                                                  )
                                                    .then(function(response) {
                                                      commit("UNSET_LOADING");
                                                      if (
                                                        response.data.status ==
                                                        "success"
                                                      ) {
                                                        console.log(
                                                          "in action save"
                                                        );
                                                        commit("SET_SNACKBAR", {
                                                          msg:
                                                            response.data
                                                              .message,
                                                          color: "green",
                                                        });
                                                        commit(
                                                          "UNSET_FORMNOTIFY"
                                                        );
                                                        resolve(
                                                          response.data.message
                                                        );
                                                      } else {
                                                        commit("SET_SNACKBAR", {
                                                          msg:
                                                            response.data
                                                              .message,
                                                          color: "red",
                                                          timeout: 10000,
                                                        });
                                                        commit(
                                                          "SET_FORMNOTIFY",
                                                          {
                                                            type: "error", // success, info, warning, error
                                                            msg:
                                                              response.data
                                                                .message,
                                                          }
                                                        );
                                                        reject(
                                                          response.data.message
                                                        );
                                                      }
                                                    })
                                                    .catch(function(error) {
                                                      commit("UNSET_LOADING"); // loading Closing
                                                      commit("SET_SNACKBAR", {
                                                        msg: failedMsg,
                                                        color: "red",
                                                      });
                                                      console.log(
                                                        "in state : ",
                                                        error
                                                      );
                                                      reject();
                                                    });
                                                }
                                              );
                                            },
  deleteGradingSystemItem({ commit, state }, deleteditem) {
    console.log(" In action ", deleteditem);
    const deleteurl = `${gradingSystemApi}/${deleteditem}`;
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

  editGradingSystemData({ commit }, schema) {
                                              console.log(
                                                "action before",
                                                schema
                                              );
                                              let data = schema.item;
                                              [
                                                "created_at",
                                                "updated_at",
                                                "deleted_at",
                                              ].forEach((e) => delete data[e]);
                                              const updateurl = `${gradingSystemApi}/${data.id}`;

                                              commit("SET_ACTION_PROCESS");
                                              return new Promise(
                                                (resolve, reject) => {
                                                  commit("SET_LOADING", {
                                                    color: "primary",
                                                  });
                                                  console.log(
                                                    "action after",
                                                    data
                                                  );
                                                  Axios.put(updateurl, data)
                                                    .then(function(response) {
                                                      commit("UNSET_LOADING");
                                                      if (
                                                        response.data.status ==
                                                        "success"
                                                      ) {
                                                        console.log(
                                                          "in action edit"
                                                        );
                                                        commit("SET_SNACKBAR", {
                                                          msg:
                                                            response.data
                                                              .message,
                                                          color: "green",
                                                        });
                                                        commit(
                                                          "UNSET_FORMNOTIFY"
                                                        );
                                                        resolve(
                                                          response.data.message
                                                        );
                                                      } else {
                                                        commit("SET_SNACKBAR", {
                                                          msg:
                                                            response.data
                                                              .message,
                                                          color: "red",
                                                          timeout: 10000,
                                                        });
                                                        commit(
                                                          "SET_FORMNOTIFY",
                                                          {
                                                            type: "error", // success, info, warning, error
                                                            msg:
                                                              response.data
                                                                .message,
                                                          }
                                                        );
                                                        reject(
                                                          response.data.message
                                                        );
                                                      }
                                                    })
                                                    .catch(function(error) {
                                                      commit("UNSET_LOADING"); // loading Closing
                                                      commit("SET_SNACKBAR", {
                                                        msg: failedMsg,
                                                        color: "red",
                                                      });
                                                      console.log(
                                                        "in state : ",
                                                        error
                                                      );
                                                      reject();
                                                    });
                                                }
                                              );
                                            },
  exportGradingSystem({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise((resolve, reject) => {
      Axios({
        url: gradingSystemApi,
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
          fileLink.download = "gradingSystem_" + Date.now() + ".pdf"; // giving it a name
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
