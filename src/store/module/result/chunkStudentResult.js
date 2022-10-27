/* eslint-disable prettier/prettier */
import Axios from "axios";
import { chunkApi, applicationStatusChangeApi,practicalMarkEntryApi, RegCenListExportURL,vivaMarkEntryApi,stdApplicationApi,stdApplicationPaperApi,categoryApi,saveAppStudentData,attendanceEntryApi } from "../../api";
import {
  SET_CHUNK_STUDENT_DATA,
  SET_STUDENT_APPLICATION_DATA,
  SET_STUDENT_APPLICATION_PAPER_DATA,
  SET_CATEGORY_DATA,
  ADD_CHUNK_DATA,
  SET_MESSAGE,
  UNSET_MESSAGE,
  SET_ACTION_PROCESS,
  UNSET_ACTION_PROCESS,
  SET_CHUNK_STUDENT_SCHEMA,
  SET_CHUNK_STUDENT_PAPER_SCHEMA,
  UNSET_CHUNK_STUDENT_PAPER_SCHEMA,
  UNSET_CHUNK_STUDENT_SCHEMA,
  SET_APPLIED_STUDENT_PAPER_SCHEMA,
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
    chunk_no: "",
    reg_no: "",
    paper_info:[
       {
         paper_code: "",
         paper_name: "",
       }
    ],
    created_at: "",
    updated_at: "",
    deleted_at: "",
    created_by: "",
    updated_by: "",
    deleted_by: "",
  },
  appStudentSchema :{

  },
  schemaReviseDetailData:[],
  datalist: [],
  studentApplicationList: [],
  studentApplicationPaperList: [],
  categoryListData: [],
};

