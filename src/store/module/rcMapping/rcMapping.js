/* eslint-disable prettier/prettier */
import Axios from "axios";
import {
  rcMappingSubmitURL,
  rcMappingSummaryURL,
  rcMappingCenterListURL,
  rcMappedCenterDetailsURL,
  rcMappingReportUrl,
  rcMappingRevokeURL,
} from "@/store/api";

import {
  SET_RC_MAPPING_SUMMARY,
  UNSET_RC_MAPPING_SUMMARY,
  SET_RC_MAPPING_CENTER_LIST,
  UNSET_RC_MAPPING_CENTER_LIST,
} from "@/store/mutation-types";

const state = {
  rcMappingSummary: [],
  rcMappingCenterList: [],
};

const getters = {
  getRcMappingSummary(state) {
    return state.rcMappingSummary;
  },
  getRcMappingCenterList(state) {
    return state.rcMappingCenterList;
  },
};

const mutations = {
  [SET_RC_MAPPING_SUMMARY](state, result) {
    state.rcMappingSummary = result;
  },
  [UNSET_RC_MAPPING_SUMMARY](state) {
    state.rcMappingSummary = [];
  },
  [SET_RC_MAPPING_CENTER_LIST](state, result) {
    state.rcMappingCenterList = result;
  },
  [UNSET_RC_MAPPING_CENTER_LIST](state) {
    state.rcMappingCenterList = [];
  },
};

const actions = {
  addCenterToRcMapping({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(rcMappingSubmitURL, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data;
          resolve();
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  removeCenterToRcMapping({ commit }, payLoad) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // loading Opening
    return new Promise(function(resolve, reject) {
      Axios.post(rcMappingRevokeURL, payLoad)
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data;
          commit("SET_SNACKBAR", {
            msg: "Unmapped",
            color: "green",
          });
          resolve();
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  fetchRcMappingSummary({ commit }, payLoad) {
    return new Promise(function(resolve, reject) {
      Axios.get(rcMappingSummaryURL, {
        params: payLoad,
      })
        .then(function(response) {
          var result = response.data.data;

          console.log("000000000", result);
          commit("SET_RC_MAPPING_SUMMARY", result.data);
          resolve(result.total_centers);
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  fetchRcMappedCenterDetailsList({ commit }, payLoad) {
    return new Promise(function(resolve, reject) {
      Axios.get(rcMappedCenterDetailsURL, {
        params: payLoad,
      })
        .then(function(response) {
          var result = response.data;
          // console.log(result);
          // commit("SET_RC_MAPPING_SUMMARY", result.data);
          resolve(result);
        })
        .catch(function(error) {
          reject();
        });
    });
  },
  searchRcMappingCenterListData({ commit }, searchParam) {
    console.log("searchRcMappingCenterListData:", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // loading  Opening
      Axios.get(rcMappingCenterListURL, {
        params: searchParam,
      })
        .then(function(response) {
          // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // console.log(response.data.data);
          commit("SET_RC_MAPPING_CENTER_LIST", result);
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
  downloadMappedCenterDetailsReport({ commit }, searchParam) {
    console.log(searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: rcMappingReportUrl,
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
          // console.log("I am in error", error);
        });
    });
  },
  //   /api/auth/rc-mapping-summary?exam_code=3302&exam_initiate_id=1&year=2017
};

export default {
  state,
  getters,
  actions,
  mutations,
};
