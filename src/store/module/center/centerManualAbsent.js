// axios
import Axios from "axios";

// apis
import { center_manual_Absent_api } from "../../api";
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// mutation types
import {
  SET_MANUAL_ABSENT_ENTRY_DATA,
  ADD_MANUAL_ABSENT_ENTRY_DATA,
  SET_MANUAL_ABSENT_ENTRY_SCHEMA,
  UNSET_MANUAL_ABSENT_ENTRY_SCHEMA,
} from "../../mutation-types";

const state = {
  schema: {
    rn: "1",
    exam_initiate_id: "",
    exam_code: "",
    exam_name: "",
    exam_year: "",
    exam_date: "",
    center_code: "",
    center_name: "",
    total_examinee: "",
    total_present: "",
    total_absent: "",
    manual_absent: 0,
    manual_reported: 0,
  },
  CenManualAbsentEntryData: [],
};

// getters
const getters = {
  // get data lsit
  getCenManualAbsentEntryData(state) {
    return state.CenManualAbsentEntryData;
  },
  getCenManualAbsentEntrySchema(state) {
    return state.schema;
  },
};

// mutations
const mutations = {
  // set data list
  [SET_MANUAL_ABSENT_ENTRY_DATA](state, result) {
    state.CenManualAbsentEntryData = result;
  },
  [ADD_MANUAL_ABSENT_ENTRY_DATA](state, jschema) {
                                                   state.CenManualAbsentEntryData.push(
                                                     jschema
                                                   );
                                                   //state.CenManualAbsentEntryData = jschema;
                                                 },
  // set form schema
  [SET_MANUAL_ABSENT_ENTRY_SCHEMA](state, schemaData) {
    state.schema = schemaData;
  },
  // unset form schema
  [UNSET_MANUAL_ABSENT_ENTRY_SCHEMA](state) {
    state.schema = {
      rn: state.schema.rn,
      exam_initiate_id: "",
      exam_code: "",
      exam_name: "",
      exam_year: "",
      exam_date: "",
      center_code: "",
      center_name: "",
      total_examinee: "",
      total_present: "",
      total_absent: "",
      manual_absent: 0,
      manual_reported: 0,
    };
  },
};

const actions = {
  // get data list
  searchCenManualAbsentEntryData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.get(center_manual_Absent_api, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("result", result);
          commit("SET_MANUAL_ABSENT_ENTRY_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  // save data
  saveCenManualAbsentEntryData({ commit }, schema) {
    let data = schema;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.post(center_manual_Absent_api, data)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          if (response.data.status === "success") {
                                                    // commit("ADD_MANUAL_ABSENT_ENTRY_DATA", data);
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
  // edit or update data
  editCenManualAbsentEntryData({ commit }, schema) {
    let data = schema;
    console.log("DATA ACTION ", data);
    const url = `${center_manual_Absent_api}/${data.id}`;
    console.log(" bef url", url);

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      }); // loading Opening
      Axios.put(url, data)
        .then(function(response) {
          console.log("after response edit", response.data);
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
