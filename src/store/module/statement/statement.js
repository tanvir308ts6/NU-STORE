/* eslint-disable prettier/prettier */
import Axios from "axios";

import {
  SET_QUES_STATEMENT_DATA,
  UNSET_QUES_STATEMENT_DATA,
  SET_SCRIPT_STATEMENT_DATA,
  UNSET_SCRIPT_STATEMENT_DATA,
  SET_SCRIPT_DISTRIBUTION_DATA,
  UNSET_SCRIPT_DISTRIBUTION_DATA,
  SET_TREASURY_STATEMENT_DATA,
} from "../../mutation-types";

import {
  QuesStmUrl,
  ScriptStmUrl,
  ScriptStmDownloadURL,
  QuesStmDownloadURL,
  StmInitialDistributionURL,
  TreasuryStmFetchURL,
  QuesSortingReportDownloadURL,
  QuesDistributionSamaryURL,
} from "../../api";
//
const state = {
  quesStmDatalist: [],
  scriptStmDatalist: [],
  scriptStmDistributionList: [],
  treasuryStmDataList: [],
};

const getters = {
  getQuesStmItem(state) {
    return state.quesStmDatalist;
  },
  getScriptStmItem(state) {
    return state.scriptStmDatalist;
  },
  getScriptStmDistributionList() {
    return state.scriptStmDistributionList;
  },
  getTreasuryStmDataList() {
    return state.treasuryStmDataList;
  },
};
const mutations = {
  [SET_QUES_STATEMENT_DATA](state, result) {
    state.quesStmDatalist = result;
  },
  [UNSET_QUES_STATEMENT_DATA](state) {
    state.quesStmDatalist = [];
  },
  [SET_SCRIPT_STATEMENT_DATA](state, result) {
    state.scriptStmDatalist = result;
  },
  [UNSET_SCRIPT_STATEMENT_DATA](state) {
    state.scriptStmDatalist = [];
  },
  [SET_SCRIPT_DISTRIBUTION_DATA](state, result) {
    state.scriptStmDistributionList = result;
  },
  [UNSET_SCRIPT_DISTRIBUTION_DATA]() {
    state.scriptStmDatalist = [];
  },
  [SET_TREASURY_STATEMENT_DATA](state, result) {
    state.treasuryStmDataList = result;
  },
};
const actions = {
  searchQuesStm({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // // console.log("QuesStmUrl", QuesStmUrl);
      // loading  Opening
      Axios.get(QuesStmUrl, {
        params: searchParam,
      })

        .then(function(response) {
          // // // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          result.forEach(function(obj) {
            obj.final = searchParam.final;
          });
          // console.log("--quesStm-->", result);

          commit("SET_QUES_STATEMENT_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // // // console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          // console.log("--quesStm-->", error);
          reject();
        });
    });
  },
  submitQuesStm({ commit }, payLoad) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // // console.log("QuesStmUrl", QuesStmUrl);
      // loading  Opening

      Axios.post(QuesStmUrl, payLoad)
        .then(function(response) {
          // // // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data.data;
          // // console.log("--quesStm<POST>-->", response.data.message);
          // commit("SET_QUES_STATEMENT_DATA", result);
          commit("SET_SNACKBAR", {
            msg: response.data.message,
            color: "green",
          });
          resolve();
        })
        .catch(function(error) {
          // // // console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          // // console.log("--quesStm-->", error);
          reject();
        });
    });
  },
  searchScriptStm({ commit }, searchParam) {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // // console.log("QuesStmUrl", QuesStmUrl);
      // loading  Opening
      Axios.get(ScriptStmUrl, {
        params: searchParam,
      })

        .then(function(response) {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          console.log("--this one-->", result[0]);
          result.forEach((obj, i) => {
            obj.main_script_adjustment_count;
            obj.main_script_total_packet;
            obj.extra_script_adjustment_count;
            obj.extra_script_total_packet;
          });
          // console.log("--that one-->", result[0]);
          // console.log("--spsp-->", result[0]);
          commit("SET_SCRIPT_STATEMENT_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // // // console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          // console.log("--quesStm-->", error);
          reject();
        });
    });
  },
  submitScriptStm({ commit }, payLoad) {
    console.log("..");
    console.log(JSON.stringify(payLoad));
    console.log("..");
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // // console.log("QuesStmUrl", QuesStmUrl);
      // loading  Opening

      Axios.post(ScriptStmUrl, payLoad)
        .then(function(response) {
          // // // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          // var result = response.data.data;
          // // console.log("--quesStm<POST>-->", response.data.message);
          // commit("SET_QUES_STATEMENT_DATA", result);
          commit("SET_SNACKBAR", {
            msg: response.data.message,
            color: "green",
          });
          resolve();
        })
        .catch(function(error) {
          // // // console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          // // console.log("--quesStm-->", error);
          reject();
        });
    });
  },
  getScriptStatementPdf({ commit }, searchParam) {
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: ScriptStmDownloadURL,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data[0];
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
          // console.log("I am in error", error);
        });
    });
  },
  getQuesStatementPdf({ commit }, searchParam) {
    // console.log("-->", searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: QuesStmDownloadURL,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          // let url = response.data.data[0];
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
  getQuesSortingReportPdf({ commit }, searchParam) {
    let param = {
      distribution_status: 1,
    };
    param.exam_initiate_id = searchParam.exam_initiate_id;
    param.year = searchParam.year;
    param.exam_code = searchParam.exam_code;
    // console.log("-->", searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });

    return new Promise((resolve, reject) => {
      Axios({
        url: QuesSortingReportDownloadURL,
        method: "GET",
        params: param,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          // let url = response.data.data[0];
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
  getQuesDistributionSamaryReportPdf({ commit }, searchParam) {
    let param = {
      distribution_status: 1,
    };
    param.exam_initiate_id = searchParam.exam_initiate_id;
    param.year = searchParam.year;
    param.exam_code = searchParam.exam_code;
    // console.log("-->", searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });

    return new Promise((resolve, reject) => {
      Axios({
        url: QuesDistributionSamaryURL,
        method: "GET",
        params: param,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          // let url = response.data.data[0];
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
  quesStatementPdfDownload({ commit }, searchParam) {
    // console.log("-->", searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: QuesStmDownloadURL,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          let url = response.data.data;
          // console.log("sp:sp=======", url);
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
  fetchScriptDistributionData({ commit }, searchParam) {
    // console.log("-->", searchParam);
    commit("SET_LOADING", {
      color: "primary",
    });
    // script-statement-download
    return new Promise((resolve, reject) => {
      Axios({
        url: StmInitialDistributionURL,
        method: "GET",
        params: searchParam,
      })
        .then((response) => {
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // result.forEach(function(obj) {
          //   obj.remove_status = true;
          // });
          commit("SET_SCRIPT_DISTRIBUTION_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          commit("UNSET_LOADING"); // loading Closing
          // console.log("I am in error", error);
        });
    });
  },
  postScriptDistributionData({ commit }, postData) {
    console.log(JSON.stringify(postData));
    commit("SET_LOADING", {
      color: "primary",
    });
    return new Promise((resolve, reject) => {
      Axios.post(StmInitialDistributionURL, postData)
        .then(function(response) {
          commit("UNSET_LOADING");
          console.log(response);

          commit("SET_SNACKBAR", {
            msg: response.data.message,
            color: "green",
          });
          resolve(response.data);
        })
        .catch(function(error) {
          console.log("in sendMail Action -> Error");
          console.log(error);
          reject(error);
        });
    });
  },
  fetchTreasuryReportData({ commit }, searchParam) {
    console.log("ACTIN", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // // console.log("QuesStmUrl", QuesStmUrl);
      // loading  Opening
      Axios.get(TreasuryStmFetchURL, {
        params: searchParam,
      })

        .then(function(response) {
          // // // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // result.forEach(function(obj) {
          //   obj.remove_status = true;
          // });
          console.log("--Treasury data -->", result);

          commit("SET_TREASURY_STATEMENT_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // // // console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          // console.log("--quesStm-->", error);
          reject();
        });
    });
  },
  saveTreasuryReportData({ commit }, searchParam) {
    console.log("ACTIN", searchParam);
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", {
        color: "primary",
      });
      // // console.log("QuesStmUrl", QuesStmUrl);
      // loading  Opening
      Axios.post(TreasuryStmFetchURL, searchParam)

        .then(function(response) {
          // // // console.log("search:  in then ??");
          commit("UNSET_LOADING"); // loading Closing
          var result = response.data.data;
          // result.forEach(function(obj) {
          //   obj.remove_status = true;
          // });
          console.log("--Treasury data -->", result);

          commit("SET_TREASURY_STATEMENT_DATA", result);
          resolve(response.data);
        })
        .catch(function(error) {
          // // // console.log("searchFormFillup: in catch ??");
          commit("UNSET_LOADING"); // loading Closing
          // console.log("--quesStm-->", error);
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
