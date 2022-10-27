/* eslint-disable prettier/prettier */
// axios
import Axios from "axios";

// apis
import {
  ExamRoutineUrl,
  examRoutinePdfApi,
  examRoutineDateWise,
  downloadExamCalenderApi,
  ExamRoutineDateUrl,
  ExamRoutineDateChangeApi,
  ExamRoutineChangeNoticeApi,
} from "../../api";

// mutation types
import {
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_ROUTINE_DATA,
  ADD_ROUTINE_DATA,
  SET_ROUTINE_SCHEMA_DATA,
  UNSET_ROUTINE_SCHEMA_DATA,
  SET_CLONE_SCHEMA_DATA,
  SET_ROUTINE_DATA_DATEWISE,
  SET_ROUTINE_DATE_DATA,
  SET_ROUTINE_CHANGE_NOTICE_DATA,
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
  dateWiseRoutineData: [],
  message: "",
  action_process: false,
  schema: {
    id: "",
    ROUTINE_name: "",
    sl_no: "",
    status: 1,
    ROUTINE_url: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
    type: 1,
    center_code: "",
    center_name: "",
    exam_code: "",
    exam_name: "",
    date: "",
    year: "",
    seal_no: "",
    incharge_officer: "",
    supervising_officer: "",
    division_id: "",
    district_id: "",
    exam_initiate_id: 1,
    routine: [],
  },
  datalist: [],
  datelist: [],
  changeNotice: [],
};

// getters
const getters = {
  // get data lsit
  getRoutineDataList(state) {
    return state.datalist;
  },
  // get form schema
  getRoutineSchema(state) {
    return state.schema;
  },

  getdateWiseRoutineData(state) {
    return state.dateWiseRoutineData;
  },
  // get date list
  getRoutineDateDataList(state) {
    return state.datelist;
  },
  getRoutineChangeNoticeList(state) {
    return state.changeNotice;
  },
  // examRoutineDateWise
};

