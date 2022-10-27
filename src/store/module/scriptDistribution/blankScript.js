/* eslint-disable prettier/prettier */
import Axios from "axios";
import {
  rcWiseDistributionSummaryURL,
  rcWiseDistributionDataURL,
  rcWiseChallanDistributionURL,
  CenterWiseDistributionDataURL,
  recieveBsByRegCenterAPI,
  rcToCenterDistributionURL,
  // pdf apis
  scriptStatementDownload,
  centerScriptDistributionDownloadAllotmentReport,
  regionalcenterScriptDistributionDownloadAllotmentReport,
  BSChallanURL,
  addToChallanBsNuToRegApi,
  addToChallanBsNuToCenterApi,
  BsChallanDownloadApi,
  BSNURChallanURL,
  BSNUCChallanDistURL,
  BsGatepassDownloadApi,
  BsCenterChallanDownloadApi,
  BsCenterGatepassDownloadApi,
  BsRCtoCenterGatepassDownloadApi,
  BsRCtoCenterChallanDownloadApi,
} from "@/store/api";

import {
  SET_RC_WISE_DIST_SUMMARY,
  UNSET_RC_WISE_DIST_SUMMARY,
  SET_RC_DIST_CENTER_LIST,
  SET_CENTER_WISE_DIST_LIST,
  UNSET_CENTER_WISE_DIST_LIST,
  SET_BS_CHALLAN_LIST,
  SET_BS_NUR_CHALLAN_LIST,
  SET_BS_NUtoCenter_CHALLAN_LIST
} from "@/store/mutation-types";

const state = {
  rcWiseDistributionSummary: [],
  rcWiseDistCenterList: [],
  centerWiseDistList: [],
  bsChallanList:[],
  bsNURChallanList:[], bsNUCChallanList:[]
};

const getters = {
  getRcWiseDistributionSummary(state) {
    return state.rcWiseDistributionSummary;
  },
  getRcWiseDistCenterList(state) {
    return state.rcWiseDistCenterList;
  },
  getCenterWiseDistCenterList(state) {
    return state.centerWiseDistList;
  },
  getBsChallanList(state){
    return state.bsChallanList;
  },
  getBsNURChallanList (state){
    return state.bsNURChallanList;
  },
  getBsNUCChallanList (state){
    return state.bsNUCChallanList;
  }
};

const mutations = {
  [SET_RC_WISE_DIST_SUMMARY](state, result) {
    state.rcWiseDistributionSummary = result;
  },
  [UNSET_RC_WISE_DIST_SUMMARY](state) {
    state.rcWiseDistributionSummary = [];
  },
  [SET_RC_DIST_CENTER_LIST](state, result) {
    state.rcWiseDistCenterList = result;
  },
  [SET_CENTER_WISE_DIST_LIST](state, result) {
    state.centerWiseDistList = result;
  },
  [SET_BS_CHALLAN_LIST](state, result){
    state.bsChallanList = result;
  },
  [SET_BS_NUR_CHALLAN_LIST](state,result){
    state.bsNURChallanList  = result;
  },
  [SET_BS_NUtoCenter_CHALLAN_LIST](state, result) {
    state.bsNUCChallanList = result
  }
  // [UNSET_CENTER_WISE_DIST_LIST](state, result) {
  //   console.log("here !!");
  //   state.centerWiseDistList = [];
  // },
};

