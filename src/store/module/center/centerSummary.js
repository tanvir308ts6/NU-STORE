/* eslint-disable prettier/prettier */
import Axios from "axios";

import {
  SET_SUMM_SUB_PAP_WISE_DATA,
  SET_SUMM_ROOM_INVI_WISE_DATA,
  UNSET_SUMM_SUB_PAP_WISE_DATA,
  UNSET_SUMM_ROOM_INVI_WISE_DATA,
  SET_ATT_SUMMARY_CENTER_WISE_DATA,
} from "../../mutation-types";

import {
  SummarySubPap_FetchUrl,
  SummaryRoomInvi_FetchUrl,
  SummaryRoomInviDown_FetchUrl,
  SummarySubPapDown_FetchUrl,
  attendCenterwiseSummary_FetchUrl,
  centerwise_inv_api, //used in ans-deli-from-center page
} from "../../api";

const state = {
  schema: {
    id: "",
    center_code: "",
    center_name: "",
    e_type_count: "",
    exam_code: "",
    exam_initiate_id: "",
    exam_name: "",
    paper_code: "",
    paper_name: "",
    script_count: "",
    subject_code: "",
    subject_name: "",
    year: "",
  },
  subpaperwiselist: [],
  roominviwiselist: [],
  attsummcenterwise: [],
};

const getters = {
  // get  summary by sub-paper lsit
  subPaperwiseSummaryList(state) {
    return state.subpaperwiselist;
  },
  // get  summary by room-invi lsit
  summaryByRoomInviList(state) {
    return state.roominviwiselist;
  },
  // get att. summary by centerlsit
  attSummaryByCenterList(state) {
    // console.log("state.attsummcenterwise", state.attsummcenterwise)
    return state.attsummcenterwise;
  },
};
const mutations = {
  //set summary by sub-paper
  [SET_SUMM_SUB_PAP_WISE_DATA](state, result) {
    state.subpaperwiselist = result;
  },
  //set summary by room-invi
  [SET_SUMM_ROOM_INVI_WISE_DATA](state, result) {
    state.roominviwiselist = result;
  },
  //set summary by sub-paper
  [UNSET_SUMM_SUB_PAP_WISE_DATA](state) {
    state.subpaperwiselist = [];
  },
  //set summary by room-invi
  [UNSET_SUMM_ROOM_INVI_WISE_DATA](state) {
    state.roominviwiselist = [];
  },
  //set att. summary by center
  [SET_ATT_SUMMARY_CENTER_WISE_DATA](state, result) {
    state.attsummcenterwise = result;
  },
};
const actions = {
  //summary by sub-paper
  subPaperwiseSummaryData({ commit }, searchParam) {
    if (searchParam.date) {
      searchParam.datetime = searchParam.date;
    }

    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(SummarySubPap_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          commit("UNSET_SUMM_SUB_PAP_WISE_DATA");
          if (response.data.status == "error") {
            console.log("....if");
            resolve(response.data);
          } else {
            var result = response.data.data;
            commit("SET_SUMM_SUB_PAP_WISE_DATA", result);
            resolve(response.data);
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  exportSummaryBySubPaper({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // download
    return new Promise((resolve, reject) => {
      Axios({
        url: SummarySubPapDown_FetchUrl,
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
  //summary by room-invi
  summaryByRoomInviData({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(SummaryRoomInvi_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          commit("UNSET_SUMM_ROOM_INVI_WISE_DATA");
          if (response.data.status == "error") {
            console.log("....if");
            resolve(response.data);
          } else {
            var result = response.data.data;
            commit("SET_SUMM_ROOM_INVI_WISE_DATA", result);
            resolve(response.data);
          }
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  exportSummaryByRoomInvi({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // download
    return new Promise((resolve, reject) => {
      Axios({
        url: SummaryRoomInviDown_FetchUrl,
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
  //attendance summary center-wise
  attSummaryCenterwiseData({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      // commit('SET_LOADING', {
      //     color: 'primary',
      // });
      // loading  Opening
      Axios.get(attendCenterwiseSummary_FetchUrl, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("result :", result);

          commit("SET_ATT_SUMMARY_CENTER_WISE_DATA", result);
          // commit('SET_SNACKBAR', {
          //     msg: 'Attendance Summary ' + response.data.message,
          //     color: 'green',
          // });
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  CenterwiseInvData({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      // commit('SET_LOADING', {
      //     color: 'primary',
      // });
      // loading  Opening
      Axios.get(centerwise_inv_api, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("result :", result);

          commit("SET_ATT_SUMMARY_CENTER_WISE_DATA", result);
          // commit('SET_SNACKBAR', {
          //     msg: 'Attendance Summary ' + response.data.message,
          //     color: 'green',
          // });
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  exportSummary({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // download
    return new Promise((resolve, reject) => {
      Axios({
        url: attendCenterwiseSummary_FetchUrl,
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
