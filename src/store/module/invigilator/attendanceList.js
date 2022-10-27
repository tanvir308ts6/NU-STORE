/* eslint-disable prettier/prettier */
import Axios from 'axios';

import {
    SET_ATTENDANCE_DATA,
    SET_STD_ATTENDANCE_DATA,
    SET_ATTENDANCE_DATA_BY_EY_MAIN,
    SET_ATTENDANCE_DATA_BY_EY_DETAILS,
    SET_ATTENDANCE_BY_EY_CURRENT_ITEM_DETAILS,
} from '../../mutation-types';

import {
  AttendanceListExportURL,
  AttendanceList_FetchUrl,
  StdAttendanceList_FetchUrl,
  AttendanceDetailsListExportURL,
  AttendanceListByEYMain,
  AttendanceListByEYDetails,
  AttendanceListUrlAll,
  ExamineeAttendanceExportURL,
} from "../../api";

const state = {
    schema: {
        center_code: '',
        college_code: '',
        created_at: '',
        datetime: '',
        exam_code: '',
        examinee_name: '',
        id: '',
        reg_no: '',
        script: '',
        session: '',
        updated_at: '',
        user_id: '',
    },
    datalist: [],
    stdDataList: [],
    datalistByEYMain: [],
    datalistByEYDetails: [],
    // current
    detailAttendanceByEYCurrentItem: {},
};