const actions = {
  fetchRcWiseDistributionSummary({ commit }, payLoad) {
    payLoad.limit = -1;
    return new Promise(function(resolve, reject) {
      Axios.get(rcWiseDistributionSummaryURL, {
        params: payLoad,
      })
        .then(function(response) {
          var result = response.data.data;
          console.log("ok", result);
          commit("SET_RC_WISE_DIST_SUMMARY", result);
          resolve(result.total_centers);
        })
        .catch(function(error) {
          reject();
        });
    });
  },

  searchRcWiseDistributionData({ commit }, searchParam) {
    console.log("searchRcWiseDistributionData:", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(rcWiseDistributionDataURL, {
        params: searchParam,
      })
        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data.centers;
          console.log("bro bro", response.data.data);
          commit("SET_RC_DIST_CENTER_LIST", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log("searchRcMappingCenterListData");
          commit("UNSET_RC_MAPPING_CENTER_LIST"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  searchCenterWiseDistributionData({ commit }, searchParam) {
    console.log("searchRcWiseDistributionData:", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(CenterWiseDistributionDataURL, {
        params: searchParam,
      })
        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("searchCenterWiseDistributionData", response.data);
          commit("SET_CENTER_WISE_DIST_LIST", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log("searchRcMappingCenterListData");
          commit("UNSET_RC_MAPPING_CENTER_LIST"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
  distributeBsByCenter({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(CenterWiseDistributionDataURL, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data;
          resolve(response);
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  distributeBsByRegCenter({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(rcWiseChallanDistributionURL, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data;
          resolve(response);
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  distributeBsNuToCenter({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(BSNUCChallanDistURL, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data;
          resolve(response);
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  distributeBsByRegCenterToCenter({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(rcToCenterDistributionURL, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data;
          resolve(response);
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  recieveBsByRegCenter({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(recieveBsByRegCenterAPI, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data;
          resolve(response);
        })
        .catch(function(error) {
          reject();
        });
    });
  },

  // pdf download actions:
  download_BS_Statement({ commit }, searchParam) {
    console.log(searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: scriptStatementDownload,
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
            "scriptStatementDownload_" + Date.now() + ".pdf"
          );
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
  download_BS_AllotmentReport_ByCenter({ commit }, searchParam) {
    console.log(searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: centerScriptDistributionDownloadAllotmentReport,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          console.log(response);
          let url = response.data.data;

          if (url) {
            var fileLink = document.createElement("a");
            fileLink.href = url;
            fileLink.setAttribute("download", "BS_" + Date.now() + ".pdf");
            fileLink.setAttribute("target", "_blank");
            document.body.appendChild(fileLink);
            fileLink.click();
            resolve();
          } else {
            commit("SET_SNACKBAR", {
              msg: response.data.message,
              color: "red",
            });
            reject();
            // console.log("-else->", url);
          }

          // showing on a new tab
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
        });
    });
  },

  fetchBSChallanList({ commit }, payLoad) {
    payLoad.limit = -1;
    return new Promise(function(resolve, reject) {
      Axios.get(BSChallanURL, {
        params: payLoad,
      })
        .then(function(response) {
          var result = response.data.data;
          console.log(result);
          commit("SET_BS_CHALLAN_LIST", result);
          resolve(result);
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  fetchBSNUtoCenterChallanList({ commit }, payLoad) {
    payLoad.limit = -1;
    return new Promise(function(resolve, reject) {
      Axios.get(BSChallanURL, {
        params: payLoad,
      })
        .then(function(response) {
          var result = response.data.data;
          console.log(result);
          commit("SET_BS_NUtoCenter_CHALLAN_LIST", result);
          resolve(result);
        })
        .catch(function(error) {
          reject();
        });
    });
  },

  fetchBSNUtoRChallanList({ commit }, payLoad) {
    payLoad.limit = -1;
    return new Promise(function(resolve, reject) {
      Axios.get(BSNURChallanURL, {
        params: payLoad,
      })
        .then(function(response) {
          var result = response.data.data;
          console.log(result);
          commit("SET_BS_NUR_CHALLAN_LIST", result);
          resolve(result);
        })
        .catch(function(error) {
          reject();
        });
    });
  },

  addToChallanBsNuToReg({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(addToChallanBsNuToRegApi, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data;
          resolve(response);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },

  addToChallanBsNuToCenter({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(addToChallanBsNuToCenterApi, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data;
          resolve(response);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          reject();
        });
    });
  },
  // challan Nu to cen
  download_BS_CenterChallanByCode({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });

    return new Promise((resolve, reject) => {
      Axios({
        url: BsCenterChallanDownloadApi,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log("this is the url", url);

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "ansScriptStickerDownload" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
        });
    });
  },
  //bs - nu to center gate pass DL
  download_BS_gatepass_NUto_cen({ commit }, searchParam) {
    console.log(searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise((resolve, reject) => {
      Axios({
        url: BsCenterGatepassDownloadApi,
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
            "gatepassDownload_" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
        });
    });
  },

  // challan Nu to Reg
  download_BS_ChallanByCode({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });

    return new Promise((resolve, reject) => {
      Axios({
        url: BsChallanDownloadApi,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log("this is the url", url);

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "ansScriptStickerDownload" + Date.now() + ".pdf"
          );
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
  download_BS_AllotmentReport_ByReg({ commit }, searchParam) {
    console.log(searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: regionalcenterScriptDistributionDownloadAllotmentReport,
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
          fileLink.setAttribute("download", "BS_" + Date.now() + ".pdf");
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
  //bs - nu to regcent gate pass DL
  download_BS_gatepass_NUto_reg({ commit }, searchParam) {
    console.log(searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise((resolve, reject) => {
      Axios({
        url: BsGatepassDownloadApi,
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
            "gatepassDownload_" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
        });
    });
  },
  //bs recieve & delivery - regcent to center gate pass DL
  download_BS_gatepass_RCto_cen({ commit }, searchParam) {
    console.log(searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise((resolve, reject) => {
      Axios({
        url: BsRCtoCenterGatepassDownloadApi,
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
            "gatepassDownload_" + Date.now() + ".pdf"
          );
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
        });
    });
  },
  // bs recieve & delivery - challan Reg to center
  download_BS_RC_to_CenChallanByCode({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });

    return new Promise((resolve, reject) => {
      Axios({
        url: BsRCtoCenterChallanDownloadApi,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          console.log("this is the url", url);

          // showing on a new tab
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute(
            "download",
            "ansScriptStickerDownload" + Date.now() + ".pdf"
          );
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
