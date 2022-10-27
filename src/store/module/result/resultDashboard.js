/* eslint-disable prettier/prettier */
// axios
import Axios from "axios";

// apis
import {
  CollegewisePassFailApi,
  SubjectwisePassFailApi,
  PaperwisePassFailApi,
  ResultDashboardDataApi,
  examSummaryPdfApi,
  resultStatisticsApi,
} from "../../api";

// mutation types
import {
  SET_COLL_WISE_PASS_FAIL_DATA,
  SET_SUB_WISE_PASS_FAIL_DATA,
  SET_PAP_WISE_PASS_FAIL_DATA,
  SET_RESULT_DASHBOARD_DATA,
  SET_SUBJECT_WISE_RESULT_STATISTICS_DATA
} from "../../mutation-types";

const state = {
  schema: {
    pass_percentage: [
      {
        rn: "1",
        exam_code: "3302",
        exam_initiate_id: "1",
        exam_year: "",
        exam_name: "Masters Final",
        total_student: "138669",
        total_failed: "33087",
        total_passed: "105582",
        total_fail_percentage: "23.86",
        total_pass_percentage: "",
      },
    ],
    reported_withheld: { reported: "", withheld: "", expelled: "" },
    attendance: { absence: "", present: "" },
  },
  resultData: [],
  subresultData: [],
  papresultData: [],
  dashboardData: [],
  resultStatistics:[],
};

// getters
const getters = {
  // get data lsit
  getCollwisePassFailData(state) {
    return state.resultData;
  },
  getSubjectWiseResultStatistics(state) {
    return state.resultStatistics;
  },
  getSubwisePassFailData(state) {
    return state.subresultData;
  },
  getPapwisePassFailData(state) {
    return state.papresultData;
  },
  getResultDashboardData(state) {
    return state.schema;
  },
};

// mutations
const mutations = {
  // set data list
  [SET_COLL_WISE_PASS_FAIL_DATA](state, result) {
    state.resultData = result;
  },
  [SET_SUBJECT_WISE_RESULT_STATISTICS_DATA](state, result) {
    state.resultStatistics = result;
  },
  [SET_SUB_WISE_PASS_FAIL_DATA](state, result) {
    state.subresultData = result;
  },
  [SET_PAP_WISE_PASS_FAIL_DATA](state, result) {
    state.papresultData = result;
  },
  [SET_RESULT_DASHBOARD_DATA](state, result) {
    state.schema = result;
  },
};

const actions = {
  // get data list
  searchCollwisePassFailData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(CollegewisePassFailApi, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_COLL_WISE_PASS_FAIL_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
   searchResultStatisticsData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(resultStatisticsApi, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_SUBJECT_WISE_RESULT_STATISTICS_DATA", result);
          resolve(response.data.data);
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  searchSubwisePassFailData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(SubjectwisePassFailApi, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_SUB_WISE_PASS_FAIL_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  searchPapwisePassFailData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      Axios.get(PaperwisePassFailApi, {
        params: searchParam,
      })
        .then(function(response) {
          var result = response.data.data;
          commit("SET_PAP_WISE_PASS_FAIL_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  },
  searchResultDashboardData({ commit }, searchParam) {
    return new Promise(function(resolve, reject) {
      commit("SET_LOADING", { color: "primary" }); // loading Opening
      Axios.get(ResultDashboardDataApi, {
        params: searchParam,
      })
        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data;
          commit("SET_RESULT_DASHBOARD_DATA", result);
          console.log("...mitu", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          console.log(error);
          reject();
        });
    });
  },
    exportResultStatistics({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // download
    return new Promise((resolve, reject) => {
      Axios({
        url: resultStatisticsApi,
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
  exportExamSummary({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // download
    return new Promise((resolve, reject) => {
      Axios({
        url: examSummaryPdfApi,
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
