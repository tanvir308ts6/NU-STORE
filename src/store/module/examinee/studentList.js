/* eslint-disable prettier/prettier */
import Axios from "axios";

import {
  SET_STUDENT_LIST_DATA,
  SET_FINAL_EXAMINEE_LIST_DATA,
  SET_ADMIT_CARD_LIST_DATA,
  SET_ADMIT_CARD_COLLEGEWISE_DATA,
  UNSET_ADMIT_CARD_LIST_DATA,
  SET_STUDENT_LIST_PAGINATION_INFO,
  UNSET_ALL_STUDENT_LIST_DATA,
  SET_ADMIT_CARD_CURRENT_ITEM_DETAILS,
  UNSET_ADMIT_CARD_CURRENT_ITEM_DETAILS,
  UNSET_ADMIT_CARD_BY_COL_DETAILS,
  SET_ADMIT_GENNERATE_PROGRESS_DATA,
} from "../../mutation-types";

import {
  GenerateAdmitCardApi,
  StudentListApi,
  AdmitCardListApi,
  GenerateAdmitCardCollegeByApi,
  downloadAdmit,
  GenerateAdmitCardApiColWise,
  FormFillUpAllUrl,
  AdmitCardByColUrl_Main,
  AdmitCardByColUrl_Details,
  AdmitCardUrl_All,
  GenerateAdmitCardApiFromTo,
  AdmitcardGenerateProcessURL,
  downloadCertificateByCollege,
} from "../../api";

const state = {
  schema: {
    id: "",
    reg_no: "",
    admission_roll: "",
    name: "",
    name_bn: "",
    father_name: "",
    father_name_bn: "",
    mother_name: "",
    mother_name_bn: "",
    session_year: "",
    session_year_expire: "",
    degree_code: "",
    degree_group_code: "",
    college_code: "",
    subject_code: "",
    exam_code: "",
    exam_name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    student_type: "",
    gender: "",
    photo_url: "",
    admission_score: "",
    merit_position: "",
    created_by: "",
    updated_by: "",
    deleted_by: "",
    created_at: "",
    updated_at: "",
    exam_title: "",
    college_name: "",
    session: "",
    year: "",
    total: "",
  },
  datalist: [],
  pagiInfo: {},
  examineelist: [],
  admitcardlist: [],
  admitcardGroupByCollegelist: [],
  admitCardCurrentDetailItem: {},
  progressList: [],
};

