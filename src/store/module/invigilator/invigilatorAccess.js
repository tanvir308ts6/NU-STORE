/* eslint-disable prettier/prettier */
// axios
import Axios from "axios";

// apis
import { InvigilatorAccessApi, InvigilatorAccessApi2 } from "../../api";

// mutation types
import {
  SET_INVIGILATOR_ACCESS_DATA,
  // ADD_INVIGILATOR_ACCESS_DATA,
  SET_INVIGILATOR_ACCESS_SCHEMA,
  UNSET_INVIGILATOR_ACCESS_DATA_SCHEMA,
  SET_INVIGILATOR_ACCESS_GROUP_DATA,
} from "../../mutation-types";

// utilities
import { saveMsg, failedMsg } from "../../erpUtil";

const state = {
  schema: {
    exam_initiate_id: 1,
    exam_code: "",
    center_code: "",
    exam_name: "",
    year: "",
    invigilators: [],
  },
  datalist: [],
};

// getters
const getters = {
  // // get data lsit
  // getExaminerListItems(state) {
  //     return state.datalist;
  // },
  // get data access list
  getInvigilatorAccessItems(state) {
    return state.datalist;
  },
  // get form schema
  getInvigilatorAccessSchema(state) {
    return state.schema;
  },
  // // get data lsit
  // getExaminerGroupItems(state) {
  //     return state.datalist;
  // }
};

// mutations
const mutations = {
  // set data list
  [SET_INVIGILATOR_ACCESS_GROUP_DATA](state, result) {
    state.datalist = result;
  },
  [SET_INVIGILATOR_ACCESS_DATA](state, result) {
    result.invigilators.forEach((element) => {
      element.app_access = !!parseInt(element.app_access);
    });
    state.schema = result;
  },
  // set form schema
  [SET_INVIGILATOR_ACCESS_SCHEMA](state, schemaData) {
    state.schema = schemaData;
  },
  // unset form schema
  [UNSET_INVIGILATOR_ACCESS_DATA_SCHEMA](state) {
    state.schema = {
      exam_initiate_id: 1,
      exam_code: "",
      center_code: "",
      college_code: "",
      exam_name: "",
      year: "",
      invigilators: [],
    };
  },
};

const actions = {
  // get data list
  fetchInvigilatorAccessData({ commit }, data) {
    console.log("FETCH action Param -++--", data);
    let url = `${InvigilatorAccessApi}?college_code=${data.college_code}&exam_code=${data.exam_code}&year=${data.year}&center_code=${data.center_code}&exam_initiate_id=${data.exam_initiate_id}&exam_type=${data.exam_type}`;
    console.log("url ", url)
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.get(url)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("fetchInvigilatorAccessData:::  ", result);
          commit("SET_INVIGILATOR_ACCESS_DATA", result);
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
  // save data
  saveInvigilatorAccessData({ commit }, accessItem) {
    // let url = `${InvigilatorAccessApi}?role=${accessItem.role}`;
    console.log(JSON.stringify(accessItem));
    let data = accessItem;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.post(InvigilatorAccessApi, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
            // commit("ADD_INVIGILATOR_ACCESS_DATA", accessItem);
            commit("SET_SNACKBAR", {
              msg: saveMsg,
              color: "green",
            });
            //commit("UNSET_FORMNOTIFY");
            resolve();
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

  //search
  searchInvigilator({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(InvigilatorAccessApi2, {
        params: searchParam,
      })
        // Axios.post(LogData, params)
        .then(function(response) {
          console.log(" sp:: in then", response);

          commit("UNSET_LOADING"); // loading Closing

          if (response.data.status == "success") {
            var result = response.data.data;
            commit("SET_INVIGILATOR_ACCESS_DATA", result);
            resolve(result);
          } else {
            commit("UNSET_INVIGILATOR_ACCESS_DATA_SCHEMA");
            resolve([])
            //reject();
          }

          resolve([]);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
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