const getters = {
    getattendanceItem(state) {
        return state.datalist;
    },
    getStdattendanceItem(state) {
        return state.stdDataList;
    },
    getAttendanceByEYMainItem(state) {
        return state.datalistByEYMain;
    },
    getAttendanceByEYDetailsItem(state) {
        return state.datalistByEYDetails;
    },
    getAttendanceByEYCurrentDetailItem(state) {
        return state.detailAttendanceByEYCurrentItem;
    },
};
const mutations = {
    [SET_ATTENDANCE_DATA](state, result) {
        state.datalist = result;
    },
    [SET_STD_ATTENDANCE_DATA](state, result) {
        state.stdDataList = result;
        // // console.log("SET_ATTENDANCE_DATA", result);
    },
    [SET_ATTENDANCE_DATA_BY_EY_MAIN](state, result) {
        state.datalistByEYMain = result;
    },
    [SET_ATTENDANCE_DATA_BY_EY_DETAILS](state, result) {
        state.datalistByEYDetails = result;
    },

    [SET_ATTENDANCE_BY_EY_CURRENT_ITEM_DETAILS](state, result) {
        state.detailAttendanceByEYCurrentItem = result;
    },
    //
    // SET_ATTENDANCE_DATA_BYCOL_MAIN
};
const actions = {
  callAttendanceData({ commit }) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening

      Axios.get(AttendanceList_FetchUrl)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_ATTENDANCE_DATA", result);
          // // console.log("am I in then", response);
          // return state.datalist;
          resolve();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // // console.log(error);
          reject();
        });
    });
  },
  callStdAttendanceData({ commit }, limit) {
    let url = `${StdAttendanceList_FetchUrl}?limit=${limit.limit}&page=${limit.page}&search=${limit.search}`;
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading Opening

      Axios.get(url)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          commit("SET_STD_ATTENDANCE_DATA", result);
          // // console.log("am I in then", response);
          // return state.datalist;
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // // console.log(error);
          reject();
        });
    });
  },
  searchAttendance({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(AttendanceList_FetchUrl, {
        params: searchParam,
      })
        // Axios.post(LogData, params)
        .then(function(response) {
          // console.log("searchAttendance:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data;
          // console.log(response.data);
          commit("SET_ATTENDANCE_DATA", result);
          resolve();
        })
        .catch(function(error) {
          // console.log("searchAttendance: in catch ??");
          // commit("UNSET_LOADING"); // loading Closing
          // // console.log(error);
          reject();
        });
    });
  },
  searchStdAttendance({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      // commit("SET_LOADING", {
      //   color: "primary"
      // });
      // loading  Opening
      Axios.get(AttendanceListUrlAll, {
        params: searchParam,
      })
        // Axios.post(LogData, params)
        .then(function(response) {
          // // console.log("searchStdAttendance:  in then ??");
          // commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("searchStdAttendance Response :: ", response);
          commit("SET_STD_ATTENDANCE_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // console.log("searchAttendance: in catch ??");
          // commit("UNSET_LOADING"); // loading Closing
          // // console.log(error);
          reject();
        });
    });
  },

  searchAttendanceByExamYear({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(AttendanceListByEYMain, {
        params: searchParam,
      })
        // Axios.post(LogData, params)
        .then(function(response) {
          // console.log("searchAttendance:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // console.log("searchAttendanceByCol ˜˜˜", result);
          commit("SET_ATTENDANCE_DATA_BY_EY_MAIN", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // console.log("searchAttendance: in catch ??");
          // commit("UNSET_LOADING"); // loading Closing
          // // console.log(error);
          reject();
        });
    });
  },

  searchAttendanceBYExamYearDetails({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(AttendanceListByEYDetails, {
        params: searchParam,
      })
        // Axios.post(LogData, params)
        .then(function(response) {
          // console.log("searchAttendance:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("searchAttendanceBYExamYearDetails ----", response);
          commit("SET_ATTENDANCE_DATA_BY_EY_DETAILS", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // console.log("searchAttendance: in catch ??");
          // commit("UNSET_LOADING"); // loading Closing
          // // console.log(error);
          reject();
        });
    });
  },
  // exportAttendanceList({ commit }) {
  //     return new Promise((resolve, reject) => {
  //         commit('SET_LOADING', {
  //             color: 'primary',
  //         });
  //         Axios({
  //                 url: AttendanceListExportURL,
  //                 method: 'GET',
  //                 responseType: 'arraybuffer',
  //             })
  //             .then(response => {
  //                 commit('UNSET_LOADING'); // loading Closing
  //                 var fileURL = window.URL.createObjectURL(new Blob([response.data]));
  //                 var fileLink = document.createElement('a');
  //                 fileLink.href = fileURL;
  //                 fileLink.setAttribute(
  //                     'download',
  //                     'AttendanceList_' + Date.now() + '.pdf'
  //                 );
  //                 document.body.appendChild(fileLink);
  //                 fileLink.click();
  //             })
  //             .catch(function(error) {
  //                 commit('UNSET_LOADING'); // loading Closing
  //                 // console.log("I am in error", error);
  //             });
  //     });
  // },
  exportAttendanceList({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: AttendanceListExportURL,
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
          fileLink.setAttribute("download", "downloadStm_" + Date.now() + ".pdf");
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
        });
    });
  },
  exportAttendanceBySearch({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: AttendanceListExportURL,
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
          fileLink.setAttribute("download", "downloadStm_" + Date.now() + ".pdf");
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
        });
    });
  },
  //by search export
  // exportAttendanceBySearch({ commit }, searchParam) {
  //   console.log("AttendanceListExportURL", AttendanceListExportURL);
  //   return new Promise((resolve, reject) => {
  //     commit("SET_LOADING", {
  //       color: "primary",
  //     });
  //     Axios({
  //       url: AttendanceListExportURL,
  //       method: "GET",
  //       responseType: "arraybuffer",
  //       params: searchParam,
  //     })
  //       .then((response) => {
  //         commit("UNSET_LOADING"); // loading Closing
  //         // let url =
  //         var fileURL = window.URL.createObjectURL(
  //           new Blob([response.data.data])
  //         );
  //         var fileLink = document.createElement("a");
  //         fileLink.href = fileURL;
  //         fileLink.setAttribute(
  //           "download",
  //           "AttendanceListBySearch_" + Date.now() + ".pdf"
  //         );
  //         document.body.appendChild(fileLink);
  //         fileLink.click();
  //       })
  //       .catch(function(error) {
  //         commit("UNSET_LOADING"); // loading Closing
  //         console.log("I am in error", error);
  //       });
  //   });
  // },
  exportAttendanceDetailsList({ commit }, id) {
    let adleURL = AttendanceDetailsListExportURL + "" + id;
    // console.log(adleURL);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      Axios({
        url: adleURL,
        method: "GET",
        responseType: "arraybuffer",
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "AttendanceDetailsList_" + Date.now() + ".pdf");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
        });
    });
  },

  downloadExamineeAttendance({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: ExamineeAttendanceExportURL,
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
          fileLink.setAttribute("download", "examineeAttendance_" + Date.now() + ".pdf");
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
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

// attendance_id: "",
//     student_code: "",
//     student_name: "",
//     subject_code: "",
//     script_code: "",
//     roll_no: "",
//     datetime: "",
//     user_id: "",
//     user_name: "",
//     exam_name: "",
//     exam: ""