const getters = {
  // get data lsit
  getStudentListItem(state) {
    return state.datalist;
  },
  getStudentListPagiInfo(state) {
    return state.pagiInfo;
  },
  // get  Final examinee lsit
  getFinalExamineeList(state) {
    return state.examineelist;
  },
  // get form schema
  getStudentListSchema(state) {
    return state.schema;
  },
  // get  admit card lsit
  getAdmitCardList(state) {
    return state.admitcardlist;
  },
  // get  admit card group by college lsit
  getAdmitCardGroupByCollegeList(state) {
    return state.admitcardGroupByCollegelist;
  },
  getAdmitCardCurrentDetailItem(state) {
    return state.admitCardCurrentDetailItem;
  },
  getAdmitCardProgressList(state) {
    return state.progressList;
  },
};
const mutations = {
  //set data
  [SET_STUDENT_LIST_DATA](state, result) {
    state.datalist = result;
  },
  //set examinee data
  [SET_FINAL_EXAMINEE_LIST_DATA](state, result) {
    state.examineelist = result;
  },
  //set admit card data
  [SET_ADMIT_CARD_LIST_DATA](state, result) {
    state.admitcardlist = result;
  },
  //unset admit card data
  [UNSET_ADMIT_CARD_LIST_DATA](state) {
    state.admitcardlist = [];
  },
  [UNSET_ADMIT_CARD_BY_COL_DETAILS](state) {
    state.admitcardlist = [{}];
  },
  //set admit card groupby college data
  [SET_ADMIT_CARD_COLLEGEWISE_DATA](state, result) {
    state.admitcardGroupByCollegelist = result;
  },
  [SET_STUDENT_LIST_PAGINATION_INFO](state, pagiInfo) {
    state.pagiInfo = pagiInfo;
  },
  [UNSET_ALL_STUDENT_LIST_DATA](state) {
    state.schema = {};
    state.datalist = [];
    state.pagiInfo = {};
    state.examineelist = [];
    state.admitcardlist = [];
    state.admitcardGroupByCollegelist = [];
  },
  // UNSET_ALL_STUDENT_LIST_DATA

  // CURRENT
  [SET_ADMIT_CARD_CURRENT_ITEM_DETAILS](state, item) {
    state.admitCardCurrentDetailItem = item;
  },
  [UNSET_ADMIT_CARD_CURRENT_ITEM_DETAILS](state) {
    state.admitCardCurrentDetailItem = {};
  },
  [SET_ADMIT_GENNERATE_PROGRESS_DATA](state, data) {
    state.progressList = data;
  },
};
const actions = {
  //all data
  fetchStudentListData({ commit }, url) {
    // console.log("---fetch Action-----", url);
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.get(StudentListApi + url)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_STUDENT_LIST_DATA", result);

          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          reject();
        });
    });
  },

  //Get all Final Examinee data
  fetchFinalExamineeData({ commit }, data) {
    let url = `${StudentListApi}?final=${data}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.get(url)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_FINAL_EXAMINEE_LIST_DATA", result);

          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          reject();
        });
    });
  },

  searchPracticalFinalExamineeData({ commit }, searchParam) {
    // let url = `${StudentListApi}?final=${false}&type=2`;
    console.log("sp", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(FormFillUpAllUrl, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // console.log(response.data.data);
          commit("SET_FINAL_EXAMINEE_LIST_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },

  //after search data
  searchFinalExamineeData({ commit }, searchParam) {
    // let url = `${StudentListApi}?final=${true}`;

    // console.log("final:: FormFillUpAllUrl:", FormFillUpAllUrl);
    // loading  Opening
    // console.log("final:: Search Action", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(FormFillUpAllUrl, {
        params: searchParam,
      })
        .then(function(response) {
          // // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // console.log(response.data.data);
          commit("SET_FINAL_EXAMINEE_LIST_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          reject();
        });
    });
  },

  //after search data
  searchStudentListData({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", { color: "primary" }); // loading  Opening
      Axios.get(StudentListApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // console.log(response.data.data);
          commit("SET_STUDENT_LIST_DATA", result);
          commit("SET_STUDENT_LIST_PAGINATION_INFO", {
            links: response.data.links,
            meta: response.data.meta,
          });
          resolve(response.data.meta);
        })
        .catch(function(error) {
          // console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          reject();
        });
    });
  },

  //get all admit card data
  fetchAdmitCardListData({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.get(AdmitCardListApi)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_ADMIT_CARD_LIST_DATA", result);

          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          reject();
        });
    });
  },

  //after search data
  // searchAdmitCardListData({ commit }, searchParam) {
  //   return new Promise((resolve, reject) => {
  //     commit("SET_LOADING", {
  //       color: "primary"
  //     });
  //     // loading  Opening
  //     Axios.get(AdmitCardListApi, {
  //       params: searchParam
  //     })

  //       .then(function(response) {
  //         commit("UNSET_LOADING"); // loading Closing
  //         var result = response.data.data;
  //         //// console.log(response.data.data);
  //         commit("SET_ADMIT_CARD_LIST_DATA", result);
  //         resolve();
  //       })
  //       .catch(function(error) {
  //         // // console.log("searchFormFillup: in catch ??");
  //         commit("UNSET_LOADING"); // loading Closing
  //         // console.log(error);
  //         reject();
  //       });
  //   });
  // },
  searchAdmitCardListData({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      // commit("SET_LOADING", {
      //   color: "primary"
      // });
      // loading  Opening AdmitCardUrl_All
      // old url AdmitCardListApi
      Axios.get(AdmitCardUrl_All, {
        params: searchParam,
      })
        .then(function(response) {
          // // console.log("search:  in then ??");
          // commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("-all res->", response.data);
          commit("SET_ADMIT_CARD_LIST_DATA", result);
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
  generateAdmitCard({ commit }) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(GenerateAdmitCardApi)
        .then(function(response) {
          commit("UNSET_LOADING");
          // console.log(response.data);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          reject();
        });
    });
  },
  generateAdmitCardColwise({ commit }, searchParam) {
    // pro bro
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening AdmitCardByColUrl_Main
      Axios.get(GenerateAdmitCardApiColWise, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING");
          // console.log(response.data);
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          reject();
        });
    });
  },
  generateAdmitCardFormTo({ commit }, searchParam) {
    // console.log(GenerateAdmitCardApiFromTo);
    console.log("generateAdmitCardFormTo::", searchParam);

    let param = { ...searchParam };

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening AdmitCardByColUrl_Main
      Axios.get(GenerateAdmitCardApiFromTo, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING");
          console.log(response.data);
          if (response.data.status == "error") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green",
            });
          }
          resolve(response.data.admit_card_generated_status);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  admitcardGenerateProcess({ commit }, searchParam) {
    // console.log("here !!");
    return new Promise((resolve, reject) => {
      // loading  Opening
      Axios.get(AdmitcardGenerateProcessURL, {
        params: searchParam,
      })
        .then(function(response) {
          console.log("here_", response.data.data);
          commit("SET_ADMIT_GENNERATE_PROGRESS_DATA", response.data.data.data);
          resolve(response.data.data);
        })
        .catch(function(response) {
          commit("SET_SNACKBAR", {
            msg: response.data.message,
            color: "red",
          });
          // commit("UNSET_LOADING");
          // console.log(error);
          reject();
        });
    });
  },

  downloadAdmitCard({ commit }, url) {
    // console.log("---download Action-----", url);
    var fileLink = document.createElement("a");
    fileLink.href = url;
    fileLink.href = url;
    fileLink.setAttribute("download", "admitCard_" + Date.now() + ".pdf");
    document.body.appendChild(fileLink);
    fileLink.click();
  },

  //admit card college wise

  //get data
  fetchAdmitCardCollegewiseData({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening
      Axios.get(GenerateAdmitCardCollegeByApi)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_ADMIT_CARD_COLLEGEWISE_DATA", result);

          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          reject();
        });
    });
  },

  //after search
  searchAdmitCardCollegewiseData({ commit }, searchParam) {
    // console.log("---search Action-----", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(AdmitCardByColUrl_Main, {
        params: searchParam,
      })
        .then(function(response) {
          // // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // console.log(">>", response.data);
          commit("SET_ADMIT_CARD_COLLEGEWISE_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
          reject(response.data.meta);
        });
    });
  },
  //dowload
  downloadAdmitCollegewise({ commit }, item) {
    // console.log("--- Action-----", item);
    // let url = `${StudentListApi}?module_name=${true}`;
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(downloadAdmit, {
        params: item,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("responseresponse", response.data.status);
          if (response.data.status === "success") {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "green",
            });
            // resolve(result);
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            // reject();
          }

          // console.log("r", result);
          //commit("SET_ADMIT_CARD_COLLEGEWISE_DATA", result);
          resolve(result);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log(error);
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