// mutations
const mutations = {
  // set data list
  [SET_ROUTINE_DATA](state, result) {
    state.datalist = result;
  },
  // add item to datalist
  [ADD_ROUTINE_DATA](state, jschema) {
    state.datalist.push(jschema);
  },

  [SET_ROUTINE_DATA_DATEWISE](state, data) {
    state.dateWiseRoutineData = data;
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
  [SET_ROUTINE_SCHEMA_DATA](state, schemaData) {
    state.schema = schemaData;
    //state.schema.status = parseInt(state.schema.status);
  },
  // set clone schema
  [SET_CLONE_SCHEMA_DATA](state, schemaData) {
    state.schema = {
      id: "",
      ROUTINE_name: schemaData.ROUTINE_name,
      sl_no: schemaData.sl_no,
      status: schemaData.status,
      ROUTINE_url: schemaData.ROUTINE_url,
      created_at: schemaData.created_at,
      updated_at: schemaData.updated_at,
      deleted_at: schemaData.deleted_at,
      center_code: schemaData.center_code,
      center_name: schemaData.center_name,
      exam_code: schemaData.exam_code,
      exam_name: schemaData.exam_name,
      date: schemaData.date,
      year: schemaData.year,
      seal_no: schemaData.seal_no,
      incharge_officer: schemaData.incharge_officer,
      supervising_officer: schemaData.supervising_officer,
      division_id: schemaData.division_id,
      district_id: schemaData.district_id,
      exam_initiate_id: 1,
      routine: schemaData.routine,
      type: schemaData.type,
    };
  },
  // unset form schema
  [UNSET_ROUTINE_SCHEMA_DATA](state) {
    state.schema = {
      id: "",
      ROUTINE_name: "",
      sl_no: "",
      status: 1,
      type: 1,
      ROUTINE_url: "",
      created_at: "",
      updated_at: "",
      deleted_at: "",
      center_code: "",
      center_name: "",
      exam_code: "",
      exam_name: "",
      date: "",
      year: "",
      seal_no: "",
      exam_initiate_id: 1,
      incharge_officer: "",
      supervising_officer: "",
      division_id: "",
      district_id: "",
      routine: [],
    };
  },
  // set routine date list
  [SET_ROUTINE_DATE_DATA](state, result) {
    state.datelist = result;
  },
  [SET_ROUTINE_CHANGE_NOTICE_DATA](state, result) {
    state.changeNotice = result;
  },
};

const actions = {
  // get data list
  fetchRoutineData({ commit }, params = { type: 1 }) {
    console.log("ACTI ", params);
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.get(ExamRoutineUrl, params)
        .then(function(response) {
          console.log("response", response.data.data);

          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_ROUTINE_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },

  fetchRoutineDataDateWise({ commit }, params) {
    console.log("params:", params);
    // console.log("ACTI ", params);
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.get(examRoutineDateWise, {
        params: params,
      })
        .then(function(response) {
          console.log("response", response);

          commit("UNSET_LOADING"); // loading Closing
          var result = response.data;
          commit("SET_ROUTINE_DATA_DATEWISE", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },

  //after search data
  searchExamRoutineData({ commit }, searchParam) {
    console.log("search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(ExamRoutineUrl, {
        params: searchParam,
      })

        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log(response.data.data);
          commit("SET_ROUTINE_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log("searchRoutine: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  // delete data
  deleteROUTINEItem({ commit }, id) {
    let url = `${ExamRoutineUrl}/${id}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.delete(url)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: deleteMsg,
              color: "green",
            });
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
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          reject();
        });
    });
  },
  // save data
  saveROUTINEData({ commit }, schema) {
    console.log("save routine", schema);
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    data["status"] = 0;
    data["type"] = 1;
    // console.log("data--->", data);
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.post(ExamRoutineUrl, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("ADD_ROUTINE_DATA", schema);
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
            reject();
          }
        })
        .catch(function(error) {
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          commit("SET_SNACKBAR", {
            msg: failedMsg,
            color: "red",
          });
          reject();
        });
    });
  },
  exportExamRoutine({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // download
    return new Promise((resolve, reject) => {
      Axios({
        url: examRoutinePdfApi,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log(url);

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "downloadStm_" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log("I am in error", error);
        });
    });
  },

  downloadExamCalender({ commit }, searchParam) {
    console.log("here ????");
    commit("SET_LOADING", {
      color: "primary",
    });
    // download
    return new Promise((resolve, reject) => {
      Axios({
        url: downloadExamCalenderApi,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          // console.log(url);

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "downloadStm_" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log("I am in error", error);
        });
    });
  },
  // edit/update data
  editROUTINEData({ commit }, schema) {
    commit("SET_ACTION_PROCESS");
    let data = schema;
    console.log("DATA ACTION ", data);
    //["created_at", "updated_at", "deleted_at"].forEach(e => delete data[e]);
    const url = `${ExamRoutineUrl}/${data.id}`;
    console.log(ExamRoutineUrl + " bef url", url);

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.put(url, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: updateMsg,
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
  //for new submenu of routine chnage
  routineChangeSchemaData({ commit }, searchParam) {
    console.log("search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(ExamRoutineUrl, {
        params: searchParam,
      })

        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log(response.data.data);
          commit("SET_ROUTINE_SCHEMA_DATA", result[0]);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log("searchRoutine: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  // get routine date
  fetchRoutineDateData({ commit }, searchParam) {
    console.log("ACTI ", searchParam);
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.get(ExamRoutineDateUrl, {
        params: searchParam,
      })
        .then(function(response) {
          console.log("response", response.data.data);

          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_ROUTINE_DATE_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },
  // post routine change data
  changeRoutineDateData({ commit }, searchParam) {
    console.log("ACTI ", searchParam);
    var data = searchParam.data;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.post(ExamRoutineDateChangeApi, data, {
        params: searchParam.searchParam,
      })
        .then(function(response) {
          console.log("response", response.data.data);

          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            var result = response.data.data;
            commit("SET_ROUTINE_DATE_DATA", result);
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green",
            });
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
          // handle error
          console.log(error);
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },
  searchRoutineChangeNoticeData({ commit }, searchParam) {
    console.log("search Action", searchParam);
    return new Promise((resolve, reject) => {
      // loading  Opening
      Axios.get(ExamRoutineChangeNoticeApi, {
        params: searchParam,
      })

        .then(function(response) {
          var result = response.data;
          console.log(response.data);
          commit("SET_ROUTINE_CHANGE_NOTICE_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
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