const getters = {
  getChunkStudentItem(state) {
    return state.datalist;
  },
  getStudentApplicationData(state) {
    return state.studentApplicationList;
  },
   getStudentApplicationPaperData(state) {
    return state.studentApplicationPaperList;
  },
  
  getCategoryListData(state) {
    return state.categoryListData;
  },
  
  getChunkSchema(state) {
    return state.schema;
  },
  getAppliedStudentSchema(state) {
    return state.appStudentSchema;
  },
   getReviseDetailSchema(state) {
    return state.schemaReviseDetailData;
  },
};
const mutations = {
  [SET_CHUNK_STUDENT_DATA](state, result) {
    state.datalist = result;
  },
  [SET_STUDENT_APPLICATION_DATA](state, result) {
    state.studentApplicationList = result;
  },
  [SET_STUDENT_APPLICATION_PAPER_DATA](state, result) {
    state.studentApplicationPaperList = result;
  },
  [SET_CATEGORY_DATA](state, result) {
    state.categoryListData = result;
  },
  
  [ADD_CHUNK_DATA](state, jschema) {
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
  [SET_CHUNK_STUDENT_SCHEMA](state, schemaData) {
    state.schema = schemaData;
  },
  [SET_CHUNK_STUDENT_PAPER_SCHEMA](state, schemaReviseDetail) {
    
    state.schemaReviseDetailData = schemaReviseDetail;
  },
  [SET_APPLIED_STUDENT_PAPER_SCHEMA](state, schemaAppStudent) {
    
    state.appStudentSchema = schemaAppStudent;
  },
   [UNSET_CHUNK_STUDENT_PAPER_SCHEMA](state, schemaAppStudent) {
    
    state.studentApplicationPaperList = "";
  },
  // [UNSET_CHUNK_STUDENT_PAPER_SCHEMA](state) {
  //     state.schema = {
  //     id: state.schema.id,
  //     installment_no: state.schema.installment_no,
  //     reg_no: state.schema.reg_no,
  //     exam_roll: state.schema.exam_roll,
  //     deleted_at: "",
  //     created_by: "",
  //     updated_by: "",
  //     deleted_by: "",
  //     created_at: "",
  //     updated_at: "",
  //   };
  // },
  
  [UNSET_CHUNK_STUDENT_SCHEMA](state) {
    state.schema = {
      id: state.schema.id,
      installment_no: state.schema.installment_no,
      reg_no: state.schema.reg_no,
      exam_roll: state.schema.exam_roll,
      deleted_at: "",
      created_by: "",
      updated_by: "",
      deleted_by: "",
      created_at: "",
      updated_at: "",
    };
    state.schemaReviseDetailData = "";
  },
};
const actions = {
    
  callCategoryData({ commit }, searchParam) {
        console.log(JSON.stringify(searchParam));
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // console.log("FormFillUpAllUrl:", FormFillUpAllUrl);
            // loading  Opening
            Axios.get(categoryApi, {
                params: searchParam,
            })
            .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); 
                    // loading Closing
                    var result = response.data.data;
                    // console.log(JSON.stringify(response.data.data));
                    commit('SET_CATEGORY_DATA', result);
                    resolve(response.data);
                })
            .catch(function(error) {

                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
  callStudentApplicationData({ commit }, searchParam) {
        console.log(JSON.stringify(searchParam));
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // console.log("FormFillUpAllUrl:", FormFillUpAllUrl);
            // loading  Opening
            Axios.get(stdApplicationApi, {
                params: searchParam,
            })
            .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); 
                    // loading Closing
                    var result = response.data.data.data;
                    // console.log(JSON.stringify(response.data.data));
                    commit('SET_STUDENT_APPLICATION_DATA', result);
                    resolve(response.data);
                })
            .catch(function(error) {

                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
    callStudentApplicationPaperData({ commit }, searchParam) {
        console.log(JSON.stringify(searchParam));
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // console.log("FormFillUpAllUrl:", FormFillUpAllUrl);
            // loading  Opening
            Axios.get(stdApplicationPaperApi, {
                params: searchParam,
            })
            .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); 
                    // loading Closing
                    var result = response.data;
                    // console.log(JSON.stringify(response.data.data));
                    commit('SET_STUDENT_APPLICATION_PAPER_DATA', result);
                    resolve(response.data);
                })
            .catch(function(error) {

                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },
  callChunkStudentData({ commit }, searchParam) {
        console.log(JSON.stringify(searchParam));
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            });
            // console.log("FormFillUpAllUrl:", FormFillUpAllUrl);
            // loading  Opening
            Axios.get(chunkApi, {
                params: searchParam,
            })
            .then(function(response) {
                    // console.log("search:  in then ??");
                    commit('UNSET_LOADING'); 
                    // loading Closing
                    var result = response.data.data;
                    // console.log(JSON.stringify(response.data.data));
                    commit('SET_CHUNK_STUDENT_DATA', result);
                    resolve(response.data);
                })
            .catch(function(error) {

                    commit('UNSET_LOADING'); // loading Closing
                    console.log(error);
                    reject();
                });
        });
    },

  saveAttendanceEntry({ commit }, schema) {
    console.log(".....");
    console.log(JSON.stringify(schema));
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.post(attendanceEntryApi, data)
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
  savePracticalMarkEntry({ commit }, schema) {
    console.log(".....");
    console.log(JSON.stringify(schema));
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.post(practicalMarkEntryApi, data)
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
   saveVivaMarkEntry({ commit }, schema) {
    console.log(".....");
    console.log(JSON.stringify(schema));
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.post(vivaMarkEntryApi, data)
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
  putApplicationDataStatusChange({ commit }, schema) {
    console.log(".....");
    console.log(JSON.stringify(schema));
    let data = schema;
    ["created_at", "updated_at", "deleted_at"].forEach((e) => delete data[e]);
    commit("SET_ACTION_PROCESS");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios.put(applicationStatusChangeApi, data)
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
  
       deleteChunkResultItem({ commit }, item) {
        let url = `${chunkApi}/${item}`;
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', {
                color: 'primary',
            }); // loading Opening
            Axios.delete(url)
                .then(function(response) {
                    commit('UNSET_LOADING'); // loading Closing
                    if (response.data.status === 'success') {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'green',
                        });
                        resolve('done');
                    } else {
                        commit('SET_SNACKBAR', {
                            msg: response.data.message,
                            color: 'red',
                        });
                        reject();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    commit('UNSET_LOADING'); // loading Closing
                    commit('SET_SNACKBAR', {
                        msg: response.data.message,
                        color: 'red',
                    });
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
